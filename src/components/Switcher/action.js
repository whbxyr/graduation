import { SET_SWITCHER_STATUS, SET_SWITCHER_RESULT, buildConstant } from './constants'

const SwitcherAction = (PREFIX) => ({
  setSwitcherStatus(status) {
    return { type: buildConstant(PREFIX, SET_SWITCHER_STATUS), status }
  },
  setSwitcherResult(result) {
    return { type: buildConstant(PREFIX, SET_SWITCHER_RESULT), result }
  }
})

export default SwitcherAction
