/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useEffect } from 'react'
import { orderBy } from 'lodash'
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
  const [sortCriterions, setSortCriterions] = useState('')

  const sortCities = (cs) => {
    switch (sortCriterions) {
      case 'habitant':
        return orderBy(cs, ['population'], ['desc'])
      case 'mer':
        return orderBy(cs, ['distance_from_sea'], ['asc'])
      case 'montagne':
        return orderBy(cs, ['z_moyen'], ['desc'])
      default:
        return orderBy(cs, ['match', 'nom_comm'], ['desc', 'asc'])
    }
  }

  const onSearch = useCallback((params) => {
    _setIsLoading(true)
    apiSearchCities(params).then((c) => _setCities(sortCities(c)))
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

  useEffect(() => {
    _setCities(sortCities(cities))
  }, [sortCriterions])

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
        sortCriterions,
        // function
        setCity,
        onSearch,
        onLoadCity,
        onSearchByLocation,
        onSearchByName,
        setSortCriterions
      }}
    />
  )
}

export const useCities = () => {
  const context = React.useContext(CitiesContext)
  if (!context) throw new Error('useCities must be used in CitiesProvider')

  return context
}
