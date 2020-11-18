/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useEffect } from 'react'
import { getCriterions, searchCities } from '../../api/cities.api'

const CitiesContext = React.createContext()

export function CitiesProvider(props) {
  const [cities, _setCities] = useState([])
  const [criterions, _setCriterions] = useState(null)
  const [isLoading, _setIsLoading] = useState(false)

  const onSearch = useCallback(async (params) => {
    _setIsLoading(true)
    searchCities(params).then(_setCities)
      .then(() => _setIsLoading(false))
  }, [])

  useEffect(() => {
    getCriterions().then(_setCriterions)
  }, [])

  return (
    <CitiesContext.Provider
      {...props}
      value={{
        cities,
        criterions,
        isLoading,
        // function
        onSearch
      }}
    />
  )
}

export const useCities = () => {
  const context = React.useContext(CitiesContext)
  if (!context) throw new Error('useCities must be used in CitiesProvider')

  return context
}
