import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import DefineWordReducer from './components/DefineWord/reducer'
import DatePickerReducer from './components/DatePicker/reducer'
import WeekPickerReducer from './components/WeekPicker/reducer'
import UploadReducer from './components/Upload/reducer'
import SearchReducer from './components/Search/reducer'
import DragProgressReducer from './components/DragProgress/reducer'
import SelectorReducer from './components/Selector/reducer'
import SwitcherReducer from './components/Switcher/reducer'

export default combineReducers({
  routing: routerReducer,
  defineWord: DefineWordReducer(''),
  datePicker: DatePickerReducer(''),
  weekPicker: WeekPickerReducer(''),
  upload: UploadReducer(''),
  search: SearchReducer(''),
  dragProgress: DragProgressReducer(''),
  selector: SelectorReducer(''),
  switcher: SwitcherReducer('')
})
