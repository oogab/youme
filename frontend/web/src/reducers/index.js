import { combineReducers } from "redux"
import { REHYDRATE } from 'redux-persist/lib/constants'; 
import user from './user'
import layout from './layout';
import modal from './modal'
import routine from './routine'
import habit from './habit'
import challenge from './challenge'
import calendar from './calendar'

// (이전상태, 액션) => 다음 상태
const rootReducer = (state, action) =>{
    switch (action.type) {
        case REHYDRATE:
          return { ...state, persistedState: action.payload };
        default: {
            const combinedReducer = combineReducers({
                user,
                layout,
                modal,
                routine,
                habit,
                challenge,
                calendar,
            });
            return combinedReducer(state, action)
        }
    }
} 

export default rootReducer