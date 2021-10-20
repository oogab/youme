# MYME 빌드 및 배포 방법



## 사전 설치

- Visual Studio Code
- node.js LTS 버전

## Backend

#### - 폴더 : 

#### 1. backend

#### 2. backend-mirror

- 각 폴더 최상단에 .env 파일 추가 (2_외부 서비스 정보.md 참조)

- 터미널에서 아래의 코드를 차례대로 실행한다.

```
cd backend-web (또는 cd backend-mirror)
npm install
npm start
```

※ pm2가 없을 경우에는 "npm i pm2" 명령어를 실행하고 진행한다.

## Frontend

#### - 폴더 : 

#### 1. frontend/web

#### 2. frontend/Mirror

- 터미널에서 아래의 코드를 차례대로 실행한다.

```
cd frontend/web (또는 cd frontend/Mirror)
npm install
npm run build
npm install -g serve
serve -s build
```

- 로컬에서 백엔드와 통신이 불가한 경우, frontend/web/src/config/config.js 파일과 frontend/Mirror/src/config/config.js 파일에서 backUrl을 확인해본다.

```javascript
export const backUrl = 'http://localhost:3065'; //정상
```



## DB 접속 정보

#### - 사용 DB : MySQL

- Hostname : ssafy-pjt1-dbserver.cotmr33tcon0.ap-northeast-2.rds.amazonaws.com
- Username : admin
- Password : mechanic

