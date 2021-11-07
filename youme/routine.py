import sys
import os
import re
import threading
import time
import schedule
import random
import requests
import json
import datetime

user_id = 3
headers = {'Content-Type': 'application/json; charset=utf-8'}
data = {'userId': user_id}
url = 'http://112.169.87.3:8005'

todayRoutines = []
tomorrowRoutines = []

# 루틴 관련 쿼리 처리 허브
def routine_query(transcript):
    if re.search(r'\b((전체|모든|내) 루틴 알려 줘)\b', transcript, re.I):
        script = all_routine()
        return script
    
    if re.search(r'\b(오늘 *[가-힣]* 루틴 알려 줘)\b', transcript, re.I):
        script = today_routine()
        return script

    if re.search(r'\b(오늘 오전 루틴 알려 줘)\b', transcript, re.I):
        script = today_morning_routine()
        return script
    
    script = '응답 무슨 말인지 모르겠어요.'
    return script

def all_routine():
    res = requests.post(url+'/routine', headers=headers, data=json.dumps(data))
    routines = res.json()
    allRoutines = [routine['name'] for routine in routines]
    
    script = '응답 전체 루틴은' + str(allRoutines) + '입니다.'
    return script 

# 오늘 전체 루틴 목록 확인
def today_routine():
    global todayRoutines

    if len(todayRoutines) == 0:
        print('first time to load today routine')
        res = requests.post(url+'/routine/today', headers=headers, data=json.dumps(data))
        routines = res.json()
        
        for routine in routines:
            if routine['RoutineActiveDays'][datetime.datetime.today().weekday()]['active'] == True:
                todayRoutines.append(routine)
    print(todayRoutines)
    todayRoutineNames = [todayRoutine['name'] for todayRoutine in todayRoutines]

    script = '응답 오늘 루틴은' + str(todayRoutineNames) + '입니다.'
    print(script)
    return script

# 오늘 오전 루틴 목록 확인
def today_morning_routine():
    res = requests.post(url+'/routine/morning', headers=headers, data=json.dumps(data))
    return res.text

# 오늘 오후 루틴 목록 확인

# 내일 전체 루틴 목록 확인
