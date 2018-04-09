import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchAction from './action'
import './index.less'

@connect(
  state => ({ ...state.search }),
  dispatch => ({
    dispatchAction: dispatch
  })
)
class Search extends Component {
  componentDidMount() {
    window.showResult = (data) => {
      this.doDispatch('setResult', data.s)
    }
  }

  input(e) {
    if (e.keyCode === 13 || e.which === 13) {
      return
    }
    let keyword = this.refs.keyword.value
    this.doDispatch('setResult', null)
    this.doDispatch('setText', '搜索中...')
    this.doDispatch('setKeyword', keyword)
    this.sendSearch(keyword)
  }

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

  doDispatch(...args) {
    const { PREFIX, dispatchAction } = this.props
    dispatchAction(SearchAction(PREFIX)[args[0]](...args.slice(1)))
  }

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
        }
      } else {
        location.href = searchUrl + keyword
      }
    }
  }

  render() {
    const { result, text, style, className } = this.props
    let resultWrp = []
    if (result) {
      if (result.length) {
        result.forEach(function (item, index) {
          resultWrp.push(
            <li key={'search' + index} className='toh' onClick={(e) => this.doSearch(e)}>{item}</li>
          )
        }, this)
      } else {
        resultWrp.push(<li key='noData' className='text'>暂无结果</li>)
      }
    } else {
      resultWrp.push(<li key='isNull' className='text'>{text}</li>)
    }

    return (
      <div className={'search-wrp ' + className} style={style}>
        <div className='search-input'>
          <input type='text' onKeyUp={(e) => this.input(e)} ref='keyword' onKeyPress={(e) => this.doSearch(e)} />
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
