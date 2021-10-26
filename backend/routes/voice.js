const express = require('express')
const axios = require('axios')
const { isLoggedIn } = require('./middlewares')
const router = express.Router()

// GET / 라우터
router.get('/speaker',isLoggedIn,  async (req, res, next) => {
    try {
        const headers = {
            "Content-Type":"application/json",
            "X-CLOVASPEECH-API-KEY":process.env.CLOVA_SPEECH_KEY
        }
        const result = await axios.post(process.env.CLOVA_SPEECH_URL)
        await axios({
            url:process.env.CLOVA_SPEECH_URL+'/recognizer/url',
            method :'post',
            headers,
            
        })
        res.status(200).send({weather:weather.data, dong})
    }catch (error) {
        console.error(error)
        next(error)
    }
})

module.exports = router