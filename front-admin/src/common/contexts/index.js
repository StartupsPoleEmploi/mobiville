import React from 'react'
import { UserProvider } from './userContext'

export default function Providers(props) {
  return <UserProvider {...props} />
}
