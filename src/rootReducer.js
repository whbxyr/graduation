import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import DefineWordReducer from './components/DefineWord/reducer'
import DatePickerReducer from './components/DatePicker/reducer'
import WeekPickerReducer from './components/WeekPicker/reducer'

export default combineReducers({
  routing: routerReducer,
  defineWord: DefineWordReducer(''),
  datePicker: DatePickerReducer(''),
  weekPicker: WeekPickerReducer('')
})
