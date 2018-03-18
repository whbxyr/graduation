import { createStore as _createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import rootReducer from '../rootReducer'

// 参数为 history 以及预置的store
export default function createStore(history, data) {
  const reduxRouterMiddleware = routerMiddleware(history)

  const middleware = [reduxRouterMiddleware, thunk]

  const finalCreateStore = applyMiddleware(...middleware)(_createStore)

  const store = finalCreateStore(rootReducer, data, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

  return store
}
