import React, { Component } from 'react'
import { connect } from 'react-redux'
import DragProgressAction from './action'
import './index.less'

let isMouseDown = false
let LocationX = null

@connect(
  state => ({ ...state.dragProgress }),
  dispatch => ({
    dispatchAction: dispatch
  })
)
class DragProgress extends Component {
  componentDidMount() {
  }

  clickButton() {
    let { isPlaying } = this.props
    this.doDispatch('setPlay', !isPlaying)
  }

  // 按钮被按下时的回调
  mouseDownButton(e) {
    isMouseDown = true
    LocationX = e.clientX
  }

  // 拖动按钮时的回调
  dragButton(e) {
    if (isMouseDown && LocationX) {
      let { buttonX } = this.props
      let diffX = e.clientX - LocationX
      if (diffX > 0) {
        if (diffX + buttonX > this.refs.drag_progress_component.clientWidth) {
          return
        }
        this.doDispatch('setButtonX', diffX + buttonX)
      }
    }
  }

  // 拖动放开后的回调
  mouseUpButton(e) {
    isMouseDown = false
    LocationX = null
    console.log('置为false')
  }

  // 封装的dispatch，接受参数[actionCreator, ...params]
  doDispatch(...args) {
    const { PREFIX, dispatchAction } = this.props
    dispatchAction(DragProgressAction(PREFIX)[args[0]](...args.slice(1)))
  }

  render() {
    const { style, className, isPlaying, buttonX } = this.props

    return (
      <div className={'drag-progress-component ' + className} style={style} ref='drag_progress_component'>
        <div className='pass' />
        <div className={'button ' + (isPlaying ? 'active' : '')}
          style={{left: buttonX + 'px'}}
          onClick={() => this.clickButton()}
          onMouseDown={(e) => this.mouseDownButton(e)}
          onMouseMove={(e) => this.dragButton(e)}
          onMouseUp={(e) => this.mouseUpButton(e)}
        />
      </div>
    )
  }
}

export default DragProgress
