import React, { Component } from 'react'
import './index.less'

class Header extends Component {
  constructor() {
    super()
    this.state = {
      menuActive: false
    }
  }

  // 显示菜单
  showMenu() {
    let { menuActive } = this.state
    this.setState({
      menuActive: !menuActive
    })
  }

  render() {
    let { menuActive } = this.state

    return (
      <div className='header'>
        <div className='icon'>
          <div className='l react' />
          <div className='l redux' />
        </div>
        <div className='title'>
          使用 react 以及 redux 实现组件化，组件包括日期组件、上传组件、自定义词典组件等
        </div>
        <div className='menu' onClick={() => this.showMenu()} />
        <div className={'menu-ctn clearfloat ' + (menuActive ? 'active' : '')}>
          <div className='triangle' />
          <a className='l link clearfloat' title='词典组件' href='/defineword'>
            <div className='img define-word' />
            <div className='text toh'>词典组件</div>
          </a>
          <a className='l link clearfloat' title='日选择器' href='/datepicker'>
            <div className='img date-picker' />
            <div className='text toh'>日选择器</div>
          </a>
          <a className='l link clearfloat' title='周选择器' href='/weekpicker'>
            <div className='img week-picker' />
            <div className='text toh'>周选择器</div>
          </a>
          <a className='l link clearfloat' title='上传组件' href='/upload'>
            <div className='img upload' />
            <div className='text toh'>上传组件</div>
          </a>
          <a className='l link clearfloat' title='搜索组件' href='/search'>
            <div className='img search' />
            <div className='text toh'>搜索组件</div>
          </a>
          <a className='l link clearfloat' title='拖拽进度' href='/dragProgress'>
            <div className='img drag-progress' />
            <div className='text toh'>拖拽进度</div>
          </a>
        </div>
      </div>
    )
  }
}

export default Header
