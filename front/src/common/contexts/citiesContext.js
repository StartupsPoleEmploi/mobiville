/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useEffect } from 'react'
import {
  getCriterions, loadCity, searchCities, searchCityByLocation, searchCityByName
} from '../../api/cities.api'

const CitiesContext = React.createContext()

export function CitiesProvider(props) {
  const [cities, _setCities] = useState([])
  const [city, setCity] = useState(null)
  const [criterions, _setCriterions] = useState(null)
  const [isLoading, _setIsLoading] = useState(false)
  const [isLoadingCity, _setIsLoadingCity] = useState(false)
  const [isLoadingLocation, _setIsLoadingLocation] = useState(false)

  const onSearch = useCallback((params) => {
    _setIsLoading(true)
    searchCities(params).then(_setCities)
      .then(() => _setIsLoading(false))
  }, [])

  const onLoadCity = useCallback((id) => {
    _setIsLoadingCity(true)
    loadCity(id).then(setCity)
      .then(() => _setIsLoadingCity(false))
  })

  const onSearchByLocation = useCallback(({ latitude, longitude }) => {
    _setIsLoadingLocation(true)
    searchCityByLocation({ latitude, longitude }).then(setCity)
      .then(() => _setIsLoadingLocation(false))
  })

  const onSearchByName = useCallback(({ name }) => {
    _setIsLoadingLocation(true)
    searchCityByName({ name }).then(_setCities)
      .then(() => _setIsLoadingLocation(false))
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
        isLoadingLocation,
        // function
        setCity,
        onSearch,
        onLoadCity,
        onSearchByLocation,
        onSearchByName
      }}
    />
  )
}

export const useCities = () => {
  const context = React.useContext(CitiesContext)
  if (!context) throw new Error('useCities must be used in CitiesProvider')

  return context
}
