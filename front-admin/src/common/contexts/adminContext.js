/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react'
import { adminGetSearchs } from '../../api/admin.api'

const AdminContext = React.createContext()

export function AdminProvider(props) {
  const [searchs, _setSearchs] = useState([])

  const getSearchs = useCallback(() => adminGetSearchs().then(_setSearchs), [])

  return (
    <AdminContext.Provider
      {...props}
      value={{
        searchs,
        // function
        getSearchs
      }}
    />
  )
}

export const useAdmin = () => {
  const context = React.useContext(AdminContext)
  if (!context) throw new Error('useAdmin must be used in DeclarationsProvider')

  return context
}
