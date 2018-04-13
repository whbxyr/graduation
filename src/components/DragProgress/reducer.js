import { SET_PLAY, SET_BUTTON_X, buildConstant } from './constants'
import { combineReducers } from 'redux'

const DragProgressReducer = (PREFIX) => {
  const isPlaying = (state = false, action) => {
    if (action.type === buildConstant(PREFIX, SET_PLAY)) {
      return action.isPlaying
    }
    return state
  }

  const buttonX = (state = -13, action) => {
    if (action.type === buildConstant(PREFIX, SET_BUTTON_X)) {
      return action.left
    }
    return state
  }

  return combineReducers({
    isPlaying,
    buttonX
  })
}

export default DragProgressReducer
