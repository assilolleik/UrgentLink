import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import './style.css'
import Home from './views/home'
import Chat from './views/chat'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={Home} exact path="/home" />
        <Route component={Chat} exact path="/chat" />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
