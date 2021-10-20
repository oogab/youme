import {
  all,
  fork,
} from 'redux-saga/effects'
import axios from 'axios'

import userSaga from "./user"
import routineSaga from './routine'
import habitSaga from './habit'
import challengeSaga from './challenge'
import calendarSaga from './calendar'
import { backUrl } from '../config/config'

axios.defaults.baseURL = backUrl
axios.defaults.withCredentials = true

export default function* rootSaga() {
  yield all([
      fork(userSaga),
      fork(routineSaga),
      fork(habitSaga),
      fork(challengeSaga),
      fork(calendarSaga),
  ])
}