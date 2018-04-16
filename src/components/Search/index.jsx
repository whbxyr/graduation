import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchAction from './action'
import './index.less'

let keywordMiddle = ''

@connect(
  state => ({ ...state.search }),
  dispatch => ({
    dispatchAction: dispatch
  })
)
class Search extends Component {
  componentDidMount() {
    // jsonp调用的全局回调函数
    window.showResult = (data) => {
      this.doDispatch('setResult', data.s)
    }
  }

  // 监听搜索框的输入函数
  input() {
    this.doDispatch('setResultIndex', -1)
    let keyword = this.refs.keyword.value
    keywordMiddle = keyword
    if (keyword) {
      this.doDispatch('setResult', null)
      this.doDispatch('setText', '搜索中...')
      this.doDispatch('setKeyword', keyword)
      this.sendSearch(keyword)
    } else if (this.props.keyword) {
      this.doDispatch('setResult', [])
      this.doDispatch('setKeyword', keyword)
    }
  }

  // 使用jsonp获取搜索推荐的关键函数
  sendSearch(keyword) {
    const { suggestSearchUrl } = this.props
    let searchScript = document.getElementById('search-script')
    var ctn = document.body || document.documentElement
    if (searchScript) {
      ctn.removeChild(searchScript)
    }
    searchScript = document.createElement('script')
    searchScript.id = 'search-script'
    searchScript.src = suggestSearchUrl + keyword + '&cb=showResult'
    ctn.appendChild(searchScript)
  }

  // 封装的dispatch，接受参数[actionCreator, ...params]
  doDispatch(...args) {
    const { PREFIX, dispatchAction } = this.props
    dispatchAction(SearchAction(PREFIX)[args[0]](...args.slice(1)))
  }

  // 跳转到百度的搜索结页面
  doSearch(e) {
    const { searchUrl } = this.props
    let keyword = this.refs.keyword.value
    if (keyword) {
      if (e) {
        let pressCode = e.keyCode || e.which
        if (typeof pressCode === 'undefined') {
          location.href = searchUrl + e.target.innerText
        } else if (pressCode === 13) {
          location.href = searchUrl + keyword
        } else if (pressCode === 38 || pressCode === 40) {
          let { result, resultIndex } = this.props
          let len = result.length
          let resultItem = ''
          switch (pressCode) {
            // 上
            case 38:
              if (resultIndex === -1) {
                resultIndex = len - 1
              } else {
                resultIndex--
              }
              break
            // 下
            case 40:
              if (resultIndex === len - 1) {
                resultIndex = -1
              } else {
                resultIndex++
              }
              break
          }
          if (resultIndex === -1) {
            resultItem = keywordMiddle
          } else {
            resultItem = result[resultIndex]
          }
          this.doDispatch('setResultIndex', resultIndex)
          this.doDispatch('setKeyword', resultItem)
          // this.refs.keyword.focus()
          // this.refs.keyword.setSelectionRange(resultItem.length, resultItem.length)
        }
      } else {
        location.href = searchUrl + keyword
      }
    }
  }

  render() {
    const { keyword, result, text, style, className, resultIndex } = this.props
    let resultWrp = []
    if (result) {
      if (result.length) {
        result.forEach(function (item, index) {
          resultWrp.push(
            <li key={'search' + index} className={'toh ' + (resultIndex === index ? 'active' : '')} onClick={(e) => this.doSearch(e)}>{item}</li>
          )
        }, this)
      } else {
        resultWrp.push(<li key='noData' className='text'>暂无结果</li>)
      }
    } else {
      resultWrp.push(<li key='isNull' className='text'>{text}</li>)
    }

    return (
      <div className={'search-wrp ' + (className || '')} style={style || {}}>
        <div className='search-input'>
          <input type='text' onChange={() => this.input()} ref='keyword' onKeyDown={(e) => this.doSearch(e)} value={keyword} />
          <div className='button' onClick={() => this.doSearch()}>搜索</div>
        </div>
        <ul className='result'>
          {resultWrp}
        </ul>
      </div>
    )
  }
}

export default Search
