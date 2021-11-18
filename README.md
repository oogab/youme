# YOUME\_자율PJT

## **👪Member**

<table>
  <tr>
  <td align="center"><a href="https://lab.ssafy.com/oogab"><img alt="sankwook" src="https://user-images.githubusercontent.com/48434764/130107140-fbbb49a0-3004-441c-b9d0-98ee32dc17bd.png" width="150px;" /><br /><sub><b>팀장_백상욱</b></sub></a><br /></td>
    <td align="center"><a href="https://lab.ssafy.com/minjoo0112"><img alt="minjoo" src="https://user-images.githubusercontent.com/48434764/130104515-3ea67786-79e7-4e8b-824b-e553a0f3ec8b.png" width="150px;"/><br /><sub><b>김민주</b></sub></a><br /></td>
  <td align="center"><a href="https://lab.ssafy.com/kimminji0527"><img alt="minji" src="https://user-images.githubusercontent.com/48434764/130106965-62d4e73d-f3dc-4899-a331-0a1e549089f8.png" width="150px;" /><br /><sub><b>김민지</b></sub></a><br /></td>
    <td align="center"><a href="https://lab.ssafy.com/chsem145"><img alt="yuri" src="https://user-images.githubusercontent.com/48434764/130107209-358a270f-d2dc-4462-a056-5ac90d3fef20.png" width="150px;" /><br /><sub><b>백유리</b></sub></a><br /></td>
  </tr>
</table>
<br/>

## **🎞History**

- **10-12 ~ 10-15** : 주제 기획, 교보재 신청, 개별 학습 진행
- **10-18 ~ 10-22** : stt 설정 및 사용, Jenkins 서버 배포, 웹 추가작업(이메일 인증), 하드웨어 분석 및 구상, 중간발표
- **10-25 ~ 10-29** : 상세 업무 분담, 터틀봇 수령(10/27), 3D 모델링 진행, IoT모듈 연결, QT로 디스플레이 제작, 음성인식 진행
- **11-01 ~ 11-05** : 개별 개발 진행(3D모델링, 디스플레이 제작, 음성인식 기능 구현, IoT펌웨어 제작)
- **11-09** : 허남규🎉
- **11-08 ~ 11-12** : 터틀봇 제어 및 주행 로직 개발, 웹 소켓 통신 구현, HW 배치 구상 및 조립 테스트, 음성명령 기능 추가 개발
- **11-15 ~ 11-19** : 기능 최종 통합 및 테스트, HW보완 및 완성, UCC제작, 최종 발표

  <br/>

## **📝Today's Meeting**

### 11월 18일

- Daily Scrum

  | member | content                                                                          |
  | ------ | -------------------------------------------------------------------------------- |
  | 김민주 | UCC 촬영 했고 편집 진행중입니다.                                                 |
  | 김민지 | UCC 촬영 했고 필요한 부분 촬영 더 진행하겠다.                                    |
  | 백상욱 | UCC 배우 했고 소스 진짜 쪼금만 더 손보고 발표 자료 준비 및 시연 연습 하겠습니다. |
  | 백유리 | UCC 촬영 했고 남은 일들 돕겠다.                                                  |

<br/>

## **🌝개발 업무 분담**

### **웹, 미러**

1. 이전의 기능 복구하기
   - 박수 소리 감지 후 화면 전환과 같은 기존 스마트 미러 기능을 복구합니다.
   - 담당 : 김민지, 허남규

<!-- <br/> -->

2. 미러에 온, 습도 센서 부착
   - 미러 자체에 온, 습도 측정이 가능한 IoT 센서들을 부착하여 데이터를 수집합니다.
   - 담당 : 김민지, 허남규

<!-- <br/> -->

3. 로봇의 정보를 웹과 미러에 표시

### **로봇**

#### **로봇 제어**

1. 로봇 디스플레이 QT 작업
   - 로봇의 디스플레이 부분을 QT로 GUI 프로그래밍을 진행합니다.
   - 표정 부분과 기능 부분의 전환을 중점으로 개발합니다.
   - 담당 : 백상욱

<!-- <br/> -->

2. 로봇 하드웨어 만들기 (3D 모델링 및 하드웨어 구조 설계)
   - 로봇의 모양 및 들어가는 부품들의 구성을 설계합니다.
   - 3D 프린팅 작업이 있을거라 난이도가 어렵습니다.
   - 담당 : 허남규

