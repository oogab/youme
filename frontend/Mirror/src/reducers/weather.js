import produce from 'immer'

const initialState = {
    loadWeatherLoading: false, 
    loadWeatherDone: false,
    loadWeatherError: null,

    weatherDong:'',
    nowWeather:{},
    expectedWeathers:[],
}

export const LOAD_WEATHER_REQUEST = 'LOAD_WEATHER_REQUEST'
export const LOAD_WEATHER_SUCCESS = 'LOAD_WEATHER_SUCCESS'
export const LOAD_WEATHER_FAILURE = 'LOAD_WEATHER_FAILURE'

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch(action.type) {
    case LOAD_WEATHER_REQUEST:
      draft.loadWeatherLoading = true
      draft.loadWeatherDone = false
      draft.loadWeatherError = null
      break
    case LOAD_WEATHER_SUCCESS:
      draft.loadWeatherLoading = false
      draft.loadWeatherDone = true
      draft.weatherDong = action.data.dong
      const daily = action.data.weather.daily
      const hourly = action.data.weather.hourly
      draft.nowWeather={
            date : new Date(daily[0].dt*1000),
            minTemp: daily[0].temp.min,
            maxTemp: daily[0].temp.max,
            nowTemp: hourly[0].temp,
            weather: hourly[0].weather[0]
      }
      draft.expectedWeathers=[]
      for(let i=1;i<6;i++){
        draft.expectedWeathers.push({
            date : new Date(daily[i].dt*1000),
            minTemp: daily[i].temp.min,
            maxTemp: daily[i].temp.max,
            weather: daily[i].weather[0]
        })
      }
      break
    case LOAD_WEATHER_FAILURE:
      draft.loadWeatherLoading = false
      draft.loadWeatherError = action.error
      break
      default:
        break
  }
})

export default reducer