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
import Selector from './components/Selector'
import Switcher from './components/Switcher'

const browserHistory = createBrowserHistory()
const store = createStore(browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

const render = () => {
  ReactDom.render(
    <Provider store={store}>
      <Router history={history}>
        <App>
          <Route path={'/defineword'} render={() =>
            <DefineWord PREFIX='' style={{'width': '300px', 'margin': '0 auto'}}
              className='myword'
              onChange={(result) => console.log(result)}
            />}
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
                stepTime={50000}
                totalTime={864000}
                signTime={[100000, 300000, 500000]}
                callback={(data) => console.log(data)}
              />
            </div>}
          />
          <Route path={'/selector'} render={() =>
            <div className='selector-ctn'>
              <Selector style={{}} className='' PREFIX='' multiple choices={[
                {key: 0, label: '第一个', value: 0},
                {key: 1, label: '第二个', value: 1},
                {key: 2, label: '第三个', value: 2},
                {key: 3, label: '第四个', value: 3},
                {key: 4, label: '第五个', value: 4},
                {key: 5, label: '第六个', value: 5}
              ]} onChange={(result) => console.log(result)} />
            </div>}
          />
          <Route path={'/switcher'} render={() =>
            <div className='switcher-ctn'>
              <Switcher style={{}} className='' PREFIX=''
                activeValue={'按年付费'} inactiveValue={'按月付费'}
                onChange={(status, value) => console.log(status, value)}
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
