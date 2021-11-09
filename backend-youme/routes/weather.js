const express = require('express')
const axios = require('axios')
const { weatherDescription } = require('../config/weather_description')
const { User } = require('../models/')

const router = express.Router()

// GET / 라우터
router.post('/', async (req, res, next) => {
  const userId = req.body.userId

  try {
    const user = await User.findOne({
      where: { id: userId }
    })
    if (!user) {
      return res.status(400).json({ message: '존재하지 않는 사용자입니다.' })
    }
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json?language=ko&address='+encodeURI(user.main_address)+'&key='+process.env.GEOCODING_KEY);
    const location = response.data.results[0].geometry.location
    const adr = response.data.results[0].address_components
    let dong = ''
    for(let item of adr){
      if(item.types.length===3 && item.types[2]==='sublocality_level_2'){
        dong=item.short_name
        break
      }
      if(item.types.length===3 && item.types[2]==='sublocality_level_1'){
        dong=item.short_name
        break
      }
      if(item.types.length===2 && item.types[0]==='administrative_area_level_1'){
        dong=item.short_name
        break
      }
      if(item.types.length===2 && item.types[0]==='country'){
        dong=item.long_name
        break
      }
    }
    const weather = await axios.get('https://api.openweathermap.org/data/2.5/onecall?units=metric&exclude=hourly?&lat='+location.lat+'&lon='+location.lng+'&appid='+process.env.OPENWEATHER_KEY+'&lang=kr')
    const d = weather.data.daily.map(d => new Date(d.dt*1000))
    const dt = d.map(dt => dt.toUTCString())
    // console.log(dt)
    
    res.status(200).send({ message : weatherDescription[weather.data.current.weather[0].id] })
  }catch (error) {
    console.error(error)
    next(error)
  }
})

module.exports = router