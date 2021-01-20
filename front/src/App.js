import React from 'react'
import { Routes } from './routes/routes'

function App() {
  // import tag commander
  const script = document.createElement('script')
  if (process.env.REACT_APP_ZEN_ENV !== 'production') {
    script.src = 'http://cdn.tagcommander.com/5595/tc_Mobiville_31.js'
  } else {
    script.src = 'http://cdn.tagcommander.com/5595/uat/tc_Mobiville_31.js'
  }
  script.async = true
  document.body.appendChild(script)

  return (<Routes />)
}

export default App
