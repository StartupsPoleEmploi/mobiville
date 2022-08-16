import React, { useEffect, useRef, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import queryString from 'query-string'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'

import { useCities } from '../../common/contexts/citiesContext'
import { MainLayout } from '../../components'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'
import {
  COLOR_BUTTON_HOVER,
  COLOR_PRIMARY,
} from '../../constants/colors'

import CityItem from './components/CityItem'
import MobileCriterionsPanel from './MobileCriterionsPanel'
import DesktopCriterionsPanel from './DesktopCriterionsPanel'
import MobileCriterionsSelection from './MobileCriterionsSelection'
import CitiesFilters from './CitiesFilters'
import noResultsPic from '../../assets/images/no_results.svg'

import blueMarker from '../../assets/images/marker-blue.png'
import yellowMarker from '../../assets/images/marker-yellow.png'
import redMarker from '../../assets/images/marker-red.png'
import { formatNumber } from '../../utils/utils'

import Pagination from '@mui/material/Pagination'
import { useProfessions } from '../../common/contexts/professionsContext'

const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding-top: 5rem;
  font-size: 1.5rem;
  line-height: 1.5;
  color: #657078;
`

const CitiesFilterContainer = styled.div`
  display: flex;
  max-width: 700px;
  align-items: center;
  margin: auto;
  padding-bottom: 16px;
`

const CitiesFilterText = styled.div`
  flex: 1;
  font-weight: 500;
`

const DesktopContainer = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 1040px;
`

const CitiesList = styled.div`
  max-width: ${({ isMobile }) => (isMobile ? 'auto' : '600px')};
  padding: ${({ isMobile }) => (isMobile ? '0 16px' : '0 8px 0 8px')};
  //overflow: ${({ isMobile }) => (isMobile ? 'inherit' : 'auto')};

  a {
    margin: 8px;
  }
`

const StyledMapContainer = styled(MapContainer)`
  height: 424px;
  width: 424px;
  max-width: 100%;
  margin-left: 8px;
  margin-right: 8px;
  border-radius: 16px;
`

const PaginationContainer = styled.div`
  margin-top: 40px;

  nav ul {
    padding: 0px;
    max-width: 370px;
    margin: auto;
  }

  nav ul li button {
    padding: 0px;
    width: 24px;
    min-width: 24px;
    height: 32px;
  }

  nav ul li button.Mui-selected {
    background-color: ${COLOR_PRIMARY};
    border-radius: 32px;
    color: #fff;
  }

  nav ul li:first-child button,
  nav ul li:last-child button {
    padding: 0px;
    width: 32px;
    min-width: 32px;
    height: 32px;
    background-color: #fff;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12),
      0px 1px 3px rgba(0, 0, 0, 0.2);
  }

  nav ul li:first-child button:hover,
  nav ul li:last-child button:hover {
    background-color: ${COLOR_BUTTON_HOVER};
    color: #fff;
  }
`

const Cities = () => {
  const { cities, isLoading, onSearch, totalCities, sortCriterions } =
    useCities()
  const isMobile = isMobileView(useWindowSize())

  const location = useLocation()
  const history = useHistory()
  const [params, setParams] = useState(queryString.parse(location.search))
  const [showMobilePanel, setShowMobileCriterionsSelection] = useState(false)
  const [hoveredCityId, setHoveredCityId] = useState(null)
  const [selectedCityId, setSelectedCityId] = useState(null)
  const [useAllCities, setUseAllCities] = useState(false)
  const citiesListRef = useRef(null)
  const {
    isLoading: isLoadingProfessions,
    professionsCountList,
    onSearchCountList,
  } = useProfessions()

  const citiesItemsRef = useRef([])

  useEffect(() => {
    if (!professionsCountList) return
    professionsCountList.map((professionsCount) => {
      const city = cities.find(
        (city) => city.insee_com === professionsCount.insee.toString()
      )
      if (city) city.totalOffres = professionsCount.total
      return true // useless lint validation "warning"
    })
  }, [professionsCountList])

  useEffect(() => {
    citiesItemsRef.current = citiesItemsRef.current.slice(0, cities.length)
  }, [cities])

  useEffect(() => {
    if (location.search) {
      localStorage.setItem('lastSearch', location.search)
      setParams(queryString.parse(location.search))
    }
  }, [location])

  useEffect(() => {
    if (params?.codeRome) {
      onSearch({
        ...params,
        sortBy: sortCriterions,
        onlySearchInTension: !useAllCities,
      })
    }
  }, [params, sortCriterions, useAllCities])

  useEffect(() => {
    if (cities.length > 0) {
      let listCitiesInsee = []
      cities.map((city) => {
        return listCitiesInsee.push([city.insee_com])
      })
      onSearchCountList({
        codeRome: [params.codeRome],
        inseeList: listCitiesInsee,
      })
    }
  }, [params, useAllCities, sortCriterions, cities])

  const getCityUrl = (city) => {
    let url = `/city/${city.insee_com}-${city.nom_comm}`

    if (params && params.codeRome) {
      url += `?codeRome=${params.codeRome}`
    }

    return url
  }

  const onSubmit = ({ city, environment, region }) => {
    const data = {
      codeRome: [params.codeRome || params.codeRomes[0].key],
      codeRegion: [region],
      codeCity: city,
      codeEnvironment: environment,
    }

    history.push({
      pathname: '/cities',
      search: queryString.stringify(data),
    })
  }

  const showMobileCriterionsSelection = (bool) =>
    setShowMobileCriterionsSelection(bool)

  const [page, setPage] = React.useState(1)

  useEffect(() => {
    onSearch(
      { ...params, sortBy: sortCriterions, onlySearchInTension: !useAllCities },
      page * 10,
      cities
    )
  }, [useAllCities, page])

  const itemsPerPage = 10
  const [noOfPages, setNoOfPages] = React.useState(0)
  useEffect(() => {
    setNoOfPages(Math.ceil(totalCities / itemsPerPage))
  }, [totalCities])

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const getLeafletIcon = (requiredFile) => (
    new L.Icon({
      iconUrl: requiredFile,
      iconRetinaUrl: requiredFile,
      iconAnchor: [12, 41],
      popupAnchor: [0, -41],
      shadowUrl: null,
      shadowSize: null,
      shadowAnchor: null,
      className: 'leaflet-marker-icon',
    })
  )

  if (showMobilePanel) {
    return (
      <MainLayout menu={{ visible: !showMobileCriterionsSelection }}>
        <MobileCriterionsSelection
          paramsUrl={params}
          onSubmit={onSubmit}
          showMobileCriterionsSelection={showMobileCriterionsSelection}
          total={totalCities}
        />
      </MainLayout>
    )
  }

  const citiesList = (
    <CitiesList isMobile={isMobile} ref={citiesListRef}>
      <CitiesFilterContainer>
        <CitiesFilterText>
          <span>{totalCities}</span>{' '}
          {totalCities > 1 ? 'villes correspondantes' : 'ville correspondante'}
        </CitiesFilterText>
        <CitiesFilters />
      </CitiesFilterContainer>
      {!isLoadingProfessions &&
        cities.map((city, key) => (
          <CityItem
            city={city}
            selected={selectedCityId === city.id}
            sortCriterions={sortCriterions}
            key={city.id}
            to={getCityUrl(city)}
            onMouseOver={() => setHoveredCityId(city.id)}
            onMouseLeave={() => setHoveredCityId(null)}
            itemRef={(el) => (citiesItemsRef.current[key] = el)}
          />
        ))}
      {!isLoading && cities.length === 0 && (
        <NotFoundContainer>
          <img alt="" src={noResultsPic} style={{ marginBottom: '2rem' }} />
          Aucune ville correspondante
          <br />
          Modifiez vos critères
        </NotFoundContainer>
      )}
      <PaginationContainer>
        <Pagination
          count={noOfPages}
          defaultPage={0}
          page={page}
          siblingCount={2}
          boundaryCount={0}
          onChange={handlePageChange}
        />
      </PaginationContainer>
    </CitiesList>
  )

  let firstCityCoordinates
  let mapBounds
  if (cities.length > 0) {
    firstCityCoordinates = [cities[0].geo_point_2d_x, cities[0].geo_point_2d_y]
    mapBounds = cities.reduce(
      (prev, city) => ({
        minX: prev.minX > city.geo_point_2d_x ? city.geo_point_2d_x : prev.minX,
        maxX: prev.maxX < city.geo_point_2d_x ? city.geo_point_2d_x : prev.maxX,
        minY: prev.minY > city.geo_point_2d_y ? city.geo_point_2d_y : prev.minY,
        maxY: prev.maxY < city.geo_point_2d_y ? city.geo_point_2d_y : prev.maxY,
      }),
      {
        minX: Number.POSITIVE_INFINITY,
        maxX: Number.NEGATIVE_INFINITY,
        minY: Number.POSITIVE_INFINITY,
        maxY: Number.NEGATIVE_INFINITY,
      }
    )
  }

  return (
    <MainLayout
      style={{
        overflow: isMobile ? 'inherit' : '',
        minHeight: isMobile ? undefined : '',
      }}
    >
      {isMobile ? (
        <MobileCriterionsPanel
          criterions={params}
          showMobileCriterionsSelection={showMobileCriterionsSelection}
          total={totalCities}
        />
      ) : (
        <DesktopCriterionsPanel
          paramsUrl={params}
          total={totalCities}
          onSubmit={onSubmit}
        />
      )}

      {isMobile ? (
        citiesList
      ) : (
        <DesktopContainer>
          {citiesList}

          {cities.length ? (
            <StyledMapContainer
              center={cities.length > 1 ? null : firstCityCoordinates}
              zoom={cities.length > 1 ? null : 6}
              bounds={
                cities.length > 1
                  ? [
                      [mapBounds.minX, mapBounds.minY],
                      [mapBounds.maxX, mapBounds.maxY],
                    ]
                  : null
              }
              scrollWheelZoom
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {cities.map((city, key) => (
                <Marker
                  key={city.id}
                  position={[city.geo_point_2d_x, city.geo_point_2d_y]}
                  icon={getLeafletIcon(
                    city.id === selectedCityId
                      ? redMarker
                      : city.id === hoveredCityId
                      ? yellowMarker
                      : blueMarker
                  )}
                  eventHandlers={{
                    popupopen: () => {
                      setSelectedCityId(city.id)
                      citiesItemsRef.current[key].scrollIntoView({
                        behavior: 'smooth',
                      })
                      citiesItemsRef.current[key].focus()
                    },
                    popupclose: () => setSelectedCityId(null),
                  }}
                >
                  <Popup>
                    <Link to={getCityUrl(city)}>
                      <b>{city.nom_comm}</b> (
                      {formatNumber(city.population * 1000)} habitants)
                    </Link>
                  </Popup>
                </Marker>
              ))}
            </StyledMapContainer>
          ) : (
            <div style={{ width: 424 }} />
          )}
        </DesktopContainer>
      )}
    </MainLayout>
  )
}

Cities.propTypes = {}

export default React.memo(Cities)