<!-- <br/> -->

3. 로봇 주행관련 ROS 개발
   - ROS를 이용하여 내부 패키징된 라이브러리를 통해 자율주행 기능을 구현합니다.
   - 담당 : 김민지, 백상욱

#### **로봇 백엔드**

1. 로봇 음성인식과 텍스트 변환
   - 로봇이 사용자의 음성을 인식하고 해당 음성을 문자열 텍스트화 시킵니다.
   - Google speech to text API를 사용합니다.
   - 담당 : 백상욱

  <!-- <br/> -->

2. 로봇 텍스트를 음성으로 변환
   - 텍스트가 주어졌을 경우 그것을 음성으로 바꾸고 로봇이 재생할 수 있게 합니다.
   - Google text to speech API를 사용합니다.
   - 담당 : 백상욱

  <!-- <br/> -->

3. 로봇 음성 사용자 구분 딥러닝
   - 로봇이 음성을 딥러닝 학습하여 사용자를 인식합니다.
   - 로봇의 주인일 때와 게스트일 경우를 구분하여 기능 제한을 둘 예정입니다.
   - 담당 : 백유리

  <!-- <br/> -->

4. 로봇 서버 구축
   - 다수의 로봇 클라이언트와 통신하며 Database에 접근 할 수 있는 로봇 서버를 구축합니다.
   - 로봇과 통신은 Socket.io를 통해 실시간 통신을 합니다.
   - 서버는 우선 Node의 Express로 구성합니다.
   - 담당 : 백상욱, 백유리

  <!-- <br/> -->

5. 로봇 사용자 얼굴 인식
   - 위의 로봇 음성 사용자 구분과 같은 맥락입니다.
   - 사용자 얼굴을 인식하고 분류하여 기능 제한을 두고자 합니다.

#### **IoT 제어**

1. IoT 라즈베리파이 + 블루투스 모듈 통신
   - 라즈베리파이와 블루투스 모듈이 적절하게 연결되는지 테스트합니다.
   - 담당 : 김민주, 김민지, 허남규

  <!-- <br/> -->

2. IoT 기능 회로도 제작
   - IoT 기기와 로봇과의 기능 관계를 확인하는 회로도를 만듭니다.
   - 담당 : 김민지

  <!-- <br/> -->

3. IoT 펌웨어 제작
   - 스마트 미러, 전등, 커피 머신 등등의 IoT 기기 펌웨어를 제작합니다.
   - 담당 : 김민지

  <!-- <br/> -->

4. IoT 하드웨어 제작 (하드웨어 구조 설계)
   - IoT 기기들의 하드웨어 구성이나 금형을 제작하고 패키징합니다.
   - 담당 : 허남규

<br/>

## **📌Ground Rule**

1. **Daily Scrum**
   - Mattermost 공유 (컨설턴트님과 코치님이 진행과정 확인 용이)

<br/>

2. **JIRA 체크하기**
   - 매일 오전 9시나 오후 5시에 조례 혹은 종례 끝나고 확인 체크하기!

<br/>

3. **1일 1커밋**

   - 하드웨어 영역도 소스나 자료를 폴더로 만들어서 커밋하면 좋겠습니다.
   - Git Convention

<br/>

4. **문제가 있으면 빨리 말해주기**

<br/>

5. **무슨일이 있어도 포기하지 말기**

<br/>

## 📂Tech-log

<details>
  <summary>Git Convention</summary>

| type     | 설명                                 |
| -------- | ------------------------------------ |
| feat     | 새로운 기능에 대한 커밋              |
| fix      | 버그 수정에 대한 커밋                |
| build    | 빌드 관련 파일 수정에 대한 커밋      |
| chore    | 그 외 자잘한 수정에 대한 커밋        |
| ci       | CI 관련 설정 수정에 대한 커밋        |
| docs     | 문서 수정에 대한 커밋                |
| style    | 코드 스타일 혹은 포맷 등에 관한 커밋 |
| refactor | 코드 리팩토링에 대한 커밋            |
| test     | 테스트 코드 수정에 대한 커밋         |
| design   | CSS 등 UI 수정에 대한 커밋           |
| comment  | 주석 추가 및 수정에 대한 커밋        |

</details>

<details>
  <summary>회의록</summary>
  <details>
    <summary>2주차(2021년 10월 18일 ~ 2021년 10월 22일)</summary>

