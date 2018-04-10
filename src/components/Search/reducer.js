import { SET_KEYWORD, SET_RESULT, SET_TEXT, SET_RESULT_INDEX, buildConstant } from './constants'
import { combineReducers } from 'redux'

const SearchReducer = (PREFIX) => {
  const keyword = (state = '', action) => {
    if (action.type === buildConstant(PREFIX, SET_KEYWORD)) {
      return action.keyword
    }
    return state
  }

  const result = (state = null, action) => {
    if (action.type === buildConstant(PREFIX, SET_RESULT)) {
      return action.result
    }
    return state
  }

  const text = (state = '搜索结果', action) => {
    if (action.type === buildConstant(PREFIX, SET_TEXT)) {
      return action.text
    }
    return state
  }

  const resultIndex = (state = -1, action) => {
    if (action.type === buildConstant(PREFIX, SET_RESULT_INDEX)) {
      return action.resultIndex
    }
    return state
  }

  return combineReducers({
    keyword,
    result,
    text,
    resultIndex
  })
}

export default SearchReducer
