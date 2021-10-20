import { all, fork, put, takeLatest, call, select } from "redux-saga/effects";
import axios from 'axios'
import {
  ADD_ROUTINE_REQUEST,
  ADD_ROUTINE_SUCCESS,
  ADD_ROUTINE_FAILURE,

  LOAD_MY_ROUTINES_REQUEST,
  LOAD_MY_ROUTINES_SUCCESS,
  LOAD_MY_ROUTINES_FAILURE,

  LOAD_TODAY_ROUTINES_REQUEST,
  LOAD_TODAY_ROUTINES_SUCCESS,
  LOAD_TODAY_ROUTINES_FAILURE,

  DELETE_ROUTINE_REQUEST,
  DELETE_ROUTINE_SUCCESS,
  DELETE_ROUTINE_FAILURE,
  
  MODIFY_ROUTINE_REQUEST,
  MODIFY_ROUTINE_SUCCESS,
  MODIFY_ROUTINE_FAILURE,

  ADD_ROUTINIZED_HABIT_REQUEST,
  ADD_ROUTINIZED_HABIT_SUCCESS,
  ADD_ROUTINIZED_HABIT_FAILURE,

  DELETE_ROUTINIZED_HABIT_REQUEST,
  DELETE_ROUTINIZED_HABIT_SUCCESS,
  DELETE_ROUTINIZED_HABIT_FAILURE,

  CHECK_ROUTINIZED_HABIT_REQUEST,
  CHECK_ROUTINIZED_HABIT_SUCCESS,
  CHECK_ROUTINIZED_HABIT_FAILURE,

  CHECK_ROUTINE_REQUEST,
  CHECK_ROUTINE_SUCCESS,
  CHECK_ROUTINE_FAILURE,

  SET_ORDER_REQUEST,
  SET_ORDER_SUCCESS,
  SET_ORDER_FAILURE,
} from '../reducers/routine'
import {
  OPEN_CONFIRM_MODAL
} from '../reducers/modal'

const myRoutines = state => {
  return state.routine.myRoutines;
}
function addRoutineAPI(data) {
  return axios.post('/routine', data)
}

function* addRoutine(action) {
  try {
    const result = yield call(addRoutineAPI, action.data)
    yield put({
      type: ADD_ROUTINE_SUCCESS,
      data: result.data
    })
    const routine = yield select(myRoutines)
    yield put({
      type:CHECK_ROUTINE_REQUEST,
      routineIdx: routine[routine.length-1],
      routineId: routine[routine.length-1].id})
    yield put({
      type:OPEN_CONFIRM_MODAL,
      message:'루틴 등록이 완료되었습니다.'
    })
  } catch (error) {
    yield put({
      type: ADD_ROUTINE_FAILURE,
      error: error.response.data
    })
    yield put({
      type:OPEN_CONFIRM_MODAL,
      message:'루틴 등록에 실패했습니다. 다시 시도해주세요.'
    })
  }
}

function loadRoutinesAPI() {
  return axios.get('/routine')
}

function* loadRoutines() {
  try {
    const result = yield call(loadRoutinesAPI)
    yield put({
      type: LOAD_MY_ROUTINES_SUCCESS,
      data: result.data
    })
  } catch (error) {
    yield put({
      type: LOAD_MY_ROUTINES_FAILURE,
      error: error.response.data
    })
  }
}

function loadTodayRoutinesAPI(){
  return axios.get('/routine/today')
}

function* loadTodayRoutines() {
  try {
    const result = yield call(loadTodayRoutinesAPI)
    yield put({
      type: LOAD_TODAY_ROUTINES_SUCCESS,
      data: result.data
    })
  } catch (error) {
    yield put({
      type: LOAD_TODAY_ROUTINES_FAILURE,
      error: error.response.data
    })
  }
}

