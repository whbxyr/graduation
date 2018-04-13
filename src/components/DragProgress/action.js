import { SET_PLAY, SET_BUTTON_X, buildConstant } from './constants'

const DragProgressAction = (PREFIX) => ({
  setPlay(isPlaying) {
    return { type: buildConstant(PREFIX, SET_PLAY), isPlaying }
  },
  setButtonX(left) {
    return { type: buildConstant(PREFIX, SET_BUTTON_X), left }
  }
})

export default DragProgressAction
