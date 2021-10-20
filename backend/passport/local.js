const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const bcrypt = require('bcrypt')
const { User } = require('../models')

module.exports = () => {
  passport.use('local', new LocalStrategy({
    usernameField: 'email', // req.body.email
    passwordField: 'password', // req.body.password
  }, async (email, password, done) => {
    try {
      const user = await User.findOne({
        where: { email }
      })
      if (!user) {
        return done(null, false, { reason: '가입되지 않은 회원입니다.' })
      }
      const result = await bcrypt.compare(password, user.password)
      if (result) {
        return done(null, user)
      }
      return done(null, false, { reason: '비밀번호가 틀렸습니다.'})
    } catch (error) {
      console.error(error)
      return done(error)
    }
  }))
}