function deleteRoutineAPI(id){
  return axios.delete('/routine/'+id)
}
function* deleteRoutine(action){
  try{
    yield call(deleteRoutineAPI, action.id)
    yield put({
      type: DELETE_ROUTINE_SUCCESS,
      idx: action.idx
    })
    yield put({
      type:OPEN_CONFIRM_MODAL,
      message:'루틴 삭제가 완료되었습니다.'
    })
  }catch(error){
    yield put({
      type: DELETE_ROUTINE_FAILURE,
      error: error.response.data
    })
    yield put({
      type:OPEN_CONFIRM_MODAL,
      message:'루틴 삭제에 실패했습니다. 다시 시도해주세요.'
    })
  }
}

function modifyRoutineAPI(data, id){
  return axios.put('/routine/'+id, data)
}
function* modifyRoutine(action){
  try{
    const result = yield call(modifyRoutineAPI, action.data, action.id)
    yield put({
      type: MODIFY_ROUTINE_SUCCESS,
      data: result.data
    })
    yield put({
      type:OPEN_CONFIRM_MODAL,
      message:'루틴 수정이 완료되었습니다.'
    })
  }catch(error){
    yield put({
      type: MODIFY_ROUTINE_FAILURE,
      error: error.response.data
    })
    yield put({
      type:OPEN_CONFIRM_MODAL,
      message:'루틴 수정에 실패했습니다. 다시 시도해주세요.'
    })
  }
}

function addRoutinizedHabitAPI(data, id) {
  return axios.post('/routinizedHabit/'+id, data)
}

function* addRoutinizedHabit(action) {
  try {
    const result = yield call(addRoutinizedHabitAPI, action.data, action.id)
    yield put({
      type: ADD_ROUTINIZED_HABIT_SUCCESS,
      data: result.data,
      name : action.name
    })
    yield put({
      type:OPEN_CONFIRM_MODAL,
      message:'루틴에 습관이 등록되었습니다.'
    })
  } catch (error) {
    yield put({
      type: ADD_ROUTINIZED_HABIT_FAILURE,
      error: error.response.data
    })
    yield put({
      type:OPEN_CONFIRM_MODAL,
      message:'루틴에 습관이 등록되지 않았습니다. 다시 시도해주세요.'
    })
  }
}

function deleteRoutinizedHabitAPI(id){
  return axios.delete('/routinizedHabit/'+id)
}
function* deleteRoutinizedHabit(action){
  try {
    yield call(deleteRoutinizedHabitAPI, action.id)
    yield put({
      type: DELETE_ROUTINIZED_HABIT_SUCCESS,
      routineIdx: action.routineIdx , 
      id: action.id
    })
    let routine = yield select(myRoutines)
    yield put({
      type: SET_ORDER_REQUEST,
      habits: routine[action.routineIdx].RoutinizedHabits,
      idx: action.routineIdx,
      message: true
    })

    if(routine[action.routineIdx].DailyAchieveRoutines.length>0) return
    let isComplete = true
    for(let item of routine[action.routineIdx].RoutinizedHabits){
      if(item.DailyAchieveHabits.length===0){
        isComplete = false
      }
    }
    if(isComplete){
      yield put({
        type:CHECK_ROUTINE_REQUEST,
        routineIdx: action.routineIdx,
        routineId: routine[action.routineIdx].id})
    }
  } catch (error) {
    yield put({
      type: DELETE_ROUTINIZED_HABIT_FAILURE,
    })
    yield put({
      type:OPEN_CONFIRM_MODAL,
      message:'습관이 정상적으로 삭제되지 않았습니다. 다시 시도해주세요.'
    })
  }
}

function checkRoutinizedHabitAPI(routineId, habitId){
  return axios.post('/routinizedHabit/', {routineId, habitId})
}

