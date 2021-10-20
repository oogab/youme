import produce from 'immer'
import { PURGE } from 'redux-persist/es/constants'

const initialState = {
  updateMyInfoLoading: false, 
  updateMyInfoDone: false,
  updateMyInfoError: null,
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,
  logInLoading: false,
  logInDone: false,
  logInError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  me: null,             // 현재 로그인한 유저 정보
  isSignUp: false,      // 로그인 폼 <-> 회원가입 폼
}

export const UPDATE_MY_INFO_REQUEST = 'UPDATE_MY_INFO_REQUEST'
export const UPDATE_MY_INFO_SUCCESS = 'UPDATE_MY_INFO_SUCCESS'
export const UPDATE_MY_INFO_FAILURE = 'UPDATE_MY_INFO_FAILURE'

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST'
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS'
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE'

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST'
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE'

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'

export const CHANGE_SIGN_UP_MODE = 'CHANGE_SIGN_UP_MODE'

export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data
  }
}

export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST
  }
}

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case PURGE:
      return { ...initialState }
    case UPDATE_MY_INFO_REQUEST:
      draft.updateMyInfoLoading = true
      draft.updateMyInfoDone = false
      draft.updateMyInfoError = null
      break
    case UPDATE_MY_INFO_SUCCESS:
      draft.updateMyInfoLoading = false
      draft.updateMyInfoDone = true
      draft.me.age = action.data.age
      draft.me.gender = action.data.gender
      draft.me.nickname = action.data.nickname
      draft.me.phone_number = action.data.phone_number
      draft.me.post_code = action.data.post_code
      draft.me.main_address = action.data.main_address
      draft.me.sub_address = action.data.sub_address
      break
    case UPDATE_MY_INFO_FAILURE:
      draft.updateMyInfoLoading = false
      draft.updateMyInfoError = action.error
      break
    case LOAD_MY_INFO_REQUEST:
      draft.loadMyInfoLoading = true
      draft.loadMyInfoDone = false
      draft.loadMyInfoError = null
      break
    case LOAD_MY_INFO_SUCCESS:
      draft.loadMyInfoLoading = false
      draft.loadMyInfoDone = true
      draft.me = action.data
      break
    case LOAD_MY_INFO_FAILURE:
      draft.loadMyInfoLoading = false
      draft.loadMyInfoError = action.error
      break
    case LOG_IN_REQUEST:
      draft.logInLoading = true
      draft.logInDone = false
      draft.logInError = null
      break
    case LOG_IN_SUCCESS:
      draft.logInLoading = false
      draft.logInDone = true
      draft.me = action.data
      break
    case LOG_IN_FAILURE:
      draft.logInLoading = false
      draft.logInError = action.error
      break
    case LOG_OUT_REQUEST:
      draft.logOutLoading = true
      draft.logOutDone = false
      draft.logOutError = null
      break
    case LOG_OUT_SUCCESS:
      draft.logOutLoading = false
      draft.logOutDone = true
      draft.me = null
      // storage.removeItem('persist:root')
      break
    case LOG_OUT_FAILURE:
      draft.logOutLoading = false
      draft.logOutError = action.error
      break
    case SIGN_UP_REQUEST:
      draft.signUpLoading = true
      draft.signUpDone = false
      draft.signUpError = null
      break
    case SIGN_UP_SUCCESS:
      draft.signUpLoading = false
      draft.signUpDone = true
      break
    case SIGN_UP_FAILURE:
      draft.signUpLoading = false
      draft.signUpError = action.error
      break
    case CHANGE_SIGN_UP_MODE:
      draft.isSignUp = !draft.isSignUp
      break
      default:break
  }
})

export default reducer