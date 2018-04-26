import React, { Component } from 'react'
import { connect } from 'react-redux'
import SelectorAction from './action'
import './index.less'

@connect(
  state => ({ ...state.selector }),
  dispatch => ({
    dispatchAction: dispatch
  })
)
class Selector extends Component {
  componentDidMount() {
  }

  showList() {
    const { isListShow } = this.props
    this.doDispatch('setListShow', !isListShow)
  }

  select(item) {
    this.doDispatch('setSelectResult', item)
  }

  // 封装的dispatch，接受参数[actionCreator, ...params]
  doDispatch(...args) {
    const { PREFIX, dispatchAction } = this.props
    dispatchAction(SelectorAction(PREFIX)[args[0]](...args.slice(1)))
  }

  render() {
    const { className, style, isListShow, selectResult, choices } = this.props
    let list = []

    choices.forEach((item, index) => {
      list.push(<li className='list-item' key={index} onClick={() => this.select(item)}>
        {item.label}
      </li>)
    }, this)

    return (
      <div className={'selector ' + className} style={style} onClick={() => this.showList()}>
        <input type='text' placeholder='请选择'
          className={isListShow ? 'is-focus' : ''}
          ref='selector_input'
          autoComplete='off'
          readOnly='readonly'
          value={(selectResult && selectResult.label) || ''}
        />
        <i className={'input-suffix-arrow-up ' + (isListShow ? 'is-reverse' : '')} />
        <div className='select-dropdown' style={{ display: isListShow ? 'block' : 'none' }}>
          <ul className='list'>
            {list}
          </ul>
        </div>
      </div>
    )
  }
}

export default Selector
