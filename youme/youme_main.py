import sys
import os
import re
import threading
import time
import schedule
import random

# pyqt5
from PyQt5 import QtCore
from PyQt5.QtWidgets import *
from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5 import uic
import qdarkstyle
from datetime import datetime

# network connection
from google.cloud import speech, texttospeech
import pyaudio
import queue
import asyncio
import socketio
import requests
import json

from mpyg321.mpyg321 import MPyg321Player

expression_index = 0

RATE = 8000
CHUNK = int(RATE / 10)

cookies = ''
user_id = ''
url = 'http://112.169.87.3:8005'

class MicrophoneStream(object):
    def __init__(self, rate, chunk):
        self._rate = rate
        self._chunk = chunk

        self._buff = queue.Queue()
        self.closed = True

    def __enter__(self):
        self._audio_interface = pyaudio.PyAudio()
        self._audio_stream = self._audio_interface.open(
                format = pyaudio.paInt16,
                channels = 1,
                rate = self._rate,
                input = True,
                frames_per_buffer = self._chunk,
                stream_callback = self._fill_buffer
        )
        self.closed = False
        return self

    def __exit__(self, type, value, traceback):
        self._audio_stream.stop_stream()
        self._audio_stream.close()
        self.closed = True
        self._buff.put(None)
        self._audio_interface.terminate()

    def _fill_buffer(self, in_data, frame_count, time_info, status_flags):
        self._buff.put(in_data)
        return None, pyaudio.paContinue

    def generator(self):
        while not self.closed:
            chunk = self._buff.get()
            if chunk is None:
                return
            data = [chunk]

            while True:
                try:
                    chunk = self._buff.get(block=False)
                    if chunk is None:
                        return
                    data.append(chunk)
                except queue.Empty:
                    break

            yield b''.join(data)

def listen_print_loop(responses):
    num_chars_printed = 0
    call_youme = False

    for response in responses:
        if user_id == '':
            continue

        if not response.results:
            continue

        result = response.results[0]
        if not result.alternatives:
            continue

        transcript = result.alternatives[0].transcript
        overwrite_chars = ' '*(num_chars_printed - len(transcript))

        if not result.is_final:
            sys.stdout.write(transcript + overwrite_chars + '\r')
            sys.stdout.flush()

            num_chars_printed = len(transcript)
        elif call_youme == False:
            print(transcript + overwrite_chars)

            if re.search(r'\b(명령 끝)\b', transcript, re.I):
                print('Exiting..')
                break

            if re.search(r'\b(유미야)\b', transcript, re.I):
                call_youme = True
                global expression_index
                expression_index = 1
                os.system("mpg321 -g 20 youme_wake.mp3")

            num_chars_printed = 0
        else:
            print(transcript + overwrite_chars)
            
            if re.search(r'\b(명령 끝)\b', transcript, re.I):
                print('Exiting..')
                break
            
            if re.search(r'\b(오늘 루틴)\b', transcript, re.I):
                headers = {'Content-Type': 'application/json; charset=utf-8'}
                data = {'userId': user_id}
                res = requests.post(url+'/youme/routine', headers=headers, data=json.dumps(data))
                print(res.text)
                tts(res.text)

            elif re.search(r'\b(오늘 챌린지)\b', transcript, re.I):
                headers = {'Content-Type' : 'application/json; charset=utf-8'}
                data = {'userId' : user_id}
                res = requests.post(url+'/youme/challenge', headers=headers, data=json.dumps(data))
                print(res.text)
                tts(res.text)

            elif re.search(r'\b(고마워)\b', transcript, re.I):
                expression_index = 2
                if random.randrange(0,3) == 1:
                    os.system("mpg321 -g 20 gwaenchan.mp3")
                elif random.randrange(0,3) == 2:
                    os.system("mpg321 -g 20 jaeil.mp3")
            else:
                headers = {
                    'Content-Type': 'application/json; charset=utf-8',
                }
                data = {'message': transcript}
                res = requests.post(url+'/youme', headers=headers, data=json.dumps(data))
                print('reply : ', res.text)
                os.system("mpg321 -g 20 molla.mp3")
            call_youme = False
            expression_index = 0

def start_stt_t():
    stt_t = threading.Thread(target=stt)
    stt_t.start()