### 10월 18일

- Daily Scrum

  | member | content                                                                         |
  | ------ | ------------------------------------------------------------------------------- |
  | 김민주 | myme Backend 구조 파악, node.js 공부, 이메일 인증 진행 예정                     |
  | 김민지 | 하드웨어 모델링, 하드웨어 스펙에 맞게 펌웨어 짤 계획                            |
  | 백상욱 | 라즈베리파이 모듈 설치, 녹음 진행, cloud stt 환경설정 진행 중, 이어서 개발 예정 |
  | 백유리 | Jenkins 개발 공부                                                               |
  | 허남규 | 하드웨어 모델링, 하드웨어 스펙에 맞게 펌웨어 짤 계획                            |

<br/>

- 회의내용

  - 10/22 기획발표
  - 계획서 작성한대로 개발 들어갔으면 좋겠다
  - JIRA에 해야할 내용 작성하기
  - 간단한 목업 제작하기
  - 로봇 사용자 설정한걸 웹엑서 간략하게 볼수있게 할것인가? 에 대해 고민중
  - 한다면 로봇 관련 페이지가 필요할것이지만 할 필요성에 대해 고민중. 하지만 아마 생길듯 하다.
  - 대체로 구글 어시스턴스를 쓰지만 안해보고 싶다. 만약 안된다면 차선으로 사용 예정
  - 가능하면 빠르게 가지고있는 라파를 이용해서 STT 진행 예정
  - 하드웨어 구상도 만들자!!
  - 지금 터틀봇은 주행에 관련되어있는데 기타 기능을 주로 하는 라파 보드를 터틀봇에 올리자
  - 라파가 가진 블루투스 갯수 파악하자
  - 발표 PPT 미리 제작 예정

<br/>

- 우울증 감소가 초점
- 자택근무 X
- 그래서 기능에 아침에 일어나면 연동해주는 기능들을 추가 보완
- 커피 내려주는 버튼 누르는 기계, IoT 스탠드

<br/>
<br/>

### 10월 19일

- Daily Scrum

  | member | content                                                                                                                                                                             |
  | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | 김민주 | 오늘 안에 이메일 인증 기능 완료 가능.                                                                                                                                               |
  | 김민지 | 하드웨어 구성도 만들고 있고 좀더 할거다.                                                                                                                                            |
  | 백상욱 | - 음성인식 완료 했고 언어만 바꿔주면 될것 같다. 소스 보니까 가능할것 같더라. <br/> - 오늘은 라파에서 서버랑 통신을 해서 api가지고 어떤 명령에 대해서 어떤 동작을 하도록 해볼것이다. |
  | 백유리 | 어제 Jenkins로 push하면 로컬에다가 배포하는걸 테스트 해봤다. 서버에 오늘은 해보고 싶다.                                                                                             |
  | 허남규 | 기획 발표준비 하면서                                                                                                                                                                |

<br>

- 회의내용

  - 로봇이여야만 하는 이유!!
  - 블루투스 스피커로 처리될 기능들이지만 반려로봇을 생각해봤다.
  - 그래서 친밀도적 기능을 우선시 해야한다.
  - 미러에서 특정 방/공간을 누르면 로봇이 오는 호출기능 추가했으면 좋겠다.

<br/>
<br/>

### 10월 20일

- Daily Scrum

  | member | content                                                                                                                                                                                   |
  | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | 김민주 | 이메일 인증 완료 예정                                                                                                                                                                     |
  | 김민지 | 하드웨어 구상 만들었고 스마트 미러나 로봇에 들어갈 펌웨어쪽 공부할것이다.                                                                                                                 |
  | 백상욱 | - 음성받아서 텍스트로 바꾸는거 해봤고 거기에 변화를 줘야할건데 코드분석중이다. <br/> - 필요한것들 공부중인데, 멀티쓰레드나 이런것들 해보고 있다. <br/> - 마이미 웹사이트 성능 개선중이다. |
  | 백유리 | Jenkins 해보려고 했고 로컬에서는 되는데 다른데에서 하는건 좀 어렵더라, 도커 컨테이너에서 하는걸 해결해서 리눅스쪽에서 할것같다.                                                           |
  | 허남규 | 볼로봇 하드웨어 분석, 센서, 모터 스펙분석                                                                                                                                                 |

<br>

- 팀장 미팅 -> 백상욱

