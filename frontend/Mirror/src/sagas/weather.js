import { all, fork, put, takeLatest, call } from "redux-saga/effects";
import axios from 'axios'
import {
    LOAD_WEATHER_SUCCESS,
    LOAD_WEATHER_REQUEST,
    LOAD_WEATHER_FAILURE
} from '../reducers/weather'

function loadWeatherAPI(){
    return axios.get('/weather')
}
function* loadWeather(){
    try{
        const result = yield call(loadWeatherAPI)

        yield put({
            type:LOAD_WEATHER_SUCCESS,
            data: result.data
        })
    }catch(error){
        yield put({
            type:LOAD_WEATHER_FAILURE,
            error
        })
    }
}


function* watchLoadWeather(){
    yield takeLatest(LOAD_WEATHER_REQUEST, loadWeather)
  }
  export default function* weatherSaga() {
      yield all([
        fork(watchLoadWeather),
      ])
}