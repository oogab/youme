int analogPin = A1; // sound Sensor ouput
int trigPin = 6; //trigPin을 아두이노 디지털 5번으로 설정
int echoPin = 5; //echoPin을 아두이노 디지털 6번으로 설정
int sv = 0; 
int count;
int onstate=0;

int on

int photopin=3;

void setup () 
{
  Serial.begin(9600); //시리얼모니터 통신속도 설정
  pinMode(trigPin,OUTPUT); //trigPin을 출력으로 설정
  pinMode(echoPin,INPUT); //echoPin을 입력으로 설정
  pinMode(photopin,INPUT);
  attachInterrupt(INT1,photo,FALLING);
}

void loop () 
{
  //초음파 센서
  digitalWrite(trigPin,LOW); //trigPin 전력 차단
  digitalWrite(echoPin,LOW); //echoPin 전력 차단
  delayMicroseconds(2); // 2 마이크로초만큼 멈춤
  digitalWrite(trigPin,HIGH); // trigPin 전력 공급
  delayMicroseconds(10); // 10마이크로초 유지
  digitalWrite(trigPin,LOW); // 다시 trigPin 전력 차단

  unsigned long duration = pulseIn(echoPin, HIGH); // 반사되는 초음파 시간
  float distance=((float)(34000*duration)/1000000)/2; // 초음파 이동거리 저장
  
  //Serial.print(distance);
 // Serial.println("cm");
  //delay(500);
  
  ////// 사운드 센서
  sv = analogRead (analogPin);
  //Serial.println(sv);
  
  if((distance<=60))
  {
    if(sv>=50)
    {
        Serial.print("1");
        onstate=1;
        delay(5000);
    }
    else if(onstate==1)
    {
        Serial.print("3");
        delay(5000);
    }
  }
  else 
  {
   Serial.print("2");
   onstate=0;
   delay(10);
  }
}

void photo()
{
  Serial.print("4");
  delay(5000);
}