<br/>
<br/>

### 10월 21일

- Daily Scrum

  | member | content                                                                                                                                                           |
  | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | 김민주 | 이메일 인증 기능 구현 완료, 관련 세부기능 작업 예정 예정                                                                                                          |
  | 김민지 | 백신 공가                                                                                                                                                         |
  | 백상욱 | 소켓으로 서버 만들고, 라파에서 통신을 하는데 거기서 입력된게 소켓통신으로 웹서버랑 말한거를 받아서 웹서버랑 대화하고 있다. 이제 db랑 붙여서 그 정보를 긁어올거다. |
  | 백유리 | 젠킨스 서버 4개 다 배포할 생각이다.                                                                                                                               |
  | 허남규 | ppt 제작완료 하고 내일 발표 제가 진행해서 끝내겠습니다.스펙분석                                                                                                   |

<br/>

- 회의내용

  - 6시 삼성역 보드
  - 로봇이 핵심인데 기능적으로 이성과 감성의 싸움이 있다.
  - 로봇일 필요가 없는게 있겠지만 로봇으로 감성을 챙겨간다.
  - 발표를 통해서 그 감성을 챙겨가야한다.
  - 사실 다른 기기들로 다 할수 있는데 로봇으로 하는건 일종의 갬성때문이다.
  - 그런 갬성을 통해서 발표로 우울증을 없앤다는거에 집중!! 핵심은 우울증이다.
  - 그래서 생각한게 반려로봇의 개념
  - 고양이 예시
  - 서큘러스 참고
  - 초점을 어디로 비트는가? 규칙적인 생활을 만들고 만족감을 키우자!

<br/>
<br/>

### 10월 22일

- **중간발표**
  <br/>
  <br/>

</details>
  <details>
    <summary>3주차(2021년 10월 25일 ~ 2021년 10월 29일)</summary>

### 10월 25일

- Daily Scrum

  | member | content                                                                   |
  | ------ | ------------------------------------------------------------------------- |
  | 김민주 | 따로 진행된것 없다.                                                       |
  | 김민지 | 따로 진행된것 없다, 오늘 하드웨어 받아서 진행할 것이다.                   |
  | 백상욱 | 주말동안 개발보다는 구조를 잡았다. (로봇과의 통신 등)                     |
  | 백유리 | 병원ㅠ 아프지 맙시다.                                                     |
  | 허남규 | 따로 진행된것 없다, IoT 제품들 하드웨어 테스트 하고 펌웨어 진행할 것이다. |

<br/>

- 회의내용

  - 상단 개발 업무 분담 내용 참고

<br/>
<br/>

### 10월 26일

- Daily Scrum

  | member | content                                                                                                                                                  |
  | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | 김민주 | 보드 받아서 라파 동작시켜봤다. 아누이노 연결 통신선 없음. 아두이노 키트 주문해서 미리 진행해보겠다.                                                      |
  | 김민지 | 어제 아두이노랑 센서들 받아서 확인해봤고 회로도 받아서 꽂아서 만들것이다.                                                                                |
  | 백상욱 | - REST API랑 Socket통신 어느정도 정립, 기능별로 구분했습니다. <br/> - REST로 서버 구축하는 중, qt로 로그인해서 디스플레이 어느정도 만들 수 있을 것 같다. |
  | 백유리 | 화자 인식하는거 알아봤는데 api로 되는것 같더라. 구글 api랑 마이크로소프트 api가 있더라 둘중 뭐할지 테스트 중이다.                                        |
  | 허남규 | 보드 배달. 민주, 민지님 하는 작업 같이 하게 될것 같다. 하드웨어 작업도 진행중에 있다.                                                                    |

<br/>
<br/>

### 10월 27일

- Daily Scrum

  | member | content                                                                                                                                             |
  | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
  | 김민주 | 연결선이 없어서 아직 진행한건 없고 구글링을 하면서 공부를 하고 있다. 구성이 오늘 올것 같다.                                                         |
  | 김민지 | 블루투스 모듈 설정하는 at명령어 공부하고 프로토콜 설계했고 커피머신에 들어갈 펌웨어 제작하였다.                                                     |
  | 백상욱 | qt화면 만들고 로그인 진행했다. 이쁘게 만들어주는 라이브러리를 찾았다. 근데 라파에서 버전이 안맞아서 아직 진행 중. 좀만 더 해보고 안되면 때려치겠다. |
  | 백유리 | 에저 쓰려다가 에저 레퍼런스가 너무 없어서 네이버 스피치로 바꿨고 화자 인식이 되었다. TTS랑 섞어서 화자인식 하는 방법을 만들어 보겠다.               |
  | 허남규 | 블루투스 모듈 설정하는 at명령어를 공부했고 하드웨어를 제작해보았다.                                                                                 |

