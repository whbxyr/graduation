/**
 * 应用入口文件
 * Created by xuyaunrui on 2018/3/18.
 */
import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import createStore from './store/createStore'
import { Router, Route } from 'react-router-dom'
import { syncHistoryWithStore } from 'react-router-redux'
import App from './App'
import DefineWord from './components/DefineWord'
import DatePicker from './components/DatePicker'
import WeekPicker from './components/WeekPicker'
import Upload from './components/Upload'
import Search from './components/Search'
import DragProgress from './components/DragProgress'

const browserHistory = createBrowserHistory()
const store = createStore(browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

const render = () => {
  ReactDom.render(
    <Provider store={store}>
      <Router history={history}>
        <App>
          <Route path={'/defineword'} render={() =>
            <DefineWord PREFIX='' style={{'width': '300px', 'margin': '0 auto'}} className='myword' />}
          />
          <Route path={'/datepicker'} render={() =>
            <div className='datepicker-ctn'>
              <DatePicker PREFIX='' style={{}} className='' onDateChange={(obj) => { console.log(obj) }} />
            </div>}
          />
          <Route path={'/weekpicker'} render={() =>
            <div className='weekpicker-ctn'>
              <WeekPicker PREFIX='' style={{}} className='' futureDisabled onDateChange={(obj) => { console.log(obj) }} />
            </div>}
          />
          <Route path={'/upload'} render={() =>
            <div className='upload-ctn'>
              <Upload style={{}} className='' PREFIX='' url='' />
            </div>}
          />
          <Route path={'/search'} render={() =>
            <div className='search-ctn'>
              <Search style={{}} className='' PREFIX=''
                suggestSearchUrl='http://suggestion.baidu.com/su?wd='
                searchUrl='https://www.baidu.com/s?&wd=' />
            </div>}
          />
          <Route path={'/dragprogress'} render={() =>
            <div className='drag-progress-ctn'>
              <DragProgress style={{}} className='' PREFIX=''
                width={300}
                stepTime={50000}
                totalTime={864000}
                signTime={[100000, 300000, 500000]}
                callback={(data) => console.log(data)}
              />
            </div>}
          />
        </App>
      </Router>
    </Provider>,
    document.getElementById('root')
  )
}
render()

if (module.hot) {
  module.hot.accept('./App', () => render())
}
