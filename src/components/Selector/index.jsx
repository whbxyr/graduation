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
    const { multiple, selectResult } = this.props
    let ifHad = false
    let newSelectResult = []
    if (multiple) {
      for (let i in selectResult) {
        if (item.value === selectResult[i].value) {
          ifHad = true
          selectResult.splice(i, 1)
          break
        }
      }
      if (!ifHad) {
        selectResult.push(item)
      }
      newSelectResult = newSelectResult.concat(selectResult)
    } else {
      newSelectResult = newSelectResult.concat(item)
    }
    this.doDispatch('setSelectResult', newSelectResult)
  }

  // 封装的dispatch，接受参数[actionCreator, ...params]
  doDispatch(...args) {
    const { PREFIX, dispatchAction } = this.props
    dispatchAction(SelectorAction(PREFIX)[args[0]](...args.slice(1)))
  }

  render() {
    const { className, style, isListShow, selectResult, choices } = this.props
    let list = []
    let resultText = []
    let valueArr = []
    for (let i = 0, len = selectResult.length; i < len; i++) {
      resultText.push(selectResult[i].label)
      valueArr.push(selectResult[i].value)
    }

    choices.forEach((item, index) => {
      list.push(
        <li key={index}
          className={'list-item ' + (valueArr.indexOf(item.value) > -1 ? 'chosen' : '')}
          onClick={() => this.select(item)}>
          {item.label}
        </li>
      )
    }, this)
    resultText = resultText.join('，')

    return (
      <div className={'selector ' + className} style={style}>
        <div onClick={() => this.showList()}>
          <input type='text' placeholder='请选择'
            className={isListShow ? 'is-focus' : ''}
            ref='selector_input'
            autoComplete='off'
            readOnly='readonly'
            value={resultText}
            title={resultText}
          />
          <i className={'input-suffix-arrow-up ' + (isListShow ? 'is-reverse' : '')} />
        </div>
        <div className='select-dropdown' style={{ display: isListShow ? 'block' : 'none' }}>
          <div className='triangle' />
          <ul className='list'>
            {list}
          </ul>
        </div>
      </div>
    )
  }
}

export default Selector
