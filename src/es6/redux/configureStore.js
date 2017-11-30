import {createStore, applyMiddleware, bindActionCreators} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'

export default function(initialState = {}) {
  // const middleware = applyMiddleware(thunk)(createStore)
  // let store = middleware(rootReducer, initialState)
  // return store

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  )
}
