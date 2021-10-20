import {
    all,
    fork,
  } from 'redux-saga/effects'
  import axios from 'axios'
  
  // import postSaga from "./post"
  import calendarSaga from "./calendar"
  import userSaga from './user'
  import weatherSaga from './weather'
  import routineSaga from './routine'
  import challengeSaga from './challenge'
  import { backUrl } from '../config/config'
  
  axios.defaults.baseURL = backUrl
  axios.defaults.withCredentials = true
  
  export default function* rootSaga() {
    yield all([
        // fork(postSaga),
        fork(calendarSaga),
        fork(userSaga),
        fork(weatherSaga),
        fork(routineSaga),
        fork(challengeSaga),

    ])
  }