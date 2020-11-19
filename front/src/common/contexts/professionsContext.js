import React, { useState, useCallback } from 'react'
import { searchProfessions } from '../../api/professions.api'

const ProfessionsContext = React.createContext()

export function ProfessionsProvider(props) {
  const [professions, _setProfessions] = useState([])
  const [isLoading, _setIsLoading] = useState(false)

  const onSearch = useCallback((params) => {
    _setIsLoading(true)
    searchProfessions(params).then(_setProfessions)
      .then(() => _setIsLoading(false))
  }, [])

  return (
    <ProfessionsContext.Provider
      {...props}
      value={{
        professions,
        isLoading,
        // function
        onSearch
      }}
    />
  )
}

export const useProfessions = () => {
  const context = React.useContext(ProfessionsContext)
  if (!context) throw new Error('useProfessions must be used in ProfessionsContext')

  return context
}