<br>

- 회의내용

  - 자치회 설문 진행!
  - 파이큐티는 큐티를 기반으로 하는데 파이큐티는 설치해둔 큐티를 사용해야 하는데 버전이 안맞아서 진행이 안된다.

<br/>
<br/>

### 10월 28일

- Daily Scrum

  | member | content                                                                                |
  | ------ | -------------------------------------------------------------------------------------- |
  | 김민주 | 키트가 생각보다 늦게 와서 시작했는데 라즈베리파이 전원이 잘 안켜져서 진행을 잘 못했다. |
  | 김민지 | 사용할 센서들 스펙들 찾고 스마트미러 안에 들어갈 온습도 센서 사용할 예정이다.          |
  | 백상욱 | 음성인식, 디스플레이 화면 합치고 있다. 생각보다 좀 어렵다. 터틀봇은 완성했다.          |
  | 백유리 | 백신공가                                                                               |
  | 허남규 | 터틀봇 완성해서 하드웨어 만들기 시작할것이다.                                          |

<br/>
<br/>

### 10월 29일

- Daily Scrum

  | member | content                                                                                                                                                  |
  | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | 김민주 | 라파 전원선 주문하고 도착하면 통신 진행할 것이다.                                                                                                        |
  | 김민지 | 어제 온습도 센서 사용법 알았고 오늘은 릴레이 사용 테스트 할거다.                                                                                         |
  | 백상욱 | 어제 음성인식이랑 얼굴표현이랑 합쳤다. 그래서 말에따라서 표정이 바뀌는걸 확인 할 수 있다. 하드코딩적 느낌이 쎄지만 어떤식으로 표정을 바꿀지를 생각해보자 |
  | 백유리 | 화자인식하고 있다. 이번주 말 안에 끝나게 될것 같다.                                                                                                      |
  | 허남규 | 로봇 제작 완료, 치수 재서 모델링 들어가고 오늘도 모델링 할거다.                                                                                          |

<br>

- 회의내용

  - 알림 기능을 위해서 db에 시간정보를 넣어야 할것 같다. 해당 기능을 어디에 넣을지를 생각해봐야겠다.
  - 루틴에 넣는다면 db 설계를 바꿔야 할것이다.
  - 기존에 있는 기능중 어떤것을 알림할것인가? 최초기능구현 단계
  - 음성인식 부분이 일정시간이 지나면 꺼진다. 해결법을 생각해봐야한다.

<br/>
<br/>

</details>

  <details>
    <summary>4주차(2021년 11월 1일 ~ 2021년 11월 5일)</summary>

### 11월 1일

- Daily Scrum

  | member | content                                                                                                                                                                                                                             |
  | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | 김민주 | 시리얼 통신 진행 완료.                                                                                                                                                                                                              |
  | 김민지 | 디바이스마트 외에 다른것들 오늘이면 다 올것이다. 펌웨어 완성할것이다.                                                                                                                                                               |
  | 백상욱 | 메인프로그램 손좀 봤고 대화를 몇개 넣었다. 좀더 가능성있게 만들었다. 터틀봇 환경설정 후 작동 시켜봤다. 오늘은 유미 개발하겠다.                                                                                                      |
  | 백유리 | - 음성인식 관련해서 하고 있었는데 구글 stt는 스트리밍 방식이더라, 클로버는 REST api 로 되어있다. 스트리밍을 하면서 REST api로 할지 오디오로 할지 고민중이다. <br/> - 백엔드랑 프론트 엔드 유미 개발해야할거 정리해서 진행할것 같다. |
  | 허남규 | 모델링 해서 학교에서 살아야할수도 있겠다.                                                                                                                                                                                           |

  <br>

- 회의내용

  - 날씨 같은 api를 붙여서 유미랑 대화할때 더 큰 시너지가 있더록 해보자
  - iot 부분!! 이번주 중에 민주님과 민지님이 통신테스트 까지 잘 진행될것이다.

  <br/>
  <br/>

