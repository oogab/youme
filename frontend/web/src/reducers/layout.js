import produce from 'immer'

export const TOGGLE_DRAWER = 'TOGGLE_DRAWER'
export const CLOSE_DRAWER = 'CLOSE_DRAWER'

const initialState = {
  drawerOpen: false
}

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      draft.drawerOpen = !draft.drawerOpen
      break
    case CLOSE_DRAWER:
      draft.drawerOpen = false
      break
    default:
      break
  }
})

export default reducer