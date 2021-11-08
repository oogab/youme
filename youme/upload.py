import os
import requests

url = 'http://112.169.87.3:8005/challenge/image'

with open('/home/pi/test.jpg', 'rb') as img:
    name_img = os.path.basename('/home/pi/test.jpg')
    files = {'image': (name_img, img, 'multipart/form-data', {'Expires': '0'})}
    with requests.Session() as s:
        r = s.post(url, files=files)
        print(r.status_code)
