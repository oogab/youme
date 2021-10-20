import produce from 'immer'

const initialState = {
    events: [], // 전체 일정
    event: null, //선택한 일정 정보
    createEventLoading: false,
    createEventDone: false,
    createEventError: null,
    deleteEventLoading: false,
    deleteEventDone: false,
    deleteEvenetError: null,
    modifyEventLoading: false,
    modifyEventDone: false,
    modifyEventError: null,
    loadEventLoading: false,
    loadEventDone: false,
    loadEventError: null,
    loadChoosedEventLoading: false,
    loadChoosedEventDone: false,
    loadChoosedEventError: null,
    tempEvents: null,
    choosedEvent : 0,
    eventInfo :{
        "id": -1,
        "title" : '',
        "backgroundColor" : '',
        "startStr": '',
        "endStr": '',
        "allDay": true,

    }
}
// const tempEvents = '';
// const tempEvents = action.data.map((v) => { title: v.title; 
//                                             start: v.start; 
//                                             end: v.end; 
//                                             allDay: v.allDay; 
//                                             color: v.color; 
//                                             id: v.id})

export const CREATE_EVENT_REQUEST = 'CREATE_EVENT_REQUEST'
export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS'
export const CREATE_EVENT_FAILURE = 'CREATE_EVENT_FAILURE'

export const DELETE_EVENT_REQUEST = 'DELETE_EVENT_REQUEST'
export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS'
export const DELETE_EVENT_FAILURE = 'DELETE_EVENT_FAILURE'

export const MODIFY_EVENT_REQUEST = 'MODIFY_EVENT_REQUEST'
export const MODIFY_EVENT_SUCCESS = 'MODIFY_EVENT_SUCCESS'
export const MODIFY_EVENT_FAILURE = 'MODIFY_EVENT_FAILURE'

export const LOAD_EVENT_REQUEST = 'LOAD_EVENT_REQUEST'
export const LOAD_EVENT_SUCCESS = 'LOAD_EVENT_SUCCESS'
export const LOAD_EVENT_FAILURE = 'LOAD_EVENT_FAILURE'

export const SET_CHOOSED_EVENT = 'SET_CHOOSED_EVENT'
export const SET_CHOOSED_EVENT_MODAL = 'SET_CHOOSED_EVENT_MODAL'
export const SET_CHOOSED_EVENT_TITLE = 'SET_CHOOSED_EVENT_TITLE'
export const SET_CHOOSED_EVENT_START = 'SET_CHOOSED_EVENT_START'
export const SET_CHOOSED_EVENT_END = 'SET_CHOOSED_EVENT_END'
export const SET_CHOOSED_EVENT_ALLDAY = 'SET_CHOOSED_EVENT_ALLDAY'
export const SET_CHOOSED_EVENT_COLOR = 'SET_CHOOSED_EVENT_COLOR'

export const CLEAR_EVENT = 'CLEAR_EVENT'

const reducer = (state = initialState, action) => produce(state, (draft) => {
    switch(action.type){
        case CLEAR_EVENT:
            draft.events = []
            break
        case CREATE_EVENT_REQUEST:
            draft.createEventLoading = true
            draft.createEventDone = false
            draft.createEventError = null
            break
        case CREATE_EVENT_SUCCESS:
            draft.createEventLoading = false
            draft.createEventDone = true
            draft.events = draft.events.concat(action.data)
            break
        case CREATE_EVENT_FAILURE:
            draft.createEventLoading = false
            draft.createEventError = action.error
            break
        case DELETE_EVENT_REQUEST:
            draft.deleteEventLoading = true
            draft.deleteEventDone = false
            draft.deleteEventError = null
            break
        case DELETE_EVENT_SUCCESS:
            draft.deleteEventLoading = false
            draft.deleteEventDone = true
            draft.events = draft.events.filter((v) => v.id != action.id)
            break
        case DELETE_EVENT_FAILURE:
            draft.deleteEventLoading = false
            draft.deleteEventError = action.error
            break
         case MODIFY_EVENT_REQUEST:
            draft.modifyEventLoading = true
            draft.modifyEventDone = false
            draft.modifyEventError = null
            break
        case MODIFY_EVENT_SUCCESS:
            draft.modifyEventLoading = false
            draft.modifyEventDone = true
            for(let i=0;i<draft.events.length;i++){
                if(draft.events[i].id === draft.choosedEvent){
                    draft.events[i] = action.data
                }
            }
            draft.events=draft.events.concat()
            break
        case MODIFY_EVENT_FAILURE:
            draft.modifyEventLoading = false
            draft.modifyEventError = action.error
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
        case SET_CHOOSED_EVENT:
            draft.choosedEvent = action.idx
            break
        case SET_CHOOSED_EVENT_MODAL:
            draft.choosedEvent = action.data.id
            draft.eventInfo=null
            draft.eventInfo={
                id: action.data.id,
                title : action.data.title,
                color : action.data.backgroundColor,
                start: action.data.startStr,
                end: action.data.endStr,
                allDay: action.data.allDay,
            }
            break
        case SET_CHOOSED_EVENT_TITLE:
            draft.eventInfo.title = action.title
            break
        case SET_CHOOSED_EVENT_START:
            draft.eventInfo.start = action.start
            break
        case SET_CHOOSED_EVENT_END:
            draft.eventInfo.end = action.end
            break
        case SET_CHOOSED_EVENT_ALLDAY:
            draft.eventInfo.allDay = action.allDay
            break
        case SET_CHOOSED_EVENT_COLOR:
            draft.eventInfo.color = action.color
            break
          default:break
    }
})

export default reducer