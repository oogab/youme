exports.isLoggedIn = (req, res, next) => {
  console.log(req)
  if (req.isAuthenticated()) {
    next()
  } else {
    res.send('로그인이 필요합니다.')
  }
}

exports.isNotLoggedIn = (req, res, next) => {
  console.log(req)
  if (!req.isAuthenticated()) {
    next()
  } else {
    res.send('로그인이 안 필요합니다.')
  }
}

exports.writeHistory = (req, res, next) => {
  try {
    if (req.body.transcript)
      console.log(req.body.transcript.trim())
    console.log(req.body)
    next()
  } catch (error) {
    console.log(error)
    next(error)
  }
}