# redux-saga

#### 제너레이터 (function*)

- 반복자이면서 반복 가능한 객체.

```javascript
function* f1() {
  console.log('f1-1');
  yield 10;
  console.log('f1-2');
  yield 20;
  console.log('f1-3');
  return 'finished';
}
const gen = f1();
```

- 제너레이터 함수를 호출하면 제너레이터 객체가 반환됨.
  - 객체 안에는 next 라는 함수가 있고, 이를 호출할때마다 yield 있는 구간까지 실행된다.
  - next 호출 시, {value : 리턴값 , done : 함수끝까지 가면 ?true :false }
  - 자바의 iterator 생각하면서 이해하면 좋을 것 같다.

- for of 문법도 사용할 수 있다.

```javascript
for(const v of f1()){
	console.log(v);
}
```

- 제너레이터는 yield 부분에서 실행을 멈출 수 있기 때문에 무한루프로 표현을 해도 된다.

```javascript
function* naturalNumbers() {
  let v = 1;
  while (true) {
    yield v++;
  }
}
```

### redux-saga 함수

------

#### redux-saga/effects

- put : 리덕스 액션 발생시키는 함수

- call : 서버의 api 호출 함수가 인수로 들어간다 (동기 실행)
- fork : 비동기 실행
- takeLeading : 실행하고 있는 함수가 있다면, 그 사이에 들어온 요청(액션)은 무시하고, 처음에 들어온 액션을 우선으로 처리한다.
- takeLatest : 실행하고 있는 함수가 있어도, 이를 취소하고 제일 최근에 요청한 액션을 처리한다.

------

- ```
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : 리덕스 확장 프로그램 사용하는 경우 필요한 함수
  ```

- createSagaMiddleware : 리덕스 사가를 사용하고 싶은 경우, 이 함수를 통해 미들웨어 생성할 수 있다.

