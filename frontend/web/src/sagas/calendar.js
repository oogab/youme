import { all, fork, put, takeLatest, call } from "redux-saga/effects";
import axios from 'axios'
import {
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAILURE,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAILURE,
  MODIFY_EVENT_REQUEST,
  MODIFY_EVENT_SUCCESS,
  MODIFY_EVENT_FAILURE,
  LOAD_EVENT_REQUEST,
  LOAD_EVENT_SUCCESS,
  LOAD_EVENT_FAILURE,
} from '../reducers/calendar'

  import {
    OPEN_CONFIRM_MODAL
  } from '../reducers/modal'

function createEventAPI(data){
    return axios.post('/schedule', data)
}
function* createEvent(action){
    try{
        const result = yield call(createEventAPI, action.data)
        yield put({
            type: CREATE_EVENT_SUCCESS,
            data: result.data
        })
        yield put({
            type:OPEN_CONFIRM_MODAL,
            message:'일정이 추가되었습니다.'
          })
    }catch(error){
        yield put({
            type: CREATE_EVENT_FAILURE,
            error: error.response.data
        })
        yield put({
            type:OPEN_CONFIRM_MODAL,
            message:'등록에 실패했습니다. 다시 시도해주세요.'
          })
    }

}

function deleteEventAPI(id){
    return axios.delete('/schedule/'+id)
}
function* deleteEvent(action){
    try{
        yield call(deleteEventAPI, action.id)
        yield put({
            type: DELETE_EVENT_SUCCESS,
            id: action.id
        })
        yield put({
            type:OPEN_CONFIRM_MODAL,
            message:'삭제되었습니다.'
          })
    } catch(error){
        yield put({
            type: DELETE_EVENT_FAILURE,
            error: error.response.data
        })
        yield put({
            type:OPEN_CONFIRM_MODAL,
            message:'삭제에 실패했습니다. 다시 시도해주세요.'
          })
    }
}

function modifyEventAPI(data,id){
    return axios.put('/schedule/'+id, data)
}
function* modifyEvent(action){
    try{
        const result = yield call(modifyEventAPI, action.data, action.id)
        yield put({
            type: MODIFY_EVENT_SUCCESS,
            data: result.data
        })
        yield put({
            type:OPEN_CONFIRM_MODAL,
            message:'수정이 완료되었습니다.'
          })
    } catch(error){
        yield put({
            type: MODIFY_EVENT_FAILURE,
            error: error
        })
        yield put({
            type:OPEN_CONFIRM_MODAL,
            message:'수정에 실패했습니다. 다시 시도해주세요.'
          })
    }
}

function loadEventAPI(){
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

function* watchCreateEvent(){
  yield takeLatest(CREATE_EVENT_REQUEST, createEvent)
}

function* watchDeleteEvent(){
  yield takeLatest(DELETE_EVENT_REQUEST, deleteEvent)
}

function* watchModifyEvent(){
  yield takeLatest(MODIFY_EVENT_REQUEST, modifyEvent)
}

function* watchLoadEvent(){
  yield takeLatest(LOAD_EVENT_REQUEST, loadEvent)
}
export default function* challengeSaga() {
    yield all([
      fork(watchCreateEvent),
      fork(watchDeleteEvent),
      fork(watchModifyEvent),
      fork(watchLoadEvent)
    ])
  }