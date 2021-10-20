import { all, fork, put, takeLatest, call } from "redux-saga/effects";
import axios from 'axios'
import {
  LOAD_EVENT_REQUEST,
  LOAD_EVENT_SUCCESS,
  LOAD_EVENT_FAILURE,
} from '../reducers/calendar'

  

function loadEventAPI(){
    console.log('load event 요청!')
    return axios.get('/schedule')
}
function* loadEvent(){
    try{
        const result = yield call(loadEventAPI)
        yield put({
            type: LOAD_EVENT_SUCCESS,
            data: result.data
        })
    } catch(error){
        yield put({
            type: LOAD_EVENT_FAILURE,
            error: error.response.data
        })
    }
}

function* watchLoadEvent(){
  yield takeLatest(LOAD_EVENT_REQUEST, loadEvent)
}
export default function* challengeSaga() {
    yield all([
      fork(watchLoadEvent)
    ])
  }