import produce  from 'immer'

const initialState = {
  routineModal: false,
  createRoutineModal: false,
  modifyHabitModal: false,
  alertModal : false,
  confirmModal : false,
  alertModalMessage : '',
  createEventModal: false,
  modifyEventModal: false,
  addressModal: false,

  addressInfo:{},
  alertModalFunction : ()=>{}
}



export const OPEN_ALERT_MODAL = 'OPEN_ALERT_MODAL'
export const CLOSE_ALERT_MODAL = 'CLOSE_ALERT_MODAL'
export const TOGGLE_ALERT_MODAL = 'TOGGLE_ALERT_MODAL'

export const OPEN_CONFIRM_MODAL = 'OPEN_CONFIRM_MODAL'
export const CLOSE_CONFIRM_MODAL = 'CLOSE_CONFIRM_MODAL'
export const TOGGLE_CONFIRM_MODAL = 'TOGGLE_CONFIRM_MODAL'

export const SET_ALERT_MODAL_FUNCTION = 'SET_ALERT_MODAL_FUNCTION'
export const SET_ALERT_MODAL_MESSAGE = 'SET_ALERT_MODAL_MESSAGE'



const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch(action.type) {
    case OPEN_ALERT_MODAL:
      draft.alertModal = true
      draft.alertModalMessage = action.message
      break
    case TOGGLE_ALERT_MODAL:
      draft.alertModal = !draft.alertModal
      break
    case CLOSE_ALERT_MODAL:
      draft.alertModal = false
      draft.alertModalMessage = ''
      break

    case OPEN_CONFIRM_MODAL:
      draft.confirmModal = true
      draft.alertModalMessage = action.message
      break
    case TOGGLE_CONFIRM_MODAL:
      draft.confirmModal = !draft.confirmModal
      break
    case CLOSE_CONFIRM_MODAL:
      draft.confirmModal = false
      draft.alertModalMessage = ''
      break
    case SET_ALERT_MODAL_FUNCTION:
      draft.alertModalFunction = action.alertModalFunction
      break
    case SET_ALERT_MODAL_MESSAGE:
      draft.alertModalMessage = action.message
      break
  }
})

export default reducer