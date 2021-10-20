
import React,{useEffect} from 'react'
import weatherToKorean from '../weatherToKorean'
import Weather from '../WeatherComponent'
import Wrapper from './styles'
import {Typography,CardActions} from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux'
import {LOAD_WEATHER_REQUEST} from '../../../reducers/weather'


function App() {
  const dispatch = useDispatch()
  let {weatherDong, nowWeather,expectedWeathers} = useSelector((state)=> {return state.weather})
  useEffect(()=>{
    dispatch({
      type:LOAD_WEATHER_REQUEST,
    })
  },[dispatch])
  return (
    <Wrapper>
      {
        !nowWeather.date?
        null:
        <>
        <CardActions className='now-weather-div'>
          <img src={'http://openweathermap.org/img/wn/'+nowWeather.weather.icon+'@2x.png'} alt='' id='now-weather-icon'></img>
          <Typography  id='now-temp' className='text' style={{fontSize:'40px'}}>{Math.ceil(nowWeather.nowTemp)}°</Typography>
          <Typography variant='h4' className='text' style={{fontSize:'30px',width: "100px", textAlign: "center"}}>{weatherToKorean(nowWeather.weather.id)}</Typography>
          <div id='min-max-temp' className='text'>
            <Typography variant='h6' style={{color:'deepskyblue'}}>{Math.ceil(nowWeather.minTemp)}°</Typography>
            <Typography variant='h6' >/</Typography>
            <Typography variant='h6' style={{color:'lightcoral'}}>{Math.ceil(nowWeather.maxTemp)}°</Typography>
          </div>
          <Typography id='dong' className='text'>{weatherDong}</Typography>
        </CardActions>
        <div id='next-weather'>
          {
            expectedWeathers.map((item, idx) =>(<Weather item={item} key={idx} idx={idx}></Weather>))
          }
        </div>
        </>
      }
    </Wrapper>
  );
}

export default App;
