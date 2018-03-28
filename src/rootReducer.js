import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import DefineWordReducer from './components/DefineWord/reducer'

export default combineReducers({
  routing: routerReducer,
  defineWord: DefineWordReducer('')
})
