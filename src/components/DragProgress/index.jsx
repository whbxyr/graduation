import React, { Component } from 'react'
import { connect } from 'react-redux'
import DragProgressAction from './action'
import './index.less'

// 按钮是否被按下的标记
let isMouseDown = false
// 是否正属于拖拽期间的标记
let isMouseMove = false
// 按钮被按下时水平方向的距离
let LocationX = null
let timer = null

@connect(
  state => ({ ...state.dragProgress }),
  dispatch => ({
    dispatchAction: dispatch
  })
)
class DragProgress extends Component {
  componentDidMount() {
    // 监视鼠标的滑动距离以滑动按钮
    document.onmouseup = (e) => this.mouseUpButton(e)
    document.onmousemove = (e) => this.dragButton(e)
  }

  clickButton() {
    let { isPlaying, stepTime, totalTime, callback } = this.props
    let progressWidth = this.refs.drag_progress_component.clientWidth
    this.doDispatch('setPlay', !isPlaying)
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    // 计算按钮的滑动步进值
    var step = progressWidth / (totalTime / stepTime)
    if (!isPlaying) {
      let { buttonX } = this.props
      // 如果按下按钮时恰好进度条本来就已经到底的
      if (buttonX === progressWidth) {
        // 将按钮水平方向距离重置为0并调用回调
        buttonX = 0
        this.doDispatch('setButtonX', buttonX)
        callback(buttonX)
      }
      let newButtonX = buttonX
      timer = setInterval(() => {
        newButtonX += step
        // 如果进度已经到底了
        if (newButtonX > progressWidth) {
          // 将按钮位置置到进度条的长度那么大
          this.doDispatch('setButtonX', progressWidth)
          // 将时间置到总值
          this.doDispatch('setPassTime', totalTime)
          // 将按钮改为准备播放状态
          this.doDispatch('setPlay', false)
          clearInterval(timer)
          timer = null
          // 回调传递时间
          callback(totalTime)
          return
        }
        this.doDispatch('setButtonX', newButtonX)
        let passTime = newButtonX / progressWidth * totalTime
        this.doDispatch('setPassTime', passTime)
        // 如果加上步进值后刚刚到底，那么立即将按钮置为待播放状态并清除计时器
        if (passTime === totalTime) {
          this.doDispatch('setPlay', false)
          clearInterval(timer)
          timer = null
        }
        callback(passTime)
      }, 1000)
    }
  }

  // 按钮被按下时的回调
  mouseDownButton(e) {
    isMouseDown = true
    LocationX = e.clientX
  }

  // 拖动按钮时的回调
  dragButton(e) {
    // 只有在按钮上长按了，才能拖动进度条
    if (isMouseDown) {
      // 拖拽的时候暂停播放
      this.doDispatch('setPlay', false)
      if (timer) {
        clearInterval(timer)
        timer = null
      }
      let { buttonX } = this.props
      let progressWidth = this.refs.drag_progress_component.clientWidth
      let newButtonX = e.clientX - LocationX + buttonX
      if (newButtonX > progressWidth) {
        newButtonX = progressWidth
      }
      if (newButtonX < 0) {
        newButtonX = 0
      }
      LocationX = e.clientX
      if (newButtonX === buttonX) {
        return
      }
      isMouseMove = true
      this.doDispatch('setButtonX', newButtonX)
      this.doDispatch('setPassTime', newButtonX / progressWidth * this.props.totalTime)
    }
  }

  // 拖动放开后的回调
  mouseUpButton(e) {
    // 如果是拖拽之后才触发的onmousedown，那么需要执行对新状态执行回调
    if (isMouseMove) {
      let { passTime, callback } = this.props
      callback(passTime)
    }
    isMouseMove = false
    isMouseDown = false
  }

  // 封装的dispatch，接受参数[actionCreator, ...params]
  doDispatch(...args) {
    const { PREFIX, dispatchAction } = this.props
    dispatchAction(DragProgressAction(PREFIX)[args[0]](...args.slice(1)))
  }

  // 将毫秒数转换为00:00:00的时分秒的格式
  formatTime(totalTime) {
    let hours = Math.floor(totalTime / 3600000)
    if (hours < 10) {
      hours = `0${hours}`
    }
    totalTime %= 3600000
    let minutes = Math.floor(totalTime / 60000)
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    totalTime %= 60000
    let seconds = Math.ceil(totalTime / 1000)
    if (seconds < 10) {
      seconds = `0${seconds}`
    }

    return `${hours} : ${minutes} : ${seconds}`
  }

  // 点击标记时间时处理函数
  clickSignTime(time, left) {
    // 清空计时器
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    const { callback } = this.props
    this.doDispatch('setButtonX', left * this.refs.drag_progress_component.clientWidth)
    this.doDispatch('setPlay', false)
    this.doDispatch('setPassTime', time)
    callback(time)
  }

  render() {
    let { style, className, isPlaying, buttonX, passTime, signTime, totalTime } = this.props
    let signTimeBlockArr = []

    // 去除重复的标记时间
    signTime = [...new Set(signTime)]

    for (let i = 0, len = signTime.length; i < len; i++) {
      let item = signTime[i]

      if (item > 0 && item < totalTime) {
        let left = item / totalTime
        signTimeBlockArr.push(
          <div key={`signTimeBlockArr${i}`} className='signtime'
            style={{left: `${left * 100}%`}}
            onClick={() => this.clickSignTime(item, left)}
          />
        )
      }
    }

    return (
      <div className={'drag-progress-component ' + (className || '')}
        style={style || {}} ref='drag_progress_component'>
        <div className={'l button ' + (isPlaying ? 'active' : '')}
          style={{marginLeft: buttonX + 'px'}}
          onClick={() => this.clickButton()}
          onMouseDown={(e) => this.mouseDownButton(e)}
        />
        <div className='timer'>{this.formatTime(passTime)}</div>
        <div className='pass' style={{width: buttonX + 'px'}} />
        {signTimeBlockArr}
      </div>
    )
  }
}

export default DragProgress
