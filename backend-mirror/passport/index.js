const passport = require('passport')
const local = require('./local')
// const kakao = require('./kakaoStrategy')
const { User } = require('../models')

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id) // 세션에 user의 id만 저장
    // 서버 메모리가 한정되어 있는데 user의 데이터가 점점 커지게 되면서 다 담지 못하는 상황 발생!
    // id만 가지고 있으면 나머지 정보를 불러올 수 있으므로 id만 저장
  })

  // 3번 아이디 사용자의 쿠키
  // { id: 3, 'connect.sid': s%31283918723 }

  passport.deserializeUser((id, done) => {
    User.findOne({ where: {id} })
      .then(user => done(null, user)) // req.user 사용자 정보, req.isAuthenticated()
      .catch(error => done(error))
  })

  local(passport)
  // kakao(passport)
}