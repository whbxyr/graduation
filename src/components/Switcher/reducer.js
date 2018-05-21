import { SET_SWITCHER_STATUS, SET_SWITCHER_RESULT, buildConstant } from './constants'
import { combineReducers } from 'redux'

const SwitcherReducer = (PREFIX) => {
  const switcherStatus = (state = 'off', action) => {
    if (action.type === buildConstant(PREFIX, SET_SWITCHER_STATUS)) {
      return action.status
    }
    return state
  }

  const switcherResult = (state = '', action) => {
    if (action.type === buildConstant(PREFIX, SET_SWITCHER_RESULT)) {
      return action.result
    }
    return state
  }

  return combineReducers({
    switcherStatus,
    switcherResult
  })
}

export default SwitcherReducer
