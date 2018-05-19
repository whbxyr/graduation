import { SET_LIST_SHOW, SET_SELECT_RESULT, buildConstant } from './constants'
import { combineReducers } from 'redux'

const SelectorReducer = (PREFIX) => {
  const isListShow = (state = false, action) => {
    if (action.type === buildConstant(PREFIX, SET_LIST_SHOW)) {
      return action.isShow
    }
    return state
  }

  const selectResult = (state = [], action) => {
    if (action.type === buildConstant(PREFIX, SET_SELECT_RESULT)) {
      return action.result
    }
    return state
  }

  return combineReducers({
    isListShow,
    selectResult
  })
}

export default SelectorReducer
