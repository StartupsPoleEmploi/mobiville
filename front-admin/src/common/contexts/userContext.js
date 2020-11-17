/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useEffect } from 'react'
import { currentUser, login } from '../../api/auth.api'

const UserContext = React.createContext()

export function UserProvider(props) {
  const [user, _setUser] = useState(null)
  const [isReady, _setIsReady] = useState(false)

  const onLogin = useCallback(async (email, password) => login(email, password).then(_setUser), [])

  useEffect(() => {
    async function asyncMethod() {
      _setUser(await currentUser())
      _setIsReady(true)
    }
    asyncMethod()
  }, [])

  return (
    <UserContext.Provider
      {...props}
      value={{
        user,
        isReady,
        // function
        onLogin
      }}
    />
  )
}

export const useUser = () => {
  const context = React.useContext(UserContext)
  if (!context) throw new Error('useUser must be used in DeclarationsProvider')

  return context
}