def stt():
    # 여기 부분을 아예 떼어다가 새 스레드에 담으니까 되었다!
    language_code = 'ko-KR'
    speech_context = speech.SpeechContext(phrases=[
                "$유미야",
                "$오늘 챌린지 알려줘",
                "$오늘 루틴 알려줘",
                "$오늘 일정 알려줘",
                "$고마워"
            ])
    client = speech.SpeechClient()
    config = speech.RecognitionConfig(
            encoding = 'LINEAR16',
            sample_rate_hertz = RATE,
            max_alternatives = 1,
            language_code = language_code,
            speech_contexts = [speech_context],
    )
    streaming_config = speech.StreamingRecognitionConfig(
            config = config,
            interim_results = True
    )

    with MicrophoneStream(RATE, CHUNK) as stream:
        audio_generator = stream.generator()
        requests = (speech.StreamingRecognizeRequest(audio_content = content) for content in audio_generator)
        responses = client.streaming_recognize(streaming_config, requests)
        listen_print_loop(responses)

def tts(talk):
    # Instantiates a client
    client = texttospeech.TextToSpeechClient()
    
    # Set the text input to be synthesized
    synthesis_input = texttospeech.SynthesisInput(text=talk)

    # Build the void request, select the language code ("en-US") and the ssml
    # voice gender ("neutral")
    voice = texttospeech.VoiceSelectionParams(
            language_code="ko-KR", ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL
    )

    # Select the type of audio file you want returned
    audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3
    )

    # Perform the text-to-speech request on the text input with the selected
    # voice parameters and audio file type
    response = client.synthesize_speech(
            input=synthesis_input, voice=voice, audio_config=audio_config
    )

    # The response's audio_content is binary.
    with open("output.mp3", "wb") as out:
        # Write the response to the output file.
        out.write(response.audio_content)
        print('Audio content written to file "output.mp3"')

    # 생성된 output.mp3 파일 실행
    os.system("mpg321 -g 20 output.mp3")

class LoginWindow(QWidget):
    def __init__(self):
        super().__init__()
        self.initLoginWindow()

    def initLoginWindow(self):
        self.loginLayout = QVBoxLayout(self)

        self.loginEmailLayout = QHBoxLayout(self)
        self.loginEmailLabel = QLabel('Email')
        self.loginEmailInput = QLineEdit(self)
        self.loginEmailLayout.addWidget(self.loginEmailLabel)
        self.loginEmailLayout.addWidget(self.loginEmailInput)
        self.loginLayout.addLayout(self.loginEmailLayout)

        self.loginPasswordLayout = QHBoxLayout(self)
        self.loginPasswordLabel = QLabel('Password')
        self.loginPasswordInput = QLineEdit(self)
        self.loginPasswordLayout.addWidget(self.loginPasswordLabel)
        self.loginPasswordLayout.addWidget(self.loginPasswordInput)
        self.loginLayout.addLayout(self.loginPasswordLayout)

        loginButton = QPushButton('로그인', self)
        loginButton.setFixedSize(500, 30)
        loginButton.clicked.connect(self.login)
        self.loginLayout.addWidget(loginButton)

        exitButton = QPushButton('프로그램 종료', self)
        exitButton.setFixedSize(500, 30)
        exitButton.clicked.connect(self.close)
        self.loginLayout.addWidget(exitButton)

        self.setLayout(self.loginLayout)
        # self.setGeometry(400, 400, 500, 500)

        self.show()

    def login(self):
        global user_id
        # requests로 직접 접속도 가능하지만 요청 사항을 다루려면 세션을 만들어야 한다!
        with requests.Session() as session:
            headers = {'Content-Type' : 'application/json; charset=utf-8'}
            data = {'email': str(self.loginEmailInput.text()), 'password': str(self.loginPasswordInput.text())}
            with session.post(url+'/user/login', data=json.dumps(data), headers=headers) as response:
                print("response text - ", str(response.text))
                print("response headers - ", str(response.headers))
                print("response cookies - ", str(response.cookies))
                cookies = response.cookies
                headers = session.headers
                user_id = response.json()["id"]

                if response.status_code == 200:
                    print('로그인 성공!')
                    screenWidget.setCurrentIndex(screenWidget.currentIndex()+1)
                else:
                    print('입력한 정보가 올바르지 않습니다!')

    def close(self):
        return QCoreApplication.instance().quit()

