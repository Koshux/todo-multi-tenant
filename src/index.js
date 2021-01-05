import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

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

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
