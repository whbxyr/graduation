import { SET_PLAY, SET_BUTTON_X, SET_PASS_TIME, buildConstant } from './constants'
import { combineReducers } from 'redux'

const DragProgressReducer = (PREFIX) => {
  const isPlaying = (state = false, action) => {
    if (action.type === buildConstant(PREFIX, SET_PLAY)) {
      return action.isPlaying
    }
    return state
  }

  const buttonX = (state = 0, action) => {
    if (action.type === buildConstant(PREFIX, SET_BUTTON_X)) {
      return action.left
    }
    return state
  }

  const passTime = (state = 0, action) => {
    if (action.type === buildConstant(PREFIX, SET_PASS_TIME)) {
      return action.passTime
    }
    return state
  }

  return combineReducers({
    isPlaying,
    buttonX,
    passTime
  })
}

export default DragProgressReducer
