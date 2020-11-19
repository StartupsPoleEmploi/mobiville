/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useEffect } from 'react'
import { getCriterions, loadCity, searchCities } from '../../api/cities.api'

const CitiesContext = React.createContext()

export function CitiesProvider(props) {
  const [cities, _setCities] = useState([])
  const [city, _setCity] = useState(null)
  const [criterions, _setCriterions] = useState(null)
  const [isLoading, _setIsLoading] = useState(false)
  const [isLoadingCity, _setIsLoadingCity] = useState(false)

  const onSearch = useCallback((params) => {
    _setIsLoading(true)
    searchCities(params).then(_setCities)
      .then(() => _setIsLoading(false))
  }, [])

  const onLoadCity = useCallback((id) => {
    _setIsLoadingCity(true)
    loadCity(id).then(_setCity)
      .then(() => _setIsLoadingCity(false))
  })

  useEffect(() => {
    getCriterions().then(_setCriterions)
  }, [])

  return (
    <CitiesContext.Provider
      {...props}
      value={{
        cities,
        city,
        criterions,
        isLoading,
        isLoadingCity,
        // function
        onSearch,
        onLoadCity
      }}
    />
  )
}

export const useCities = () => {
  const context = React.useContext(CitiesContext)
  if (!context) throw new Error('useCities must be used in CitiesProvider')

  return context
}