function* checkRoutinizedHabit(action){
  try{
    const result = yield call(checkRoutinizedHabitAPI, action.routineId, action.habitId)
    yield put({
      type: CHECK_ROUTINIZED_HABIT_SUCCESS,
      data: result.data,
      routineIdx: action.routineIdx,
      routinizedHabitIdx: action.routinizedHabitIdx
    })
    yield put({
      type:OPEN_CONFIRM_MODAL,
      message:'루틴 내 습관이 완료되었습니다.'
    })

    const routine = yield select(myRoutines)
    if(routine[action.routineIdx].DailyAchieveRoutines.length) return //이미 완료된 루틴이라면 종료

    const habits = routine[action.routineIdx].RoutinizedHabits

    for(let item of habits){
      if(!item.DailyAchieveHabits.length){
        return //완료되지 않은 습관이 있다면 종료
      }
    }

    yield put({
      type: CHECK_ROUTINE_REQUEST,
      routineIdx: action.routineIdx,
      routineId: action.routineId,
    })

  }catch(error){
    yield put({
      type: CHECK_ROUTINIZED_HABIT_FAILURE,
      error
    })
    yield put({
      type:OPEN_CONFIRM_MODAL,
      message:'체크가 정상적으로 실행되지 않았습니다. 다시 시도해주세요.'
    })
  }
}

function setOrderAPI(habits, routineId){
  return axios.put('/routinizedHabit/order', {habits})
}

function* setOrder(action){
  try{
    const result = yield call(setOrderAPI,action.habits, action.routineId)
    yield put({
      type: SET_ORDER_SUCCESS,
      data: result.data,
      idx : action.idx
    })
    yield put({
      type:OPEN_CONFIRM_MODAL,
      message:action.message?'루틴 내 습관이 정상적으로 삭제되었습니다.':'순서 변경이 완료되었습니다.'
    })
    yield put({
      type: LOAD_MY_ROUTINES_REQUEST
    })
  }catch(error){
    yield put({
      type: SET_ORDER_FAILURE,
      error: error
    })
    yield put({
      type:OPEN_CONFIRM_MODAL,
      message:'순서 변경에 실패했습니다. 다시 시도해주세요.'
    })
  }

}

function checkDailyAchieveRoutineAPI(routineId){
  return axios.post('/routine/complete',{routineId})
}
function* checkDailyAchieveRoutine(action){
  try{
    yield call(checkDailyAchieveRoutineAPI, action.routineId)
    yield put({
      type: CHECK_ROUTINE_SUCCESS,
      routineIdx: action.routineIdx,
    })
  }catch(error){
    yield put({
      type: CHECK_ROUTINE_FAILURE,
      error
    })
  }
}


function* watchAddRoutine() {
  yield takeLatest(ADD_ROUTINE_REQUEST, addRoutine)
}

function* watchLoadRoutines() {
  yield takeLatest(LOAD_MY_ROUTINES_REQUEST, loadRoutines)
}

function* watchLoadTodayRoutines(){
  yield takeLatest(LOAD_TODAY_ROUTINES_REQUEST, loadTodayRoutines)
}

function* watchDeleteRoutine(){
  yield takeLatest(DELETE_ROUTINE_REQUEST, deleteRoutine)
}

function* watchModifyRoutine(){
  yield takeLatest(MODIFY_ROUTINE_REQUEST, modifyRoutine)
}
function* watchAddRoutinizedHabit() {
  yield takeLatest(ADD_ROUTINIZED_HABIT_REQUEST, addRoutinizedHabit)
}

function* watchDeleteRoutinizedHabit(){
  yield takeLatest(DELETE_ROUTINIZED_HABIT_REQUEST, deleteRoutinizedHabit)
}

function* watchCheckRoutinizedHabit(){
  yield takeLatest(CHECK_ROUTINIZED_HABIT_REQUEST, checkRoutinizedHabit)
}

function* watchCheckRoutine(){
  yield takeLatest(CHECK_ROUTINE_REQUEST, checkDailyAchieveRoutine)
}

function* watchSetOrder(){
  yield takeLatest(SET_ORDER_REQUEST, setOrder)
}


export default function* routineSaga() {
  yield all([
    fork(watchAddRoutine),
    fork(watchLoadRoutines),
    fork(watchLoadTodayRoutines),
    fork(watchDeleteRoutine),
    fork(watchModifyRoutine),
    fork(watchAddRoutinizedHabit),
    fork(watchDeleteRoutinizedHabit),
    fork(watchCheckRoutinizedHabit),
    fork(watchCheckRoutine),
    fork(watchSetOrder)
  ])
}