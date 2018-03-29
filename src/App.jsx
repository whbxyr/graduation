import React, { Component } from 'react'
import Header from './components/Header'
import '../static/css/reset.less'
import './App.less'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className='container'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default App
