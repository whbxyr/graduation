/**
 * Upload react-redux 版组件 action creator
 * @author xuyuanrui
 * @date 17-12-21
 */
import { SET_PROGRESS_VISIBILITY, SET_FILE, SET_SUCCESS, SET_SIGNFILENAME,
  SET_FILE_XHR, SET_UPLOAD_PERCENT, SET_PREVIEW, buildConstant } from './constants'

const UploadAction = (PREFIX) => ({

  // 控制进度条以及上传提示的显示情况
  setProgressVisibility: (visible) => ({
    type: buildConstant(PREFIX, SET_PROGRESS_VISIBILITY),
    visible: visible
  }),

  // 设置上传的文件信息
  setFile: (fileData, filename, size) => ({
    type: buildConstant(PREFIX, SET_FILE),
    fileData: fileData,
    filename: filename,
    size: size
  }),

  // 设置上传是否成功的标志
  setSuccess: (isSuccess) => ({
    type: buildConstant(PREFIX, SET_SUCCESS),
    isSuccess: isSuccess
  }),

  // 设置xhr上传对象
  setFileXHR: (xhr) => ({
    type: buildConstant(PREFIX, SET_FILE_XHR),
    xhr: xhr
  }),

  // 设置上传进度
  setUploadPercent: (percent) => ({
    type: buildConstant(PREFIX, SET_UPLOAD_PERCENT),
    percent: percent
  }),

  // 设置上传文件唯一标志
  setSignFileName: (name) => ({
    type: buildConstant(PREFIX, SET_SIGNFILENAME),
    name: name
  }),

  // 设置文件的预览文字
  setPreview: (text) => ({
    type: buildConstant(PREFIX, SET_PREVIEW),
    text: text
  })

})

export default UploadAction