### 11월 2일

- Daily Scrum

  | member | content                                              |
  | ------ | ---------------------------------------------------- |
  | 김민주 | 라파로 서보모터 동작 구현 중이다.                    |
  | 김민지 | 릴레이 사용으로 펌웨어 마무리 할거다.                |
  | 백상욱 | 로봇 반응이 챗봇 같다. 챗봇 관련된 api를 연구해봤다. |
  | 백유리 | 유미 관리페이지                                      |
  | 허남규 | 하드웨어 재설계, 프린트 요청 해놓았다.               |

  <br/>
  <br/>

### 11월 3일

- Daily Scrum

  | member | content                                                                |
  | ------ | ---------------------------------------------------------------------- |
  | 김민주 | 교보재 수령하고 오늘은 민지님과 합치는거 함께 진행할 예정이다.         |
  | 김민지 | 민주님 통신 부분과 펌웨어를 합칠 예정이다.                             |
  | 백상욱 | 챗봇을 활용해봤는데 메인프로그램 안에서 잘 돌아가게 완성도를 높이겠다. |
  | 백유리 | 유미 관리 페이지 계속 진행중이다.                                      |
  | 허남규 | 7인치로 변경된 하드웨어를 다시 재설계 했고 프린트 요청 해놨습니다.     |

<br>

- 회의내용

  - 우선 로봇 레이어 하나 더 올리는건 추후에 치수보고 진행하면 될것 같다.
  - 로봇에 팔하나 더 다는것도 추후에 치수 보고 진행할 예정이다.

  <br/>
  <br/>

### 11월 4일

- Daily Scrum

  | member | content                                                                                                                                     |
  | ------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
  | 김민주 | 펌웨어와 라즈베리파이를 연결하는 미들웨어 작업 진행했습니다.                                                                                |
  | 김민지 | - 펌웨어와 라즈베리파이를 연결하는 미들웨어 작업 진행했습니다. <br/> - 전조등쪽 펌웨어 수정할거다.                                          |
  | 백상욱 | 병가                                                                                                                                        |
  | 백유리 | 유미 음성인식 페이지에서 오디오 보내주는 작업 진행중이다. 이거 끝나면 알람 작업에 대해서 생각을 해볼것 같다.                                |
  | 허남규 | 펌웨어와 라즈베리파이를 연결하는 미들웨어 작업 진행했습니다. 다만 블루투스에 문제가 있어서 연구실에서 가져와서 다시 진행해야 할것 같습니다. |

  <br/>
  <br/>

### 11월 5일

- Daily Scrum

  | member | content                                                                                                                                                                           |
  | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | 김민주 | 라즈베리파이 블루투스 모듈 연결 완료했다. 민지님과 합류해서 펌웨어 작업 진행할 예정                                                                                               |
  | 김민지 | 커피머신, 전조등 펌웨어 개발 완료했고 민주님과 합류해서 통합 과정 진행할 예정                                                                                                     |
  | 백상욱 | 아파서 많이 진행을 못했다.ㅠ 기본적인 대화 관련 스크립트 넣어볼거고 + 터틀봇에 명령 내리는 부분 진행할 예정                                                                       |
  | 백유리 | 화자 인식 등록 진행중이지만 안되는 부분이 많다 오늘 해결 해보고 알람 기능 주말에 진행할 예정                                                                                      |
  | 허남규 | 3D 프린트 출력 결과 기다리고 있으며 출력 수정 작업 진행중이다. 1시에 최종 출력 확인하고 이상 없으면 민지님 집으로 이동해서 민주님, 민지님, 저 셋이서 iot 제품 최종 마무리 할 예정 |

<br>

