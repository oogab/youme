const express = require('express')
const path = require('path')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const dotenv = require('dotenv')
const passport = require('passport')
const cors = require('cors')
const passportConfig = require('./passport')
const helmet = require('helmet')
const hpp = require('hpp')
const { swaggerUI, specs } = require('./modules/swagger')

dotenv.config()
const app = express()
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))
const { sequelize } = require('./models')
const indexRouter = require('./routes')
const userRouter = require('./routes/user')
const challengeRouter = require('./routes/challenge')
const challengeParticipationRouter = require('./routes/challengeParticipation')
const routineRouter = require('./routes/routine')
const routinizedHabitRouter = require('./routes/routinizedHabit')
const habitRouter = require('./routes/habit')
const scheduleRouter = require('./routes/schedule')
const weatherRouter = require('./routes/weather')

app.set('port', process.env.PORT || 3065)
passportConfig()
sequelize.sync()
  .then(() => {
    console.log('데이터베이스 연결 성공')
  })
  .catch((error) => {
    console.error(error)
  })

// 아래의 미들웨어들은 내부적으로 next를 실행 해준다!
// 미들웨어간 순서도 매우 중요하다! 왜?
// 요청에 따라서 어디까지 실행되는지 결정된다. 중간에 실행 되면 => 거기서 멈춤, 서버 부하 줄어든다!
// app.set('trust proxy', 1)
// app.use(morgan('dev'))
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'))
  app.use(hpp())
  app.use(helmet())
} else {
  app.use(morgan('dev'))
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))
}

app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
  httpOnly: true,
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  name: 'connect.sid',
}))
// app.use('요청경로', express.static(path.join('실제 경로'))) -> 보안에 좋음, 서버 구조를 예측 불가능!
// app.use('/', (req, res, next) => {
//   if(req.session.id) {
//     express.static(path.join(__dirname, 'public'))(req, res, next)
//   } else {
//     next()
//   }
// })
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // true면 qs, false면 querystring
app.use(passport.initialize())
app.use(passport.session())
app.use(cors({
  origin: ['http://localhost:3000', 'https://mirrorme.today'],
  credentials: true,
}))

app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/challenge', challengeRouter)
app.use('/challengeParticipation', challengeParticipationRouter)
app.use('/routine', routineRouter)
app.use('/routinizedHabit', routinizedHabitRouter)
app.use('/habit', habitRouter)
app.use('/schedule',scheduleRouter)
app.use('/weather',weatherRouter)

app.use((req, res, next) => {
  // req.data = 'wook비번' // middleware간 data 전송
  next()
})

app.get('/', (req, res) => {
  // req.data // wook비번 // 이 라우터가 끝나고 나면 메모리가 정리되면서 req.data가 사라진다.

  // req.cookies // { mycookie: 'test' }
  // req.signedCookies // 서명된 쿠키
  // // 'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
  // res.cookie('name', encodeURIComponent(name), {
  //   expires: new Date(),
  //   httpOnly: true,
  //   path: '/',
  // })
  // res.clearCookie('name', encodeURIComponent(name), {
  //   httpOnly: true,
  //   path: '/',
  // })

  
  res.sendFile(path.join(__dirname, 'index.html'))

  // res.writeHead(200, { 'Content-Type': 'application/json' })
  // res.end(JSON.stringify({ hello: 'wook' }))
  // 위 아래 같은 동작
  // res.json({ hello: 'wook' })
})

app.post('/', (req, res) => {
  res.send('hello MYME')
})

app.get('/about', (req, res) => {
  res.send('hello MYME')
})

app.use((req, res, next) => {
  res.status(404).send('404')
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send('에러 발생!')
})

app.listen(app.get('port'), () => {
  console.log('익스프레스 서버 실행')
})