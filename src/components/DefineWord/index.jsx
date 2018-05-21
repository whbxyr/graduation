import React, { Component } from 'react'
import { connect } from 'react-redux'
import DefineWordAction from './action'
import './index.less'
let deleteTime = 0
let wordColors = [
  '#39cbb2', '#e39e4c', '#55a4da', '#8891d3', '#3fb9cc', '#82bf75', '#ccb449',
  '#799bb5', '#e69090', '#cb95ca', '#d9d17c', '#ab90d4', '#70bf91', '#6999b7'
]
let colorIndex = 0

@connect(
  state => ({ ...state.defineWord }),
  dispatch => ({
    dispatchAction: dispatch
  })
)
class DefineWord extends Component {
  // 让添加的自定义词典显示的函数
  showWord() {
    colorIndex = 0
    let { defineWord } = this.props
    let words = []
    defineWord = defineWord.split(',')
    for (let i = 0, len = defineWord.length; i < len; i++) {
      let item = defineWord[i]
      if (colorIndex >= wordColors.length) {
        colorIndex = 0
      }
      if (item) {
        words.push(<div key={'words' + i} className='l word' style={{ 'background': wordColors[colorIndex++] }}>{item}</div>)
      }
    }
    return words
  }

  // 添加自定义词典的函数
  changeDefineWord(text) {
    if (text) {
      deleteTime = -1
    }
    const { defineWord, PREFIX, dispatchAction, onChange } = this.props
    let len = text.length
    if (text[len - 1] === ' ' || text[len - 1] === '\n') {
      let word = text.slice(0, len - 1)
      if (word !== '') {
        dispatchAction(DefineWordAction(PREFIX).changeDefineWord(defineWord ? (defineWord + ',' + word) : word))
        onChange && onChange(defineWord ? (defineWord + ',' + word) : word)
      }
      if (this.refs.input_area) {
        deleteTime++
        this.refs.input_area.value = ''
      }
    }
  }

  // 清除自定义词典的函数
  clearDefineWord() {
    const { defineWord, PREFIX, dispatchAction, onChange } = this.props
    // 有数据的时候才需要清除
    if (defineWord) {
      dispatchAction(DefineWordAction(PREFIX).changeDefineWord(''))
      onChange && onChange('')
    }
  }

  // 监听自定义词典删除事件的函数
  deleteDefineWord(e) {
    if (this.refs.input_area.value === '') {
      if (e.keyCode === 8 || e.which === 8) {
        deleteTime++
      }
    }
    /**
     * 判断当前在自定义词典编辑区域的删除动作是否有效
     * 当值大于0时，删除动作有效，否则无效
     */
    if (deleteTime > 0) {
      this.deleteOneWord()
    }
  }

  // 有效删除一个自定义关键词的函数
  deleteOneWord() {
    let { defineWord, PREFIX, dispatchAction, onChange } = this.props
    if (!defineWord) {
      return
    }
    defineWord = defineWord.split(',')
    defineWord = defineWord.slice(0, defineWord.length - 1).join(',')
    dispatchAction(DefineWordAction(PREFIX).changeDefineWord(defineWord))
    onChange && onChange(defineWord)
  }

  render() {
    const { defineWord, style, className } = this.props
    let words = this.showWord()
    return (
      <div className={'define-word clearfloat ' + (className || '')} style={style || {}}>
        <div className='define-word-ctn clearfloat' onClick={() => this.refs.input_area.focus()}>
          <div className='l title'>自定义词典</div>
          {words}
          <textarea ref='input_area' className='l input-area scrollable'
            onKeyUp={(e) => this.deleteDefineWord(e)}
            onChange={(e) => this.changeDefineWord(e.target.value)} />
        </div>
        <div className='r button'>
          <button className={'clear ' + (defineWord ? 'active' : '')}
            onClick={defineWord ? () => this.clearDefineWord() : null}>
            清除
          </button>
        </div>
      </div>
    )
  }
}

export default DefineWord
