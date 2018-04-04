/**
 * Upload react-redux 版组件reducer
 * @author xuyuanrui
 * @date 17-12-21
 */
import { combineReducers } from 'redux'
import { SET_PROGRESS_VISIBILITY, SET_FILE, SET_SUCCESS, SET_SIGNFILENAME,
  SET_FILE_XHR, SET_UPLOAD_PERCENT, SET_PREVIEW, buildConstant } from './constants'

const UploadReducer = (PREFIX) => {
  // 设置进度条是否显示
  const progressVisility = (state = false, action) => {
    if (action.type === buildConstant(PREFIX, SET_PROGRESS_VISIBILITY)) {
      state = action.visible
    }
    return state
  }
  // 上传文件信息
  const file = (state = { fileData: null, filename: '', size: '' }, action) => {
    if (action.type === buildConstant(PREFIX, SET_FILE)) {
      state = {
        fileData: action.fileData,
        filename: action.filename,
        size: action.size
      }
    }
    return state
  }
  // 上传是否成功的标志
  const isUploadSuccess = (state = false, action) => {
    if (action.type === buildConstant(PREFIX, SET_SUCCESS)) {
      return action.isSuccess
    }
    return state
  }
  // 文件上传的异步xhr对象
  const fileXHR = (state = null, action) => {
    if (action.type === buildConstant(PREFIX, SET_FILE_XHR)) {
      return action.xhr
    }
    return state
  }
  // 文件上传进度
  const uploadPercent = (state = 0, action) => {
    if (action.type === buildConstant(PREFIX, SET_UPLOAD_PERCENT)) {
      return action.percent
    }
    return state
  }

  // 设置上传文件唯一标志
  const signFileName = (state = null, action) => {
    if (action.type === buildConstant(PREFIX, SET_SIGNFILENAME)) {
      return action.name
    }
    return state
  }

  // 设置文件的预览文字
  const preview = (state = '', action) => {
    if (action.type === buildConstant(PREFIX, SET_PREVIEW)) {
      return action.text
    }
    return state
  }

  return combineReducers({
    progressVisility,
    file,
    isUploadSuccess,
    fileXHR,
    uploadPercent,
    signFileName,
    preview
  })
}

export default UploadReducer