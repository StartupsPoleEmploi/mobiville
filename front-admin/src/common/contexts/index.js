import React from 'react'
import { AdminProvider } from './adminContext'
import { UserProvider } from './userContext'

export default function Providers(props) {
  return (
    <AdminProvider>
      <UserProvider {...props} />
    </AdminProvider>
  )
}
