import React, { Component } from 'react'
import { connect } from 'react-redux'
import UploadAction from './action'
import './index.less'

let xhr = null
@connect(
  state => ({ ...state.upload }),
  dispatch => ({
    dispatchAction: dispatch
  })
)
class Upload extends Component {
  // 通过点击以及拖拽上传文件的处理函数
  uploadHandler(e) {
    // 首先获取文件
    var file = null
    if (e.dataTransfer) {
      e.stopPropagation()
      e.preventDefault()
      file = e.dataTransfer.files[0]
    } else {
      file = e.target.files[0]
      e.target.files = null
    }
    this.refs.upload_input.value = ''
    let fileType = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase()
    if (fileType !== 'txt' && fileType !== 'csv') {
      // let toastInfos = {
      //   'status': 'no',
      //   'infos': '上传文件类型不符合要求'
      // }
      // ReactDOM.render(<PromtToast toastInfos={toastInfos} />, document.querySelector('.toast'))
      return
    }
    if (file.size / (1024 * 1024) > 10) {
      // let toastInfos = {
      //   'status': 'no',
      //   'infos': '文件大小超过限制'
      // }
      // ReactDOM.render(<PromtToast toastInfos={toastInfos} />, document.querySelector('.toast'))
      return
    }
    // 置空原有的文件信息
    this.setFile(null, '', '')
    this.setPreview(null)
    this.setProgressVisibility(true)
    this.setFile(null, file.name, Math.ceil(file.size / 1024) + 'KB')

    var uploadUrl = this.props.url
    // 判断文件类型
    var formData = new FormData()
    formData.append('file', file)

    xhr = new XMLHttpRequest()
    this.setFileXHR(xhr)
    // 开始上传的钩子
    xhr.onloadstart = (e) => {
      console.log('load start')
    }
    // 上传进度钩子
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        var percent = e.loaded * 100 / e.total
        console.log(percent / 100)
        this.setUploadPercent(percent / 100)
      }
    }
    // 终止文件上传的钩子
    xhr.onabort = (e) => {
      console.log('成功终止文件上传')
    }
    // 上传完成钩子
    xhr.onload = () => {
      console.log('success')
    }
    // 启动ajax请求
    xhr.open('post', uploadUrl, true)
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          let res = JSON.parse(xhr.responseText)
          if (res.success && res.obj && res.obj.preview) {
            // 上传完成并返回了结果时调用的函数
            this.setFile(file, file.name, Math.ceil(file.size / 1024) + 'KB')
            this.setPreview(res.obj.preview)
            if (res.obj.signFileName) {
              this.setSignFileName(res.obj.signFileName)
            }
          } else {
            // let toastInfos = {
            //   'status': 'no',
            //   'infos': '上传失败'
            // }
            // ReactDOM.render(<PromtToast toastInfos={toastInfos} />, document.querySelector('.toast'))
            this.setPreview('')
          }
          this.setSuccess(true)
        } else {
          // let toastInfos = {
          //   'status': 'no',
          //   'infos': '上传失败'
          // }
          // ReactDOM.render(<PromtToast toastInfos={toastInfos} />, document.querySelector('.toast'))
          this.setPreview('')
        }
        // 解除占用
        this.setFileXHR(null)
      }
    }
    xhr.send(formData)
  }

  // onDragOver 监听事件
  dragOverHandler(e) {
    e.stopPropagation()
    e.preventDefault()
  }

  // 让进度条显示或让上传提示显示的函数
  setProgressVisibility(visible) {
    const { PREFIX, dispatchAction } = this.props
    const oActionFact = UploadAction(PREFIX)
    dispatchAction(oActionFact.setProgressVisibility(visible))
  }

  // 获取文件的详细信息的函数
  setFile(fileData, filename, size) {
    const { PREFIX, dispatchAction } = this.props
    const oActionFact = UploadAction(PREFIX)
    dispatchAction(oActionFact.setFile(fileData, filename, size))
  }

  // 设置上传结果的函数
  setSuccess(isSuccess) {
    const { PREFIX, dispatchAction } = this.props
    const oActionFact = UploadAction(PREFIX)
    dispatchAction(oActionFact.setSuccess(isSuccess))
  }

  // 设置上传进度的函数
  setUploadPercent(percent) {
    const { PREFIX, dispatchAction } = this.props
    const oActionFact = UploadAction(PREFIX)
    dispatchAction(oActionFact.setUploadPercent(percent))
  }

  // 设置上传文件的唯一标志
  setSignFileName(name) {
    const { PREFIX, dispatchAction } = this.props
    const oActionFact = UploadAction(PREFIX)
    dispatchAction(oActionFact.setSignFileName(name))
  }

  // 设置文件上传fileXHR对象的函数
  setFileXHR(xhr) {
    const { PREFIX, dispatchAction } = this.props
    const oActionFact = UploadAction(PREFIX)
    dispatchAction(oActionFact.setFileXHR(xhr))
  }

  // 设置文件的预览文字
  setPreview(text) {
    const { PREFIX, dispatchAction } = this.props
    const oActionFact = UploadAction(PREFIX)
    dispatchAction(oActionFact.setPreview(text))
  }

  // 删除文件的函数
  removeFile() {
    const { PREFIX, dispatchAction, fileXHR } = this.props
    const oActionFact = UploadAction(PREFIX)
    if (fileXHR) {
      // 停止正在进行的文件上传，并解除占用
      fileXHR.abort()
      dispatchAction(oActionFact.setFileXHR(null))
    }
    this.setProgressVisibility(false)
    this.setUploadPercent(0)
    this.setSuccess(false)
    this.setFile(null, '', '')
    this.setSignFileName(null)
    this.setPreview('')
  }

  render() {
    const { progressVisility, file, isUploadSuccess, uploadPercent } = this.props
    return (
      <div className='upload_component ctn'>
        <div className={'target ' + (!progressVisility ? '' : 'noShow')}
          onDragOver={this.dragOverHandler}
          onDrop={(e) => this.uploadHandler(e)}>
          <input ref='upload_input' id='upload_input' type='file' onChange={(e) => this.uploadHandler(e)} />
          <label className='hover' htmlFor='upload_input'><div>拖拽或点击添加文件</div></label>
          <label className='before_hover'>
            <div className='icon' /><br />
            <div className='tip'>限TXT/CSV，不超10M</div>
          </label>
        </div>
        <div className={'progress ' + (progressVisility ? '' : 'noShow')}>
          <div className='filename toh'>{file.filename}</div>
          <div className='size'>
            {file.size}
            <i className='close' onClick={() => this.removeFile()} />
          </div>
          <div className='progress_ctn' ref='progress_ctn'>
            <div className='progress_banner' ref='progress_banner'
              style={{ 'width': 355 * uploadPercent }} />
            <i className={'progress_success ' + (isUploadSuccess ? '' : 'noShow')} />
          </div>
        </div>
      </div>
    )
  }
}

export default Upload
