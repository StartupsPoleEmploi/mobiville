/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useEffect } from 'react'
import {
  getCriterions,
  loadCity,
  searchCities as apiSearchCities,
  searchCityByLocation,
  searchCityByName,
  getCityTenement,
  getCityAmenities,
  searchJobLabels,
} from '../../api/cities.api'

const EMPTY_CITY = { id: null, nom_comm: 'Non trouvée', description: '' }

const CitiesContext = React.createContext()

export function CitiesProvider(props) {
  const [cities, _setCities] = useState([])
  const [totalCities, _setTotalCities] = useState(0)
  const [searchCities, _setSearchCities] = useState([])
  const [jobsMatchingCriterions, setJobsMatchingCriterions] = useState([])
  const [city, setCity] = useState(null)
  const [criterions, _setCriterions] = useState(null)
  const [criterionsError, setCriterionError] = useState(null)
  const [isLoading, _setIsLoading] = useState(true)
  const [isLoadingCity, _setIsLoadingCity] = useState(false)
  const [isLoadingLocation, _setIsLoadingLocation] = useState(false)
  const [isLoadingTenement, _setIsLoadingTenement] = useState(false)
  const [isLoadingAmenities, _setIsLoadingAmenities] = useState(false)
  const [isLoadingJobsMatchingCriterion, setIsLoadingJobsMatchingCriterion] =
    useState(false)
  const [sortCriterions, setSortCriterions] = useState('')
  const [cityTenement, _setCityTenement] = useState(null)
  const [cityAmenities, _setCityAmenities] = useState(null)
  const [environmentCriterions, _setEnvironmentCriterions] = useState([])
  const [cityCriterions, _setCityCriterions] = useState([])
  const [regionCriterions, _setRegionCriterions] = useState([])

  const onSearch = useCallback((params, index = 0, oldCities = []) => {
    _setIsLoading(true)
    if (index === 0) {
      _setCities([])
    }

    apiSearchCities({ ...params, index })
      .then((c) => {
        if (index === 0) {
          _setCities(c.list)
        } else {
          _setCities(oldCities.concat(c.list))
        }
        _setTotalCities(c.total)
      })
      .then(() => {
        _setIsLoading(false)
      })
  }, [])

  const onLoadCity = useCallback((id) => {
    _setIsLoadingCity(true)
    loadCity(id)
      .then(setCity)
      .then(() => _setIsLoadingCity(false))
  })

  const onSearchByLocation = useCallback(({ latitude, longitude }) => {
    _setIsLoadingLocation(true)
    searchCityByLocation({ latitude, longitude })
      .then(setCity)
      .then(() => _setIsLoadingLocation(false))
  })

  const onSearchByName = useCallback(({ id, name }) => {
    _setIsLoadingLocation(true)
    searchCityByName({ id, name })
      .then((c) => {
        if (c.length === 0) {
          _setSearchCities([EMPTY_CITY])
        } else {
          _setSearchCities(c)
        }

        return c
      })
      .then(() => _setIsLoadingLocation(false))
      .catch(() => {
        _setSearchCities([EMPTY_CITY])
        _setIsLoadingLocation(false)
      })
  })

  const onSearchById = useCallback((id) =>
    searchCityByName({ id }).then((c) => {
      if (c.length === 0) {
        return EMPTY_CITY
      }
      return c[0]
    })
  )

  const onGetCityTenement = useCallback((id) => {
    _setIsLoadingTenement(true)
    getCityTenement(id)
      .then(_setCityTenement)
      .then(() => _setIsLoadingTenement(false))
  })

  const onGetCityAmenities = useCallback((id) => {
    _setIsLoadingAmenities(true)
    getCityAmenities(id)
      .then(_setCityAmenities)
      .then(() => _setIsLoadingAmenities(false))
  })

  const onSearchJobLabels = useCallback(
    (label) => {
      if (!label.trim()) {
        setJobsMatchingCriterions(criterions.codeRomes)
        return
      }

      setIsLoadingJobsMatchingCriterion(true)

      searchJobLabels({ label }).then((results) => {
        // augment rome labels with job title matches
        setJobsMatchingCriterions(
          results.reduce((prev, result) => {
            const { key: romeKey, label: romeLabel } =
              criterions.codeRomes.find(({ key }) => result.codeRome === key)

            return prev.concat({
              key: romeKey,
              label: romeLabel.concat(` (${result.label}, …)`),
            })
          }, [])
        )
        setIsLoadingJobsMatchingCriterion(false)
      })
    },
    [criterions]
  )

  useEffect(() => {
    getCriterions()
      .then((results) => {
        _setCriterions(results)
        setJobsMatchingCriterions(results.codeRomes)

        _setEnvironmentCriterions(
          results.criterions
            .filter((c) => c.tag === 'environment')
            .map(({ key, label, icon }) => ({ key, label, icon }))
        )

        _setCityCriterions(
          results.criterions
            .filter((c) => c.tag === 'city')
            .map(({ key, label, subLabel, icon }) => ({
              key,
              label,
              subLabel,
              icon,
            }))
        )

        _setRegionCriterions(
          results.regions.map(({ id, label }) => ({ key: id, label }))
        )
      })
      .catch((err) => setCriterionError(err))
  }, [])

  return (
    <CitiesContext.Provider
      {...props}
      value={{
        cities,
        searchCities,
        city,
        criterions,
        criterionsError,
        isLoading,
        isLoadingCity,
        isLoadingLocation,
        isLoadingJobsMatchingCriterion,
        sortCriterions,
        isLoadingTenement,
        cityTenement,
        isLoadingAmenities,
        cityAmenities,
        totalCities,
        jobsMatchingCriterions,
        environmentCriterions,
        cityCriterions,
        regionCriterions,
        // function
        setCity,
        onSearch,
        onLoadCity,
        onSearchByLocation,
        onSearchByName,
        onSearchById,
        setSortCriterions,
        onGetCityTenement,
        onGetCityAmenities,
        onSearchJobLabels,
      }}
    />
  )
}

export const useCities = () => {
  const context = React.useContext(CitiesContext)
  if (!context) throw new Error('useCities must be used in CitiesProvider')

  return context
}
