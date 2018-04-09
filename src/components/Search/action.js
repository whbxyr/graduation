import { SET_KEYWORD, SET_RESULT, SET_TEXT, buildConstant } from './constants'

const SearchAction = (PREFIX) => ({
  setKeyword(keyword) {
    return { type: buildConstant(PREFIX, SET_KEYWORD), keyword }
  },
  setResult(result) {
    return { type: buildConstant(PREFIX, SET_RESULT), result }
  },
  setText(text) {
    return { type: buildConstant(PREFIX, SET_TEXT), text }
  }
})

export default SearchAction
