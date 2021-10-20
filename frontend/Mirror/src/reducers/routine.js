import produce from 'immer'

const initialState = {
  myRoutines: [],
  myHabits:[],

  // addRoutineLoading: false,
  // addRoutineDone: false,
  // addRoutineError: null,

  // loadMyRoutinesLoading: false,
  // loadMyRoutinesDone: false,
  // loadMyRoutinesError: null,

  loadTodayRoutinesLoading: false,
  loadTodayRoutinesDone: false,
  loadTodayRoutinesError: null,

  // deleteRoutineLoading: false,
  // deleteRoutineDone : false,
  // deleteRoutineError : null,

  // modifyRoutineLoading: false,
  // modifyRoutineDone : false,
  // modifyRoutineError : null,

  // addRoutinizedHabitLoading: false,
  // addRoutinizedHabitDone: false,
  // addRoutinizedHabitError: null,

  // deleteRoutinizedHabitLoading: false,
  // deleteRoutinizedHabitDone: false,
  // deleteRoutinizedHabitError: null,

  checkRoutinizedHabitLoading: false,
  checkRoutinizedHabitDone: false,
  checkRoutinizedHabitError: null,

  checkRoutineLoading: false,
  checkRoutineDone: false,
  checkRoutineError: null,

  // setOrderLoading: false,
  // setOrderDone:false,
  // setOrderError:null,

  choosedRoutine : -1,
  choosedRoutinizedHabit : -1,
}

export const LOAD_TODAY_ROUTINES_REQUEST = 'LOAD_TODAY_ROUTINES_REQUEST'
export const LOAD_TODAY_ROUTINES_SUCCESS = 'LOAD_TODAY_ROUTINES_SUCCESS'
export const LOAD_TODAY_ROUTINES_FAILURE = 'LOAD_TODAY_ROUTINES_FAILURE'

export const CHECK_ROUTINIZED_HABIT_REQUEST = 'CHECK_ROUTINIZED_HABIT_REQUEST'
export const CHECK_ROUTINIZED_HABIT_SUCCESS = 'CHECK_ROUTINIZED_HABIT_SUCCESS'
export const CHECK_ROUTINIZED_HABIT_FAILURE = 'CHECK_ROUTINIZED_HABIT_FAILURE'

export const CHECK_ROUTINE_REQUEST = 'CHECK_ROUTINE_REQUEST'
export const CHECK_ROUTINE_SUCCESS = 'CHECK_ROUTINE_SUCCESS'
export const CHECK_ROUTINE_FAILURE = 'CHECK_ROUTINE_FAILURE'

export const CLEAR_MY_ROUTINES = 'CLEAR_MY_ROUTINES'

export const SET_CHOOSED_ROUTINIZED_HABIT='SET_CHOOSED_ROUTINIZED_HABIT';
export const SET_CHOOSED_ROUTINE='routine/setChoosedRoutine';


const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case CLEAR_MY_ROUTINES:
      draft.myRoutines = []
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
    case SET_CHOOSED_ROUTINE:
      draft.choosedRoutine = action.idx
      draft.choosedRoutinizedHabit = -1
      break
    case SET_CHOOSED_ROUTINIZED_HABIT:
      draft.choosedRoutinizedHabit = action.idx
      break
  }
})

export default reducer