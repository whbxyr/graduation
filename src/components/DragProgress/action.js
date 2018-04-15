import { SET_PLAY, SET_BUTTON_X, SET_PASS_TIME, buildConstant } from './constants'

const DragProgressAction = (PREFIX) => ({
  setPlay(isPlaying) {
    return { type: buildConstant(PREFIX, SET_PLAY), isPlaying }
  },
  setButtonX(left) {
    return { type: buildConstant(PREFIX, SET_BUTTON_X), left }
  },
  setPassTime(passTime) {
    return { type: buildConstant(PREFIX, SET_PASS_TIME), passTime }
  }
})

export default DragProgressAction
