import serial
import time
import subprocess
from datetime import datetime

#subprocess.call("vcgencmd display_power 1",shell=True)
#ser.write(str.encode('abcde'))
#time.sleep(0.5)

ser = serial.Serial("/dev/ttyACM0",9600)
pastinput = b'0'

while 1:
    input = ser.read(1)
    if pastinput == input :
        continue;
    elif pastinput != input:
        pastinput=input
    print(input)
    if input == b'1':
        subprocess.call("vcgencmd display_power 1",shell=True)
    elif input == b'3':
        subprocess.call("vcgencmd display_power 1",shell=True)
    elif input == b'2':
        subprocess.call("vcgencmd display_power 0",shell=True)
    elif input == b'4':
        time.sleep(3)
        saveorder="fswebcam "
        savename=("{}{}{}{}{}{}".format(datetime.now().year,datetime.now().month,datetime.now().day,datetime.now().hour,datetime.now().minute,datetime.now().second))
        saveform=".jpg"
        total=("{}{}{}".format(saveorder,savename,saveform))
        print(total)
        subprocess.call(total,shell=True)
        
        
        
