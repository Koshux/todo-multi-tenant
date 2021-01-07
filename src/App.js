import './App.css'
import CssBaseline from '@material-ui/core/CssBaseline'
import Home from './pages/Home'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import React from 'react'
import Register from './pages/Register'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'


function App({ auth }) {
  return (
    <Router>
      <CssBaseline />
      <Switch>
        <ProtectedRoute
          component={props => <Home {...props} auth={auth} />}
          exact
          path="/home"
        />
        <Route
          component={props => <Login {...props} auth={auth} />}
          exact
          path="/"
        />
        <Route
          component={props => <Register {...props} auth={auth} />}
          exact
          path="/register"
        />
        <Route
          path="*"
          component={() => "404 - Page Not Found"}
        />
      </Switch>
    </Router>
  )
}

export default App;
