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
import Test from './components/Test'
import DefineWord from './components/DefineWord'

const browserHistory = createBrowserHistory()
const store = createStore(browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

const render = () => {
  ReactDom.render(
    <Provider store={store}>
      <Router history={history}>
        <App>
          <Route path={'/test'} component={Test} />
          <Route path={'/defineword'} render={() =>
            <DefineWord style={{'width': '300px', 'margin': '0 auto'}} PREFIX='' className='myword' />}
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
