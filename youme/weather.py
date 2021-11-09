import sys
import os
import re
import threading
import time
import requests
import json
import datetime

user_id = 3
headers = {'Content-Type': 'application/json; charset=utf-8'}
data = {'userId': user_id}
url = 'http://112.169.87.3:8005'

todayWeather = []
tomorrowWeather = []

# 날씨 관련 쿼리 처리 허브
def weather_query(transcript):
    if re.search(r'\b((오늘|지금) 날씨)\b', transcript, re.I):
        script = today_weather()
        return script

    script = '응답 무슨 말인지 모르겠어요.'
    return script

def today_weather():
    res = requests.post(url+'/weather', headers=headers, data=json.dumps(data))
    if res.status_code == 400:
        return '응답 날씨 정보를 찾을 수 없습니다. 인터넷 환경을 확인하세요.'

    weather = res.json()
    todayWeather.append(weather['message'])
    # print(todayWeather[0])

    script = '응답 오늘 날씨는 ' + todayWeather[0]['description'] + '입니다.'
    return script
