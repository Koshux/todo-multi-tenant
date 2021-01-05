import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import ProtectedRoute from './components/protected-route'
import React from 'react'
import Register from './pages/Register'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      h1: {
        'font-family': 'BitterPro'
      }
    }
  }
})

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container minWidth="sm" className="background">
          {/* <div className="App"> */}
            <Switch>
              <ProtectedRoute
                component={Home}
                exact
                path="/home"
              />
              <Route
                component={ Login }
                exact
                path="/"
              />
              <Route
                component={ Register }
                exact
                path="/register"
              />
              <Route
                path="*"
                component={() => "404 - Page Not Found"}
              />
            </Switch>
          {/* </div> */}
        </Container>
      </ThemeProvider>
    </Router>
  )
}

export default App;
