import produce from 'immer'
import { PURGE } from 'redux-persist/es/constants'

const initialState = {
  myHabits: [],

  loadMyHabitsLoading: false,
  loadMyHabitsDone: false,
  loadMyHabitsError: null,

  addMyHabitLoading: false,
  addMyHabitDone: false,
  addMyHabitError: null,

  addJustHabitLoading: false,
  addJustHabitDone: false,
  addJustHabitError: null,

  modifyMyHabitLoading: false,
  modifyMyHabitDone: false,
  modifyMyHabitError: null,

  deleteMyHabitLoading: false,
  deleteMyHabitDone: false,
  deleteMyHabitError: null,

  choosedHabit: 0,
  habitInfo:{
    id: -1,
    content: "",
    name: "",
    time_required: 1,
    assist_link:"",
  }
}

export const LOAD_MY_HABITS_REQUEST = 'LOAD_MY_HABITS_REQUEST'
export const LOAD_MY_HABITS_SUCCESS = 'LOAD_MY_HABITS_SUCCESS'
export const LOAD_MY_HABITS_FAILURE = 'LOAD_MY_HABITS_FAILURE'

export const ADD_MY_HABIT_REQUEST = 'ADD_MY_HABIT_REQUEST'
export const ADD_MY_HABIT_SUCCESS = 'ADD_MY_HABIT_SUCCESS'
export const ADD_MY_HABIT_FAILURE = 'ADD_MY_HABIT_FAILURE'

export const ADD_JUST_HABIT_REQUEST = 'ADD_JUST_HABIT_REQUEST'
export const ADD_JUST_HABIT_SUCCESS = 'ADD_JUST_HABIT_SUCCESS'
export const ADD_JUST_HABIT_FAILURE = 'ADD_JUST_HABIT_FAILURE'

export const MODIFY_MY_HABIT_REQUEST = 'MODIFY_MY_HABIT_REQUEST'
export const MODIFY_MY_HABIT_SUCCESS = 'MODIFY_MY_HABIT_SUCCESS'
export const MODIFY_MY_HABIT_FAILURE = 'MODIFY_MY_HABIT_FAILURE'

export const DELETE_MY_HABIT_REQUEST = 'DELETE_MY_HABIT_REQUEST'
export const DELETE_MY_HABIT_SUCCESS = 'DELETE_MY_HABIT_SUCCESS'
export const DELETE_MY_HABIT_FAILURE = 'DELETE_MY_HABIT_FAILURE'

export const SET_CHOOSED_HABIT = 'SET_CHOOSED_HABIT'
export const SET_MODIFY_HABIT_MODAL = 'SET_MODIFY_HABIT_MODAL'
export const SET_MODIFY_HABIT_NAME = 'SET_MODIFY_HABIT_NAME'
export const SET_MODIFY_HABIT_CONTENT = 'SET_MODIFY_HABIT_CONTENT'
export const SET_MODIFY_HABIT_TIME_REQUIRED ='SET_MODIFY_HABIT_TIME_REQUIRED'
export const SET_MODIFY_HABIT_ASSIST_LINK ='SET_MODIFY_HABIT_ASSIST_LINK'

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case PURGE:
      return { ...initialState }
    case ADD_MY_HABIT_REQUEST:
      draft.addMyHabitLoading = true
      draft.addMyHabitDone = false
      draft.addMyHabitError = null
      break
    case ADD_MY_HABIT_SUCCESS:
      draft.addMyHabitLoading = false
      draft.addMyHabitDone = true
      draft.myHabits = draft.myHabits.concat(action.data)
      break
    case ADD_MY_HABIT_FAILURE:
      draft.addMyHabitLoading = false
      draft.addMyHabitError = action.error
      break

    case ADD_JUST_HABIT_REQUEST:
      draft.addJustHabitLoading = true
      draft.addJustHabitDone = false
      draft.addJustHabitError = null
      break
    case ADD_JUST_HABIT_SUCCESS:
      draft.addJustHabitLoading = false
      draft.addJustHabitDone = true
      draft.myHabits = draft.myHabits.concat(action.data)
      break
    case ADD_JUST_HABIT_FAILURE:
      draft.addJustHabitLoading = false
      draft.addJustHabitError = action.error
      break

    case LOAD_MY_HABITS_REQUEST:
      draft.loadMyHabitsLoading = true
      draft.loadMyHabitsDone = false
      draft.loadMyHabitsError = null
      break
    case LOAD_MY_HABITS_SUCCESS:
      draft.loadMyHabitsLoading = false
      draft.loadMyHabitsDone = true
      draft.myHabits = []
      draft.myHabits = draft.myHabits.concat(action.data)
      break
    case LOAD_MY_HABITS_FAILURE:
      draft.loadMyHabitsLoading = false
      draft.loadMyHabitsError = action.error
      break

    case MODIFY_MY_HABIT_REQUEST:
      draft.modifyMyHabitLoading = true
      draft.modifyMyHabitDone = false
      draft.modifyMyHabitError = null
      break
    case MODIFY_MY_HABIT_SUCCESS:
      draft.modifyMyHabitLoading = false
      draft.modifyMyHabitDone = true
      draft.myHabits[draft.choosedHabit] = action.data
      break
    case MODIFY_MY_HABIT_FAILURE:
      draft.modifyMyHabitLoading = false
      draft.modifyMyHabitError = action.error
      break

    case DELETE_MY_HABIT_REQUEST:
      draft.deleteMyHabitLoading = true
      draft.deleteMyHabitDone = false
      draft.deleteMyHabitError = null
      break
    case DELETE_MY_HABIT_SUCCESS:
      draft.deleteMyHabitLoading = false
      draft.deleteMyHabitDone = true
      draft.myHabits.splice(action.idx, 1)
      break
    case DELETE_MY_HABIT_FAILURE:
      draft.deleteMyHabitLoading = false
      draft.deleteMyHabitError = action.error
      break
    
    case SET_CHOOSED_HABIT:
      draft.choosedHabit = action.idx
      break
    case SET_MODIFY_HABIT_MODAL:
      draft.choosedHabit = action.idx
      if(draft.myHabits[action.idx]){
        draft.habitInfo = Object.assign(draft.myHabits[action.idx], {})
      }else{
        draft.habitInfo = {
          id: -1,
          content: "",
          name: "",
          time_required: 1,
          assist_link:"",
        }
      }
      
      break
    case SET_MODIFY_HABIT_NAME:
      draft.habitInfo.name= action.name
      break
    case SET_MODIFY_HABIT_CONTENT:
      draft.habitInfo.content= action.content
      break
    case SET_MODIFY_HABIT_TIME_REQUIRED:
      draft.habitInfo.time_required = action.time_required
      break
    case SET_MODIFY_HABIT_ASSIST_LINK:
      draft.habitInfo.assist_link = action.assist_link
      break
    default:break
  }
})

export default reducer