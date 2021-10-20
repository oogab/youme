import produce from 'immer'

const initialState = {
  myRoutines: [],
  myHabits:[],

  addRoutineLoading: false,
  addRoutineDone: false,
  addRoutineError: null,

  loadMyRoutinesLoading: false,
  loadMyRoutinesDone: false,
  loadMyRoutinesError: null,

  loadTodayRoutinesLoading: false,
  loadTodayRoutinesDone: false,
  loadTodayRoutinesError: null,

  deleteRoutineLoading: false,
  deleteRoutineDone : false,
  deleteRoutineError : null,

  modifyRoutineLoading: false,
  modifyRoutineDone : false,
  modifyRoutineError : null,

  addRoutinizedHabitLoading: false,
  addRoutinizedHabitDone: false,
  addRoutinizedHabitError: null,

  deleteRoutinizedHabitLoading: false,
  deleteRoutinizedHabitDone: false,
  deleteRoutinizedHabitError: null,

  checkRoutinizedHabitLoading: false,
  checkRoutinizedHabitDone: false,
  checkRoutinizedHabitError: null,

  checkRoutineLoading: false,
  checkRoutineDone: false,
  checkRoutineError: null,

  setOrderLoading: false,
  setOrderDone:false,
  setOrderError:null,

  choosedRoutine : -1,
  choosedRoutinizedHabit : -1,
  createRoutineInfo : {
      "id" : -1,
      "name" : '',
      "alarm" : false,
      "active_day_of_week" : [{"active" : false,"start_time": "00:00"},{"active" : false,"start_time": "00:00"},{"active" : false,"start_time": "00:00"},{"active" : false,"start_time": "00:00"},{"active" : false,"start_time": "00:00"},{"active" : false,"start_time": "00:00"},{"active" : false,"start_time": "00:00"}],
  },
}

export const ADD_ROUTINE_REQUEST = 'ADD_ROUTINE_REQUEST'
export const ADD_ROUTINE_SUCCESS = 'ADD_ROUTINE_SUCCESS'
export const ADD_ROUTINE_FAILURE = 'ADD_ROUTINE_FAILURE'

export const LOAD_MY_ROUTINES_REQUEST = 'LOAD_MY_ROUTINES_REQUEST'
export const LOAD_MY_ROUTINES_SUCCESS = 'LOAD_MY_ROUTINES_SUCCESS'
export const LOAD_MY_ROUTINES_FAILURE = 'LOAD_MY_ROUTINES_FAILURE'

export const LOAD_TODAY_ROUTINES_REQUEST = 'LOAD_TODAY_ROUTINES_REQUEST'
export const LOAD_TODAY_ROUTINES_SUCCESS = 'LOAD_TODAY_ROUTINES_SUCCESS'
export const LOAD_TODAY_ROUTINES_FAILURE = 'LOAD_TODAY_ROUTINES_FAILURE'

export const DELETE_ROUTINE_REQUEST = 'DELETE_ROUTINE_REQUEST'
export const DELETE_ROUTINE_SUCCESS = 'DELETE_ROUTINE_SUCCESS'
export const DELETE_ROUTINE_FAILURE = 'DELETE_ROUTINE_FAILURE'

export const MODIFY_ROUTINE_REQUEST = 'MODIFY_ROUTINE_REQUEST'
export const MODIFY_ROUTINE_SUCCESS = 'MODIFY_ROUTINE_SUCCESS'
export const MODIFY_ROUTINE_FAILURE = 'MODIFY_ROUTINE_FAILURE'

export const ADD_ROUTINIZED_HABIT_REQUEST = 'ADD_ROUTINIZED_HABIT_REQUEST'
export const ADD_ROUTINIZED_HABIT_SUCCESS = 'ADD_ROUTINIZED_HABIT_SUCCESS'
export const ADD_ROUTINIZED_HABIT_FAILURE = 'ADD_ROUTINIZED_HABIT_FAILURE'

export const DELETE_ROUTINIZED_HABIT_REQUEST = 'DELETE_ROUTINIZED_HABIT_REQUEST'
export const DELETE_ROUTINIZED_HABIT_SUCCESS = 'DELETE_ROUTINIZED_HABIT_SUCCESS'
export const DELETE_ROUTINIZED_HABIT_FAILURE = 'DELETE_ROUTINIZED_HABIT_FAILURE'

export const CHECK_ROUTINIZED_HABIT_REQUEST = 'CHECK_ROUTINIZED_HABIT_REQUEST'
export const CHECK_ROUTINIZED_HABIT_SUCCESS = 'CHECK_ROUTINIZED_HABIT_SUCCESS'
export const CHECK_ROUTINIZED_HABIT_FAILURE = 'CHECK_ROUTINIZED_HABIT_FAILURE'

export const CHECK_ROUTINE_REQUEST = 'CHECK_ROUTINE_REQUEST'
export const CHECK_ROUTINE_SUCCESS = 'CHECK_ROUTINE_SUCCESS'
export const CHECK_ROUTINE_FAILURE = 'CHECK_ROUTINE_FAILURE'

