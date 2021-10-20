import { applyMiddleware, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from '@redux-saga/core'

import reducer from '../reducers'
import rootSaga from '../sagas'

const persistConfig = {
  key: 'root',
  storage
};

const loggerMiddleware = ({ dispath, getState }) => (next) => (action) => {
  return next(action)
}

const persistedReducer = persistReducer(persistConfig, reducer);
const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware, loggerMiddleware]
const enhancer = process.env.NODE_ENV === 'production'
  ? compose(applyMiddleware(sagaMiddleware))
  : composeWithDevTools(applyMiddleware(...middlewares))
const store = createStore(persistedReducer, enhancer)
export const persistor = persistStore(store)

store.sagaTask = sagaMiddleware.run(rootSaga)

export default store