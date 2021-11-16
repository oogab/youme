import threading
from datetime import datetime

hour = ''
minute = ''

def currentTime():
    now = datetime.now()
    global hour
    global minute

    timer = threading.Timer(1,currentTime)
    timer.start()
    date = now.strftime("%Y-%m-%d %H:%M")
    print(now)

    return ''
