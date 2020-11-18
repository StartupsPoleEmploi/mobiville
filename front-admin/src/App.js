import React from 'react'
import { useUser } from './common/contexts/userContext'
import { Routes } from './routes/routes'

function App() {
  const { isReady } = useUser()

  if (!isReady) {
    return <div />
  }

  return (<Routes />)
}

export default App
