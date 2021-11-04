const express = require('express')
const { isLoggedIn } = require('./middlewares')
const router = express.Router()
const { UsersYoume } = require('../models')
const axios = require('axios')

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

router.post('/entroll',  async (req, res, next)=>{
    try{
        console.log(req.body)
        for (var key of req.body.keys()) {

            console.log(key);
          
          }
          
          for (var value of req.body.values()) {
          
            console.log(value);
          
        }
        // const result = await customAxios({
        //     method:'post',
        //     url:'/speaker/identification/v2.0/text-independent/profiles/'+req.body.profileId+'/enrollments',
        //     headers:{'Content-Type':'audio/wav; codecs=audio/pcm'},
        //     body:{audioData:req.body.audio}
        // })

        res.status(200).send()
    }catch (error) {
        console.error(error)
        next(error)
    }
})
module.exports = router