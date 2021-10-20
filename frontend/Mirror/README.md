## 담당자

<a href="https://lab.ssafy.com/minjoo0112"><img src="https://secure.gravatar.com/avatar/9bdc67a1ff49729909fada0f0f14a994?s=800&d=identicon" width="100px;" alt=""/><br /><sub><b>김민주(Frontend)</b></sub></a>

<br/>

## Frontend_Mirror

미러 화면 UI 구현 중 입니다.<br/>
(07.30)현재 간단한 페이지 틀만 구현해놓았으며 상세 기능은 없습니다.

<br/>


## directory

```
/public
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

	/context                         -> create context

	/css                             -> reset css

	/pages
	- Auth                       -> user
	- Main						 -> main
	- NotFound                   -> 404 page

```

```
App.js
```

```
index.css
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
