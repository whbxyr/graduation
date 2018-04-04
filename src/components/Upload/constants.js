export const SET_PROGRESS_VISIBILITY = 'set_progress_visibility'
export const SET_FILE = 'set_file'
export const SET_SUCCESS = 'set_success'
// 设置xhr对象，以便随时abort
export const SET_FILE_XHR = 'set_file_xhr'
// 设置上传进度
export const SET_UPLOAD_PERCENT = 'set_upload_percent'
/* 上传文件唯一标志 */
export const SET_SIGNFILENAME = 'set_signfilename'
// 设置预览文字
export const SET_PREVIEW = 'set_preview'

export const buildConstant = (PREFIX, CONST) => PREFIX + '/' + CONST