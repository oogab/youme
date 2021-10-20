# Frontend

## 진행사항

- ### 2주차

  - 아이디어 및 주제 기획
  - 기능 명세서 초안 작성
  - 와이어 프레임 및 목업 작업
  - react 공부

- ### 3주차

  - 화면 상세 구성(목업 작업 완료)
  - 전체적인 React Component 설계
  - 회원가입, 로그인 UI 구현 시작
  - react 공부

- ### 4주차

  - 회원가입, 로그인 UI 구현 완료
  - 미러 화면 UI 구현
  - 챌린지 관련 페이지 UI 구현 시작

- ### 5주차

  - 웹 UI 구현 완료
  - redux, redux-saga 사용하여 데이터 전달
  - backend와 연결

<br/>

<br/>

## react-saga 사용법

### 1. 사용하는 이유

    redux는 무조건 동기적으로 dispatch가 이루어진다. 또한 dispatch를 여러번 할 경우 컴포넌트 파일에서 dispatch 로직을 2번 써야해서 불편하기도 하다. 그래서 나온 미들웨어가 redux-saga
    redux-saga는 비동기적으로 dispatch 사용 가능(put), 내부 메소드를 활용하여 사용자의 부주의로 인하여 동일한 api를 여러번 req 할 경우 가장 최근 or 가장 마지막 req의 res만 받아오도록 하는 기능도 있다(thuttle, debouce)

### 2. 선수지식(generator)

- 함수에 \*를 붙이고, yield라는 문법을 사용
- next()를 이용하여 다음 yield를 호출

```
	const gen = function* () {
		console.log(1);
		yield;
		console.log(2);
		yield;
		console.log(3);
		yield;
		console.log(4)
	}
	const gener = gen()
	// gener() - gener{<suspended>}
	gener().next() -> 1
	gener().next() -> 2
	gener().next() -> 3
	gener().next() -> 4
	gener().next() -> undifined
```

### 3. saga 이펙트 함수

```
이펙트 : saga의 미들웨어가 실행할 명령을 포함하고 있는 평범한 자바스크립트 객체
```

- `put` : dispatch 이펙트를 생성하는 함수(yield_put, redux_dispatch)
- `all` : 배열을 받고, 받은 이펙트를 등록 (실행 아님, 등록임!!)
- `fork` : 함수를 실행
- `call` : 동기함수호출 (api가 리턴할때까지 기다림), fork은 비동기함수 호출 (안기다리고 리턴 다음꺼 이동)
  - **통신할때는 무조건 call** (yield가 await과 비슷)
  - 미들웨어가 프로미스의 resolve를 기다리게 함
- `take` : call, put과 비슷
  - 특정한 액션을 기다리기 위해서 미들웨어에 알려주는 명령 오브젝트 생성
- 미들웨어가 매칭되는 액션이 dispatch 될 때까지 기다림
- `takeEvery` : 한번 실행되도, 이벤트 계속 리슨
- `takeLatest` : 마지막으로 발생된 req의 응답만 얻고싶을 때(마지막 버전의 데이터만 보여줘야할 때)
  - 이미 완료됬다면 실행 -> 둘다 팬딩이면 뒤에꺼만
  - **front -> back으로 2번 req를 보내긴함 -> 그러나 b->f로 res는 1번 보냄 (즉, 서버단에 저장 2번됬는지 확인 필요)**
  - 즉, 새로고침하면 2개가 반영될수있음
  - 이를 막기위해 throttle가 있음
- `throttle` : 초 이내에 req를 1번만
  - 스크롤 (마지막 함수가 호출된 후 일정 시간이 지나기전 재호출 안함)
- `debounce`: 검색 결과 - 초 이내에 req를 1번만 (연이어 호출되는 함수들 중 마지막 함수 or 가장 처음 함수만 호출)
- `takeLeading`: 첫번째 이벤트만 실행, 뒤에꺼 무시

<br/>

## 명령어

- `npx pm2 reload all` : 서버 재부팅
- `npx pm2 monit` : 서버 로그 확인
  <br/>
  <br/>

## directory

```
/public
	/images
	-Vo_icon.png
-favicon.ico
-index.html
-logo192.png
-logo512.png
-manifest.json
-index.html
```

```
/src
	/common
	- CommonHooks.jsx                -> key press, local storage state
	- InfiniteScroll.jsx             -> handle infinite scroll
	- MediaQueryHooks.jsx            -> material-ui useMediaQuery hooks

	/components
		/Auth
			/SignResponsiveDialog        -> sigin in, sigin up, recover pw
		/Challenge
			/NewChallenge        		 -> new challenge
			/RecommendChallenge			 -> recommend challenge
			/TotalChallenge				 -> total challenge

	/css                             -> reset css

	/layout
		/Drawer                        -> side nav
		/Header                        -> head nav
		/Layout                        -> layout root

	/pages
	- Auth                       -> user
	- Challenge                  -> challenge
	- NotFound                   -> 404 page

```

```
App.js
```

```
index.js
```

```
serviceWorker.js
```

```
package.json
```

```
README.md
```

#### run

```
npm install
npm start
```
