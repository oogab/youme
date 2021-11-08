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

allRoutines = []
todayRoutines = []
tomorrowRoutines = []

# 루틴 관련 쿼리 처리 허브
def routine_query(transcript):
    if re.search(r'\b((전체|모든|내) 루틴 알려 줘)\b', transcript, re.I):
        script = all_routine()
        return script
    
    elif re.search(r'\b(오늘 루틴 알려 줘)\b', transcript, re.I):
        script = today_routine()
        return script

    elif re.search(r'\b(오늘 오전 루틴 알려 줘)\b', transcript, re.I):
        script = today_morning_routine()
        return script

    elif re.search(r'\b(오늘 [0-9]번 루틴 습관 알려 줘)\b', transcript, re.I):
        routine_num = int(transcript.split()[1][0])
        if routine_num <= 0:
            script = '응답 루틴 번호를 확인해 주세요.'
        else:
            script = check_routinized_habit(routine_num-1)
        return script
    
    script = '응답 무슨 말인지 모르겠어요.'
    return script

def all_routine():
    res = requests.post(url+'/routine', headers=headers, data=json.dumps(data))
    if res.status_code == 400:
        return '응답 루틴이 없습니다!'

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
        if res.status_code == 400:
            return '응답 오늘 진행할 루틴이 없습니다!'

        routines = res.json()
        for routine in routines:
            if routine['RoutineActiveDays'][datetime.datetime.today().weekday()]['active'] == True:
                todayRoutines.append(routine)
    
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

# 루틴 내 습관 확인
def check_routinized_habit(routine_num):
    global todayRoutines

    if len(todayRoutines) == 0:
        script = '응답 오늘 루틴 목록을 먼저 확인해주세요!'
        return script

    routinized_habit = [habit['Habit']['name'] for habit in todayRoutines[routine_num]['RoutinizedHabits']]
    script = '응답 ' + str(routine_num+1) + '번 루틴 습관은' + str(routinized_habit) + '입니다.'
    return script
