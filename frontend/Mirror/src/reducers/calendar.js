import produce from 'immer'

const initialState = {
    events: [], // 전체 일정
    event: null, //선택한 일정 정보   
    loadEventLoading: false,
    loadEventDone: false,
    loadEventError: null,
}

export const LOAD_EVENT_REQUEST = 'LOAD_EVENT_REQUEST'
export const LOAD_EVENT_SUCCESS = 'LOAD_EVENT_SUCCESS'
export const LOAD_EVENT_FAILURE = 'LOAD_EVENT_FAILURE'


export const CLEAR_EVENT = 'CLEAR_EVENT'

const reducer = (state = initialState, action) => produce(state, (draft) => {
    switch(action.type){
        case CLEAR_EVENT:
            draft.events = []
            break

        case LOAD_EVENT_REQUEST:
            draft.loadEventLoading = true
            draft.loadEventDone = false
            draft.loadEventError = null
            break
        case LOAD_EVENT_SUCCESS:
            draft.loadEventLoading = false
            draft.loadEventDone = true
            draft.events=[]
            draft.events=draft.events.concat(action.data)
           
            break
        case LOAD_EVENT_FAILURE:
            draft.loadEventLoading = false
            draft.loadEventError = action.error
            break
            default:
                break
    }
})

export default reducer