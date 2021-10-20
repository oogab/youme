### MYME-SERVER

### History
- __07-19 ~ 07-23__ : 데이터베이스 및 프로젝트 아키텍처 설계, 백엔드 서버 기초 구성
- __07-23 ~ 07-29__ : 데이터베이스 구축 백엔드 및 프론트엔드 서버 구축 및 로그인 회원가입 API 완성

#### MYME Back

```
MYME 서비스의 백엔드 서버를 개발하고 있습니다.
Node.js의 Express 프레임워크를 사용하여 개발할 예정입니다.

일반 데스크톱, 모바일에서 접속 가능한 web과
MYME 스마트미러에서 접속 가능한 web을 따로 둘 생각입니다.

Back server 2대 Front server 2대 총 4대의 AWS EC2를 생성하였습니다.
이미지 업로드를 해야할 작업이 있기 때문에 AWS S3, lambda를 사용할 예정입니다.

```

#### directory

```
/config
    - config.js
/migrations
/models
    - habit.js
    - index.js
    - routine.js
    - user.js
/modules
    - swagger.js
/passport
    - index.js
    - kakao.js
    - local.js
/public
/routes
    - auth.js
    - index.js
    - middlewares.js
    - user.js
/seeders
- .gitignore
- app.js
- index.html
- package-lock.json
- package.json
- README.md
```

### description

```
node.js에서 express프레임워크를 사용하여 백엔드를 구축한다.
express에서 제공되는 기능으로
- 라우팅
- 미들웨어
- 에러처리
- 디버깅등으로

심플하지만 강력한 기능을 제공한다.
- https://expressjs.com/

다양한 미들웨어
- https://expressjs.com/en/resources/middleware.html


추가로 DB와 연동하기위해 Sequelize라이브러리를 사용한다.

- https://sequelize.org/master/

```

### Dabtabase

- https://app.diagrams.net/#G1vJliTyhuFDLXzTC2KZrurrbWdzVOYVtw

#### run

```
npm install
npm start

- http://i5a201.p.ssafy.io:3000

```

### routes

```
GET     http://i5a201.p.ssafy.io:3000/
POST    http://i5a201.p.ssafy.io:3000/auth/join
POST    http://i5a201.p.ssafy.io:3000/auth/login

```
