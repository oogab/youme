import sys
import os
import re
import time
import datetime
import requests
import random
import json

user_id = 3
headers = {'Content-Type': 'application/json; charset=utf-8'}
data = {'userId': user_id}
url = 'http://112.169.87.3:8005'

todayChallenges = []
tomorrowChallenges = []

# 챌린지 관련 쿼리 처리 허브
def challenge_query(transcript):
    if re.search(r'\b((전체|모든|내) 챌린지 알려 줘)\b', transcript, re.I):
        script = all_challenge()
        return script

    elif re.search(r'\b(오늘 *[가-힣]* 챌린지 알려 줘)\b', transcript, re.I):
        script = today_challenge()
        return script

    elif re.search(r'\b(오늘 오전 챌린지 알려 줘)\b', transcript, re.I):
        script = today_morning_challenge()
        return script

    script = '응답 무슨 말인지 모르겠어요'
    return script

# 전체 챌린지 목록 확인
def all_challenge():
    res = requests.post(url+'/challenge', headers=headers, data=json.dumps(data))
    if res.status_code == 400:
        return '응답 챌린지가 없습니다!'
    
    challenges = res.json()
    allChallenges = [challenge['name'] for challenge in challenges]

    script = '응답 전체 챌린지는' + str(allChallenges) + '입니다.'
    return script

# 오늘 전체 챌린지 목록 확인
def today_challenge():
    global todayChallenges

    if len(todayChallenges) == 0:
        print('first time to load today challenge')
        res = requests.post(url+'/challenge/today', headers=headers, data=json.dumps(data))
        if res.status_code == 400:
            return '응답 오늘 인증 가능한 챌린지가 없습니다!'
        
        challenges = res.json()
        for challenge in challenges:
            if challenge['ChallengeCertificationDays'][datetime.datetime.today().weekday()]['certification_available'] == True:
                todayChallenges.append(challenge)

    todayChallengeNames = [todayChallenge['name'] for todayChallenge in todayChallenges]

    script = '응답 오늘 챌린지는' + str(todayChallengeNames) + '입니다.'
    print(script)
    return script
