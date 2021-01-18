/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useEffect } from 'react'
import {
  getCriterions, loadCity, searchCities as apiSearchCities, searchCityByLocation, searchCityByName
} from '../../api/cities.api'

const EMPTY_CITY = { id: null, nom_comm: 'Non trouvée', description: '' }

const CitiesContext = React.createContext()

export function CitiesProvider(props) {
  const [cities, _setCities] = useState([])
  const [searchCities, _setSearchCities] = useState([])
  const [city, setCity] = useState(null)
  const [criterions, _setCriterions] = useState(null)
  const [isLoading, _setIsLoading] = useState(false)
  const [isLoadingCity, _setIsLoadingCity] = useState(false)
  const [isLoadingLocation, _setIsLoadingLocation] = useState(false)

  const onSearch = useCallback((params) => {
    _setIsLoading(true)
    apiSearchCities(params).then(_setCities)
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

  const onSearchByName = useCallback(({ id, name }) => {
    _setIsLoadingLocation(true)
    searchCityByName({ id, name }).then((c) => {
      if (c.length === 0) {
        _setSearchCities([EMPTY_CITY])
      } else {
        _setSearchCities(c)
      }

      return c
    })
      .then(() => _setIsLoadingLocation(false))
      .catch(() => { _setSearchCities([EMPTY_CITY]); _setIsLoadingLocation(false) })
  })

  useEffect(() => {
    getCriterions().then(_setCriterions)
  }, [])

  return (
    <CitiesContext.Provider
      {...props}
      value={{
        cities,
        searchCities,
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
