import React from 'react'
import ReactDOM from 'react-dom'
import './assets/styles/main.scss'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import App from './App'
import reportWebVitals from './reportWebVitals'
import Providers from './common/contexts'

const theme = createMuiTheme({})

const browserHistory = createBrowserHistory({
  basename: '/admin'
})

ReactDOM.render(
  <React.StrictMode>
    <Router history={browserHistory}>
      <MuiThemeProvider theme={theme}>
        <Providers>
          <App />
        </Providers>
      </MuiThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
