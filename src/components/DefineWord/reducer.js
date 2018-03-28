import { combineReducers } from 'redux'
import { SET_DEFINE_WORD, buildConstant } from './constants'

const DefineWordReducer = (PREFIX) => {
  const defineWord = (state = '', action) => {
    if (action.type === buildConstant(PREFIX, SET_DEFINE_WORD)) {
      return action.define_word
    }
    return state
  }

  return combineReducers({
    defineWord
  })
}

export default DefineWordReducer
