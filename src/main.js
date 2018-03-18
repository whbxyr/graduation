/**
 * 应用入口文件
 * Created by xuyaunrui on 2018/3/18.
 */
import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import createStore from './store/createStore'
import { Router, Route } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import App from './App'
import Test from './components/Test'

const browserHistory = createBrowserHistory()
const store = createStore(browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

ReactDom.render(
  <Provider store={store}>
    <Router history={history}>
      <App>
        <Route path={'/test'} component={Test} />
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
)
