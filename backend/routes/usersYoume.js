const express = require('express')
const { isLoggedIn } = require('./middlewares')
const router = express.Router()
const { UsersYoume } = require('../models')
const axios = require('axios')
const multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
    },
    filename: function (req, file, cb) {
      cb(null, 'hello.wav') // cb 콜백함수를 통해 전송된 파일 이름 설정
    }
})
const fs = require('fs')
const upload = multer({ storage: storage })


const customAxios = axios.create({
    baseURL: process.env.AZURE_ENDPOINT,
    headers:{'Ocp-Apim-Subscription-Key':process.env.AZURE_KEY}
  })
// GET / 라우터
router.get('/',isLoggedIn,  async (req, res, next) => {
    try {
        const youmeInfo = await UsersYoume.findOne({
            where: { UserId: req.user.id,},
        })
        res.status(200).send(youmeInfo)
    }catch (error) {
        console.error(error)
        next(error)
    }
})

router.post('/profile', isLoggedIn, async (req, res, next)=>{
    try{
        const result = await customAxios({
            method:'post',
            url:'/speaker/identification/v2.0/text-independent/profiles',
            headers:{'Content-Type':'application/json'},
            data:{locale:'en-US'}
        })

        const youmeInfo = await UsersYoume.update({
            connectedSpeaker: true,
            SpeakerId : result.data.profileId,
        },
        {
            where: {UserId: req.user.id}
        })
        res.status(200).send(result.data.profileId)
    }catch (error) {
        console.error(error)
        next(error)
    }
})

router.post('/entroll',isLoggedIn, upload.single('file'),  async (req, res, next)=>{
    try{
        let audio = fs.createReadStream('uploads/hello.wav')
        const speakerId = await UsersYoume.findOne({
            attributes:['SpeakerId']
        },{
            where:{
                UserId : req.user.UserId
            }
        })
        const result = await customAxios({
            method:'post',
            url:'/speaker/identification/v2.0/text-independent/profiles/'+speakerId.SpeakerId+'/enrollments',
            headers:{'Content-Type': 'multipart/form-data'},
            body:{audioData : audio}
        })

        res.status(200).send(result)
    }catch (error) {
        console.log(error.response.data)
        next(error)
    }
})
module.exports = router