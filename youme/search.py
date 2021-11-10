import sys
import os
import re
import datetime
import json
import requests
import random

user_id = 3
headers = {'Content-Type': 'application/json; charset=utf-8'}
data = {'userId': user_id}
url = 'http://112.169.87.3:8005'

# 검색 관련 쿼리 처리 허브
def search_query(transcript):
    if re.search(r'\b(뉴스[가-힣]*)\b', transcript, re.I):
        script = search_news(transcript)
        return script

    elif re.search(r'\b(위키[가-힣]*)\b', transcript, re.I):
        script = search_wiki(transcript)
        return script

    script = '응답 무슨 말인지 모르겠어요.'
    return script

def search_news(transcript):
    search_thing = transcript.split()[0]
    data = {'query': search_thing}
    res = requests.post(url+'/search/news', headers=headers, data=json.dumps(data))
    if res.status_code == 400:
        return '응답 검색 결과가 없습니다.'

    result = res.json()
    news_title = [news['title'] for news in result['items']]
    print(news_title)

    return '응답 검색 결과 ' + str(news_title) + ' 입니다.'

def search_wiki(transcript):
    search_thing = transcript.split()[0]
    data = {'query': search_thing}
    res = requests.post(url+'/search/encyc', headers=headers, data=json.dumps(data))
    if res.status_code == 400:
        return '응답 검색 결과가 없습니다.'

    result = res.json()
    wiki_title = [wiki['description'] for wiki in result['items']]
    print(wiki_title)

    return '응답 검색 결과 ' + str(wiki_title) + ' 입니다.'
