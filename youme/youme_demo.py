import sys
from PyQt5.QtWidgets import *
from PyQt5.QtGui import QIcon, QPixmap, QFont, QPalette, QColor
from PyQt5.QtCore import QCoreApplication, QDateTime, Qt
from qt_material import apply_stylesheet # 아깝다.. 이게 예쁜데ㅠ
import requests
import json

class Youme(QWidget):
    def __init__(self):
        super().__init__()
        # self.setWindowFlags(Qt.FramelessWindowHint) # 상단 바 제거
        self.initYoumeDisplay()

    def initYoumeDisplay(self):
        self.loginForm = QFormLayout()

        self.loginId = QLineEdit()
        self.loginForm.addRow("ID", self.loginId)

        self.loginPassword = QLineEdit()
        self.loginForm.addRow("PW", self.loginPassword)


        loginButton = QPushButton('로그인', self)
        loginButton.resize(500, 50)
        loginButton.clicked.connect(self.login)
        self.loginForm.addRow(loginButton)

        exitButton = QPushButton('프로그램 종료', self)
        exitButton.resize(500, 50)
        exitButton.clicked.connect(self.close)
        self.loginForm.addRow(exitButton)

        self.setLayout(self.loginForm)
        self.setGeometry(400, 400, 500, 500)

        self.show()

    def login(self):
        print('login!')
        headers = {'Content-Type': 'application/json; charset=utf-8'}
        data = {'email': 'oogab@naver.com', 'password': 'test123!'}
        res = requests.post('http://112.169.87.3:8005/user/login', data=json.dumps(data), headers=headers)
        print(str(res.status_code) + " | " + res.text)

    def close(self):
        return QCoreApplication.instance().quit()

app = QApplication(sys.argv)

# palette = QPalette()
# palette.setColor(QPalette.ButtonText, QColor(42, 130, 218))
# palette.setColor(QPalette.PlaceholderText, QColor(42, 130, 218))

win = Youme()
win.show() # 전체 화면 실행

# Force the style to be the same on all OSs:
# app.setStyle("Fusion")
# app.setPalette(palette)
apply_stylesheet(app, theme='dark_teal.xml')

app.exec_()