export const CLEAR_MY_ROUTINES = 'CLEAR_MY_ROUTINES'

export const SET_ORDER_REQUEST = 'SET_ORDER_REQUEST';
export const SET_ORDER_SUCCESS = 'SET_ORDER_SUCCESS';
export const SET_ORDER_FAILURE = 'SET_ORDER_FAILURE';

export const SET_ROUTINIZED_HABITS = 'SET_ROUTINIZED_HABITS'
export const SET_CHOOSED_ROUTINIZED_HABIT='SET_CHOOSED_ROUTINIZED_HABIT';
export const SET_CHOOSED_ROUTINE='routine/setChoosedRoutine';
export const DELETE_ROUTINE_ITEM='routine/deleteRoutineItem';
export const SET_MODAL_INPUT='routine/setModalInput';
export const SET_MODAL_INPUT_NAME='routine/setModalInputName';
export const SET_MODAL_INPUT_ALARM='routine/setModalInputAlarm';
export const SET_MODAL_INPUT_ACTIVE_DAY='routine/setModalInputActiveDay';


const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case CLEAR_MY_ROUTINES:
      draft.myRoutines = []
      break

    case ADD_ROUTINE_REQUEST:
      draft.addRoutineLoading = true
      draft.addRoutineDone = false
      draft.addRoutineError = null
      break
    case ADD_ROUTINE_SUCCESS:
      draft.addRoutineLoading = false
      draft.addRoutineDone = true
      draft.myRoutines = draft.myRoutines.concat(action.data)
      break
    case ADD_ROUTINE_FAILURE:
      draft.addRoutineLoading = false
      draft.addRoutineError = action.error
      break

    case LOAD_MY_ROUTINES_REQUEST:
      draft.loadMyRoutinesLoading = true
      draft.loadMyRoutinesDone = false
      draft.loadMyRoutinesError = null
      break
    case LOAD_MY_ROUTINES_SUCCESS:
      draft.loadMyRoutinesLoading = false
      draft.loadMyRoutinesDone = true
      draft.myRoutines = []
      for(let i=0;i<action.data.length;i++){
        action.data[i].RoutinizedHabits.sort((a,b)=>{return a.order-b.order})
        action.data[i].RoutineActiveDays.sort((a,b)=>{return a.day_of_week-b.day_of_week})
      }
      draft.myRoutines = draft.myRoutines.concat(action.data)
      draft.myRoutines.sort((a,b)=>{return a.DailyAchieveRoutines.length-b.DailyAchieveRoutines.length})
      break
    case LOAD_MY_ROUTINES_FAILURE:
      draft.loadMyRoutinesLoading = false
      draft.loadMyRoutinesError = action.error
      break

    case LOAD_TODAY_ROUTINES_REQUEST:
      draft.loadTodayRoutinesLoading = true
      draft.loadTodayRoutinesDone = false
      draft.loadTodayRoutinesError = null
      break
    case LOAD_TODAY_ROUTINES_SUCCESS:
      draft.loadTodayRoutinesLoading = false
      draft.loadTodayRoutinesDone = true
      draft.myRoutines = []
      for(let i=0;i<action.data.length;i++){
        action.data[i].RoutinizedHabits.sort((a,b)=>{return a.order-b.order})
        action.data[i].RoutineActiveDays.sort((a,b)=>{return a.day_of_week-b.day_of_week})
      }
      draft.myRoutines = draft.myRoutines.concat(action.data)
      draft.myRoutines.sort((a,b)=>{return a.DailyAchieveRoutines.length-b.DailyAchieveRoutines.length})
      break
    case LOAD_TODAY_ROUTINES_FAILURE:
      draft.loadTodayRoutinesLoading = false
      draft.loadTodayRoutinesError = action.error
      break

    case DELETE_ROUTINE_REQUEST:
      draft.deleteRoutineLoading = true
      draft.deleteRoutineDone = false
      draft.deleteRoutineError = null
      break
    case DELETE_ROUTINE_SUCCESS:
      draft.deleteRoutineLoading = false
      draft.deleteRoutineDone = true
      draft.myRoutines.splice(action.idx, 1)
      break
    case DELETE_ROUTINE_FAILURE:
      draft.deleteRoutineLoading = false
      draft.deleteRoutineError = true
      break

    case MODIFY_ROUTINE_REQUEST:
      draft.modifyRoutineLoading = true
      draft.modifyRoutineDone = false
      draft.modifyRoutineError = null
      break
    case MODIFY_ROUTINE_SUCCESS:
      draft.modifyRoutineLoading = false
      draft.modifyRoutineDone = true
      draft.myRoutines[draft.choosedRoutine] = action.data
      break
    case MODIFY_ROUTINE_FAILURE:
      draft.modifyRoutineLoading = false
      draft.modifyRoutineError = true
      break

    case ADD_ROUTINIZED_HABIT_REQUEST:
      draft.addRoutinizedHabitLoading = true
      draft.addRoutinizedHabitDone = false
      draft.addRoutinizedHabitError = null
      break
    case ADD_ROUTINIZED_HABIT_SUCCESS:
      draft.addRoutinizedHabitLoading = false
      draft.addRoutinizedHabitDone = true
      draft.myRoutines[draft.choosedRoutine].RoutinizedHabits.push(action.data)
      draft.myRoutines[draft.choosedRoutine].DailyAchieveRoutines=[]
      break
    case ADD_ROUTINIZED_HABIT_FAILURE:
      draft.addRoutinizedHabitLoading = false
      draft.addRoutinizedHabitError = action.error
      break

    case DELETE_ROUTINIZED_HABIT_REQUEST:
      draft.deleteRoutinizedHabitLoading = true
      draft.deleteRoutinizedHabitDone = false
      draft.deleteRoutinizedHabitError = null
      break
    case DELETE_ROUTINIZED_HABIT_SUCCESS:
      draft.deleteRoutinizedHabitLoading = false
      draft.deleteRoutinizedHabitDone = true
      for(let i=0;i<draft.myRoutines[action.routineIdx].RoutinizedHabits.length;i++){
        if(draft.myRoutines[action.routineIdx].RoutinizedHabits[i].id===action.id){
          draft.myRoutines[action.routineIdx].RoutinizedHabits.splice(i, 1)
          break
        }
      }
      break
    case DELETE_ROUTINIZED_HABIT_FAILURE:
      draft.deleteRoutinizedHabitLoading = false
      draft.deleteRoutinizedHabitError = action.error
      break

    case CHECK_ROUTINIZED_HABIT_REQUEST:
      draft.checkRoutinizedHabitLoading = true
      draft.checkRoutinizedHabitDone = false
      draft.checkRoutinizedHabitError = null
      break
    case CHECK_ROUTINIZED_HABIT_SUCCESS:
      draft.checkRoutinizedHabitLoading = false
      draft.checkRoutinizedHabitDone = true
      draft.myRoutines[action.routineIdx].RoutinizedHabits[action.routinizedHabitIdx].DailyAchieveHabits.push(action.data)
      break
    case CHECK_ROUTINIZED_HABIT_FAILURE:
      draft.checkRoutinizedHabitLoading = false
      draft.checkRoutinizedHabitError = action.error
      break

      case CHECK_ROUTINE_REQUEST:
        draft.checkRoutineLoading = true
        draft.checkRoutineDone = false
        draft.checkRoutineError = null
        break
      case CHECK_ROUTINE_SUCCESS:
        draft.checkRoutineLoading = false
        draft.checkRoutineDone = true
        draft.myRoutines[action.routineIdx].DailyAchieveRoutines.push(action.data)
        break
      case CHECK_ROUTINE_FAILURE:
        draft.checkRoutineLoading = false
        draft.checkRoutineError = action.error
        break

    case SET_ORDER_REQUEST:
      draft.setOrderLoading = true
      draft.setOrderDone = false
      break
    case SET_ORDER_SUCCESS:
      draft.setOrderLoading = false
      draft.setOrderDone = true
      break
    case SET_ORDER_FAILURE:
      draft.setOrderLoading = false
      draft.setOrderError = action.error
      break
    case SET_CHOOSED_ROUTINE:
      draft.choosedRoutine = action.idx
      draft.choosedRoutinizedHabit = -1
      break
    case SET_CHOOSED_ROUTINIZED_HABIT:
      draft.choosedRoutinizedHabit = action.idx
      break
    case DELETE_ROUTINE_ITEM:
      draft.myRoutines[action.routineIdx].RoutinizedHabits.splice(action.habitIdx, 1)
      break
    case SET_MODAL_INPUT:
      draft.choosedRoutine = action.idx
      if(action.idx ===-1){
        draft.createRoutineInfo={
          "id" : -1,
          "name" : '',
          "alarm" : false,
          "active_day_of_week" : [{"active" : false,"start_time": "00:00"},{"active" : false,"start_time": "00:00"},{"active" : false,"start_time": "00:00"},{"active" : false,"start_time": "00:00"},{"active" : false,"start_time": "00:00"},{"active" : false,"start_time": "00:00"},{"active" : false,"start_time": "00:00"}],  
        }
      }else{
        draft.createRoutineInfo = {
          "id" : draft.myRoutines[draft.choosedRoutine].id,
          "name" : draft.myRoutines[draft.choosedRoutine].name,
          "alarm" : draft.myRoutines[draft.choosedRoutine].alarm,
          "active_day_of_week" : draft.myRoutines[draft.choosedRoutine].RoutineActiveDays,
        }
      }
      break
    case SET_MODAL_INPUT_NAME:
      draft.createRoutineInfo.name = action.name
      break
    case SET_MODAL_INPUT_ALARM:
      draft.createRoutineInfo.alarm = action.checked
      break
    case SET_MODAL_INPUT_ACTIVE_DAY:
      draft.createRoutineInfo.active_day_of_week[action.idx] = action.activeDay
      break
    case SET_ROUTINIZED_HABITS:
      draft.myRoutines[action.num].RoutinizedHabits = action.RoutinizedHabits
      break
    default:
      break
  }
})

export default reducer