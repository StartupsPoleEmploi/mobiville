import React from 'react'
import ReactDOM from 'react-dom'
import { ToastContainer } from 'react-toastify'
import './assets/styles/main.scss'
import {
  MuiThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from '@mui/material/styles'
import App from './App'
import reportWebVitals from './reportWebVitals'
import Providers from './common/contexts'
import 'react-toastify/dist/ReactToastify.css'

const theme = createMuiTheme({})

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <Providers>
        <App />
        <ToastContainer />
      </Providers>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
