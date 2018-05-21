import React, { Component } from 'react'
import { connect } from 'react-redux'
import SwitcherAction from './action'
import './index.less'

@connect(
  state => ({ ...state.switcher }),
  dispatch => ({
    dispatchAction: dispatch
  })
)
class Switcher extends Component {
  componentDidMount() {
    let { activeValue, inactiveValue, switcherStatus } = this.props
    activeValue = activeValue || ''
    inactiveValue = inactiveValue || activeValue
    switch (switcherStatus) {
      case 'on':
        this.doDispatch('setSwitcherResult', activeValue)
        break
      case 'off':
        this.doDispatch('setSwitcherResult', inactiveValue)
        break
    }
  }

  // 封装的dispatch，接受参数[actionCreator, ...params]
  doDispatch(...args) {
    const { PREFIX, dispatchAction } = this.props
    dispatchAction(SwitcherAction(PREFIX)[args[0]](...args.slice(1)))
  }

  changeStatus() {
    const { switcherStatus, onChange } = this.props
    let { activeValue, inactiveValue } = this.props
    activeValue = activeValue || ''
    inactiveValue = inactiveValue || activeValue

    switch (switcherStatus) {
      case 'on':
        this.doDispatch('setSwitcherStatus', 'off')
        this.doDispatch('setSwitcherResult', inactiveValue)
        onChange && onChange('off', inactiveValue)
        break
      case 'off':
        this.doDispatch('setSwitcherStatus', 'on')
        this.doDispatch('setSwitcherResult', activeValue)
        onChange && onChange('on', activeValue)
        break
    }
  }

  render() {
    const { className, style, switcherStatus } = this.props
    let { activeValue, inactiveValue } = this.props
    activeValue = activeValue || ''
    inactiveValue = inactiveValue || activeValue

    return (
      <div className={'switcher ' + (className || '')} style={style || {}}>
        <div className={'on-value ' + (switcherStatus === 'off' ? 'active' : '')}>{inactiveValue}</div>
        <div className={'switcher-core ' + (switcherStatus === 'on' ? 'checked' : '')}
          onClick={() => this.changeStatus()}>
          <div className={'btn ' + (switcherStatus === 'on' ? 'checked' : 'unchecked')} />
        </div>
        <div className={'off-value ' + (switcherStatus === 'on' ? 'active' : '')}>{activeValue}</div>
      </div>
    )
  }
}

export default Switcher