class MainWindow(QWidget):
    def __init__(self):
        super().__init__()

        self.timer = QTimer(self)
        self.timer.setInterval(300)
        self.timer.timeout.connect(self.timeout)

        self.initMainWindow()

    def initMainWindow(self):
        self.timer.start()

        # 0 : Normal
        # 1 : Talk
        # 2 : Smile
        self.expressionList = [
            self.drawNormalExpression,
            self.drawTalkExpression,
            self.drawSmileExpression
        ]

        expression_index = 0
        self.mainLayout = QVBoxLayout()

        self.logoutButton = QPushButton('로그아웃')
        self.logoutButton.clicked.connect(self.logout)

        self.mainLayout.addWidget(self.logoutButton)
        self.setLayout(self.mainLayout)
        self.show()

    def paintEvent(self, event):
        paint = QPainter()
        paint.begin(self)
        # index만 바꿔가며 실행하면 된다.
        self.expressionList[expression_index](paint)
        paint.end()

    def drawNormalExpression(self, paint):
        paint.setBrush(QColor(Qt.white))
        paint.drawEllipse(100, 100, 80, 120)
        paint.drawEllipse(340, 100, 80, 120)
        paint.setPen(QPen(Qt.white, 5))
        paint.drawArc(160, 200, 200, 160, 180 * 16, 180 * 16)

    def drawTalkExpression(self, paint):
        paint.setBrush(QColor(Qt.white))
        paint.drawEllipse(100, 100, 80, 120)
        paint.drawEllipse(340, 100, 80, 120)
        paint.setPen(QPen(Qt.white, 5))
        paint.drawChord(160, 200, 200, 160, 180 * 16, 180 * 16)

    def drawSmileExpression(self, paint):
        # paint.setBrush(QColor(Qt.white))
        paint.setPen(QPen(Qt.white, 5))
        paint.drawArc(100, 150, 100, 100, 0 * 16, 180 * 16)
        paint.drawArc(320, 150, 100, 100, 0 * 16, 180 * 16)
        paint.drawArc(160, 200, 200, 160, 180 * 16, 180 * 16)

    def timeout(self):
        global expression_index
        print(expression_index)
        # PyQt5는 QTimer를 구현하기만 하면 타이머가 트리거 될 때마다
        # self.update()를 사용하며 드로잉을 업데이트하고 원하는 위치로 업데이트 할 수 있다.
        self.update()

    def logout(self):
        screenWidget.setCurrentIndex(screenWidget.currentIndex()-1)
        user_id = ''

    def net(self):
        headers = {'Content-Type' : 'application/json; charset=utf-8'}
        print(user_id)
        data = {'userId' : user_id}
        res = requests.post('http://112.169.87.3:8005/youme/challenge', data=json.dumps(data), headers=headers)
        tts(res.text)

if __name__ == "__main__":
    # QApplication : 프로그램을 실행시켜주는 클래스
    app = QApplication(sys.argv)

    # PyQt5
    dark_stylesheet = qdarkstyle.load_stylesheet_pyqt5()

    # 화면 전환용 Widget 설정
    screenWidget = QStackedWidget()

    # 레이아웃 인스턴스 생성
    loginWindow = LoginWindow()
    mainWindow = MainWindow()

    # Widget 추가
    screenWidget.addWidget(loginWindow)
    screenWidget.addWidget(mainWindow)
    screenWidget.setWindowFlags(Qt.FramelessWindowHint);

    # 프로그램 화면을 보여주는 코드
    screenWidget.setGeometry(400, 400, 520, 500)
    screenWidget.show()
    app.setStyleSheet(dark_stylesheet)
    
    start_timer = QTimer()
    # 305초 마다 stt api가 종료 300초 마다 스레드 재 실행
    # 너무 주먹구구 식인가...?
    start_timer.setInterval(300000)
    start_timer.timeout.connect(start_stt_t)
    start_timer.start()

    # 처음은 강제로 실행시켜줘야 한다.
    start_stt_t()
    
    # 프로그램을 이벤트 루프로 진입시키는(프로그램을 작동시키는) 코드
    app.exec_()
    stt_t.join()
