import produce from 'immer'

const initialState = {
    openKeyboard: false,
    keyInfo: {}
}

export const OPEN_KEY_BOARD = 'OPEN_KEY_BOARD'
export const CLOSE_KEY_BOARD = 'CLOSE_KEY_BOARD'
export const TOGGLE_KEY_BOARD = 'TOGGLE_KEY_BOARD'

export const SET_KEY_INFO = 'SET_KEY_INFO'

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch(action.type) {
    case OPEN_KEY_BOARD:
      draft.openKeyboard = true
      break
    case TOGGLE_KEY_BOARD:
      draft.openKeyboard = !draft.openKeyboard
      break
    case CLOSE_KEY_BOARD:
      draft.openKeyboard = false
      break
    case SET_KEY_INFO:
      draft.keyInfo = action.data
      draft.keyInfo=false
      break
      default:break
  }
})

export default reducer