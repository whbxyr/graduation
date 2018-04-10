import { SET_KEYWORD, SET_RESULT, SET_TEXT, SET_RESULT_INDEX, buildConstant } from './constants'

const SearchAction = (PREFIX) => ({
  setKeyword(keyword) {
    return { type: buildConstant(PREFIX, SET_KEYWORD), keyword }
  },
  setResult(result) {
    return { type: buildConstant(PREFIX, SET_RESULT), result }
  },
  setText(text) {
    return { type: buildConstant(PREFIX, SET_TEXT), text }
  },
  setResultIndex(resultIndex) {
    return { type: buildConstant(PREFIX, SET_RESULT_INDEX), resultIndex }
  }
})

export default SearchAction
