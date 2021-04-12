import { orderBy } from 'lodash'
import React, { useState, useCallback } from 'react'
import { searchProfessions, searchInfosTravail } from '../../api/professions.api'

const ProfessionsContext = React.createContext()

export function ProfessionsProvider(props) {
  const [professions, _setProfessions] = useState([])
  const [isLoading, _setIsLoading] = useState(false)

  const onSearch = useCallback((params) => {
    _setIsLoading(true)
    searchProfessions(params).then((profs) => {
      _setProfessions(orderBy(profs, ['dateCreation'], ['desc']))
    })
      .then(() => _setIsLoading(false))
  }, [])

  const onSearchInfosTravail = useCallback((params) => searchInfosTravail(params), [])

  return (
    <ProfessionsContext.Provider
      {...props}
      value={{
        professions,
        isLoading,
        // function
        onSearch,
        onSearchInfosTravail
      }}
    />
  )
}

export const useProfessions = () => {
  const context = React.useContext(ProfessionsContext)
  if (!context) throw new Error('useProfessions must be used in ProfessionsContext')

  return context
}
