import { SET_LIST_SHOW, SET_SELECT_RESULT, buildConstant } from './constants'

const SelectorAction = (PREFIX) => ({
  setListShow(isShow) {
    return { type: buildConstant(PREFIX, SET_LIST_SHOW), isShow }
  },
  setSelectResult(result) {
    return { type: buildConstant(PREFIX, SET_SELECT_RESULT), result }
  }
})

export default SelectorAction
