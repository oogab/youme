const express = require('express')
const axios = require('axios')
const { isLoggedIn } = require('./middlewares')
const router = express.Router()

// GET / 라우터
router.get('/',isLoggedIn,  async (req, res, next) => {
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json?language=ko&address='+encodeURI(req.user.main_address)+'&key='+process.env.GEOCODING_KEY);
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
        const weather = await axios.get('https://api.openweathermap.org/data/2.5/onecall?units=metric&exclude=hourly?&lat='+location.lat+'&lon='+location.lng+'&appid='+process.env.OPENWEATHER_KEY)
        res.status(200).send({weather:weather.data, dong})
    }catch (error) {
        console.error(error)
        next(error)
    }
})

module.exports = router