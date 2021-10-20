// import { HYDRATE } from "next-redux-wrapper"
import { combineReducers } from "redux"
import calendar from './calendar'
import modal from './modal'
import user from './user'
import weather from './weather'
import routine from './routine'
import challenge from './challenge'
import keyboard from './keyboard'
// (이전상태, 액션) => 다음 상태
const rootReducer = (state, action) =>{
    switch (action.type) {
        default: {
            const combinedReducer = combineReducers({
                calendar,
                modal,
                user,
                weather,
                routine,
                challenge,
                keyboard
            });
            return combinedReducer(state, action)
        }
    }
} 

export default rootReducer