- 회의 내용

  - 루틴 항목에 로봇의 액팅을 설정할 수 있는 부분을 만들 수 있으면 좋겠다. 우리의 핵심 기능일 수 있는 부분!
  - 시간이 얼마 없지만 해볼 가치는 있다.
  - 로봇 서버

    - (소켓 통신) 주행용 라즈베리 파이
    - (소켓 통신? + REST) 기능용 라즈베리 파이

      <br/>
      <br/>

      </details>

    <details>
    <summary>5주차(2021년 11월 8일 ~ 2021년 11월 12일)</summary>

    ### 11월 8일

    - Daily Scrum

      | member | content                                                                                                               |
      | ------ | --------------------------------------------------------------------------------------------------------------------- |
      | 김민주 | 스탠드 제어 완료, 서보 모터에 스위치를 누를 장치를 만들 예정이다.                                                     |
      | 김민지 | 스마트 미러에 들어갔던 소스들 다시 복구                                                                               |
      | 백상욱 | 메인 프로그램의 구성을 좀 더 공고히 했다. 터틀봇 제어를 제외하고 관련된 내용 내일까지 진행하면 완성할 수 있을것 같다. |
      | 백유리 | 화자 인식 완료, 터틀봇 원격 연결하기 해볼 예정                                                                        |
      | 허남규 | 터틀봇 3D 프린팅 중!                                                                                                  |

    <br>

    - 회의 내용

      - 커피머신 한 번 누르고 40초~50초(예열) 기다렸다가 다시 눌러야 작동한다.
      - 터틀봇 제어 유리님께 부탁드립니다!
      - 고감도 소리센서 없음;; 스마트 미러 복구되면 하는 방법 알려주기

    <br/>
    <br/>

    ### 11월 9일

    - Daily Scrum

      | member | content                                                                             |
      | ------ | ----------------------------------------------------------------------------------- |
      | 김민주 | 모델링 한 부분 전달해서 출력 중이다. 모델링한 결과물 수령 예정이고 공유하겠다.      |
      | 김민지 | 서보모터 펌웨어 수정할 생각이다.                                                    |
      | 백상욱 | 계속 메인프로그램 수정중이고 오늘까지 어느정도 완성 할 예정이다.                    |
      | 백유리 | 화자인식 버그 수정 완료, 터틀봇 환경설정 진행하고 socket통신까지 진행했으면 좋겠다. |
      | 허남규 | 안녕히계세요!                                                                       |

    <br>

    - 회의 내용

      - 목요일날 백상욱 집으로 집합하기 프로세스 합치기!
      - 로봇 모델링 부분에서 팔 부분 구멍 뚫었으면 좋겠다!
      - 서보 모터로 팔 관련 움직임 따로 몇가지 만들어 두었으면 합니다.

    <br/>
    <br/>

    ### 11월 10일

    - Daily Scrum

      | member | content                                                                                                      |
      | ------ | ------------------------------------------------------------------------------------------------------------ |
      | 김민주 | 출력물 수령 완료, 커피머신 관련 출력물은 아직 수령 못함 받게 되면 공유하고 터틀봇 내부 구성 설계할 예정이다. |
      | 김민지 | 하드웨어 파일 보고 서보모터 들어갈 내부 설계 확인해 보겠다.                                                  |
      | 백상욱 | 기능들 많이 만들었고 가능하면 영상으로 공유를 하겠다.                                                        |
      | 백유리 | 소켓 연결 완료 웹에서 제어가 되고 있다. 그 외에 기능들 제어를 진행해봐야겠다.                                |

    <br/>
    <br/>

    ### 11월 11일

    - Daily Scrum

      | member | content                                                                         |
      | ------ | ------------------------------------------------------------------------------- |
      | 김민주 | 하드웨어 구성을 해봤는데 다같이 모여서 논의를 해봐야겠다.                       |
      | 김민지 | 모터 관련해서 문의를 해보았고 하드웨어 구성 관련해서 오늘 논의를 해야겠다.      |
      | 백상욱 | 기능들 추가했고 로봇 표정도 추가하고 서버관련해서도 조금 정비했다.              |
      | 백유리 | 터틀봇 제어에 대해서 계속 연구했고 제어에 대해서 지속적으로 연구할 필요가 있다. |

    <br>

    - 회의 내용

      - 상욱님 집 12:00

    <br/>
    <br/>

    ### 11월 12일

    - Daily Scrum

      | member | content                                                                                                                                  |
      | ------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
      | 김민주 | 커피머신 날개 파트 모델링 하고 있고 오늘 중으로 출력을 시작할 수 있도록 하겠습니다.                                                      |
      | 김민지 | 전원 장치에 필요한 부품 찾고 모델 출력 요청을 바로 할 수 있도록 하겠다.                                                                  |
      | 백상욱 | 싸피 서버에 로봇 서버 코드 올리고 연동 확인해봤다. 기능 추가 및 표정 추가 짬짬이 할거고 감성적인 대화 스크립트를 구상을 해볼 예정입니다. |
      | 백유리 | 주행 로직 계속 짜고 터틀봇 관련 개발 계속 진행할 예정이다.                                                                               |

    <br>

    - 회의 내용

      - 감성적인 대화 스크립트 제작이 필요하다.
      - 상황별 10가지 입력 스크립트 5가지 응답 스크립트가 필요합니다.
      - 상황별 키워드 10가지 정도 생각해보기. 주말동안에도 계쏙~~
      - 다음주 화요일날 모임 진행합시다.

    <br/>
    <br/>

    </details>
    <details>
    <summary>6주차(2021년 11월 15일 ~ 2021년 11월 19일)</summary>

    ### 11월 15일

    - Daily Scrum

      | member | content                                                                                                           |
      | ------ | ----------------------------------------------------------------------------------------------------------------- |
      | 김민주 | 모델링 출력 맡겼고 학교가서 필요한 작업이랑 물품 챙겨 오겠다.                                                     |
      | 김민지 | 모델링 출력 맡겼고 학교가서 필요한 작업이랑 물품 챙겨 오겠다.                                                     |
      | 백상욱 | 대화랑 기능 더 넣었다. 기능적으로 마무리하고 소켓 통신 연결해놓겠다.                                              |
      | 백유리 | 주행 부분 완료했지만 테스트가 필요하다. 웹 페이지에서 유미에게 명령 내릴 화면 구성을 어떻게 할지 논의가 필요하다. |

    <br>

    - 회의 내용

      - 유미 관리 페이지에 뭘 더 넣을까?
      - 유미 상태 점수를 추가하고 싶다.
      - 상태 점수 마다 다른 반응을 하고 싶은데... 시간이 가능할까?
      - 배터리 테스트 해보기

    <br/>

    - **화** : 로봇 완성
    - **수** : 최종 테스트 및 UCC 촬영
    - **목** : UCC제작, 시연 및 발표 준비

    <br/>
    <br/>

    ### 11월 16일

    - Daily Scrum

      | member | content                                                                                                |
      | ------ | ------------------------------------------------------------------------------------------------------ |
      | 김민주 | 필요한 작업 학교에서 진행했고 오늘 모여서 작업 진행해봐야 할것 같다.                                   |
      | 김민지 | 필요한 작업 학교에서 진행했고 오늘 모여서 작업 진행해봐야 할것 같다.                                   |
      | 백상욱 | 기능 계속 다듬고 소켓 연결 해두긴 했고 오늘 모여서 작업 진행해봐야 할것 같다.                          |
      | 백유리 | 로봇 서버 https해놓고 소켓 연결 해두었지만 aws연결 되는지 테스트 필요. 친밀도 레벨 관련 문서작업 했다. |

    <br/>
    <br/>

    ### 11월 17일

    - Daily Scrum

      | member | content                                                                                                                             |
      | ------ | ----------------------------------------------------------------------------------------------------------------------------------- |
      | 김민주 | 하드웨어 조립 완료했고 UCC 소스 촬영 들어갑니다. 배터리 충전 완료.                                                                  |
      | 김민지 | 하드웨어 조립 완료했고 UCC 소스 촬영 들어갑니다. 필요한 물품 챙겨서 합류하겠다.                                                     |
      | 백상욱 | 하드웨어 조립했고 로봇과 웹 서버 연결 완료했습니다. 다듬는 작업 하고 음성 데이터를 정제를 할 필요가 있고 대화 학습을 시킬 예정이다. |
      | 백유리 | 로봇과 웹 서버 연결을 완료했고 지금까지 한 것 배포 완료했다. 다듬는 작업 및 UCC 촬영 진행하겠다.                                    |

    <br/>
    <br/>

    ### 11월 18일

    - Daily Scrum

      | member | content                                                                          |
      | ------ | -------------------------------------------------------------------------------- |
      | 김민주 | UCC 촬영 했고 편집 진행중입니다.                                                 |
      | 김민지 | UCC 촬영 했고 필요한 부분 촬영 더 진행하겠다.                                    |
      | 백상욱 | UCC 배우 했고 소스 진짜 쪼금만 더 손보고 발표 자료 준비 및 시연 연습 하겠습니다. |
      | 백유리 | UCC 촬영 했고 남은 일들 돕겠다.                                                  |

    <br/>
    <br/>

    ### 11월 19일

    **최종발표**

    <br/>
    <br/>

    </details>
    </details>
