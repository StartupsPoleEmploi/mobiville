import React, { useEffect, useRef, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import queryString from 'query-string'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import { useCities } from '../../common/contexts/citiesContext'
import { MainLayout } from '../../components/main-layout'
import MobileCriterionsPanel from './mobile-criterions-panel'
import CityItem from './city-item'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'
import { COLOR_OTHER_GREEN } from '../../constants/colors'
import DesktopCriterionsPanel from './desktop-criterions-panel'
import MobileCriterionsSelection from './mobile-criterions-selection'
import CitiesFilterList from './cities-filter-list'
import noResultsPic from '../../assets/images/no_results.svg'

const Items = styled(Link)`
  && {
    color: inherit;
    text-decoration: none;
  }
`

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

const Infopanel = styled.div`
  display: flex;
  background: ${COLOR_OTHER_GREEN};
  align-items: space-between;
  justify-content: space-between;
  width: 100%;
  max-width: 700px;
  margin: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 12px;
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
  overflow: hidden;
`

const CitiesList = styled.div`
  max-width: ${({ isMobile }) => (isMobile ? 'auto' : '600px')};
  margin-left: ${({ isMobile }) => (isMobile ? '16px' : 'auto')};
  margin-right: ${({ isMobile }) => (isMobile ? '16px' : 'auto')};
  overflow: ${({ isMobile }) => (isMobile ? 'inherit' : 'auto')};
`

const StyledMapContainer = styled(MapContainer)`
  height: 424px;
  width: 424px;
  max-width: 100%;
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 16px;
`

const CitiesPage = () => {
  const { cities, isLoading, onSearch, totalCities, sortCriterions } =
    useCities()
  const size = useWindowSize()
  const location = useLocation()
  const history = useHistory()
  const [params, setParams] = useState(queryString.parse(location.search))
  const [windowScroll, setWindowScroll] = useState(0) // mobile version
  const [citiesListScroll, setCitiesListScroll] = useState(0) // desktop version
  const [showMobilePanel, setShowMobileCriterionsSelection] = useState(false)
  const citiesListRef = useRef(null)

  useEffect(() => {
    if (location.search) {
      localStorage.setItem('lastSearch', location.search)
      setParams(queryString.parse(location.search))
    }
  }, [location])

  useEffect(() => {
    if (params && params.codeRome) {
      onSearch({ ...params, sortBy: sortCriterions })
    }
  }, [params, sortCriterions])

  useEffect(() => {
    window.onscroll = () => {
      setWindowScroll(window.pageYOffset)
    }
    citiesListRef.current.onscroll = () => {
      setCitiesListScroll(citiesListRef.current.scrollTop)
    }
  }, [])

  useEffect(() => {
    if (isLoading) return
    if (totalCities <= cities.length) return

    const bottomPixelsThreshold = 500 // 500 pixels to the bottom, we want to load more data if available
    const { body } = document
    const contentHeight = isMobile
      ? body.scrollHeight
      : citiesListRef.current.scrollHeight

    const containerHeight = isMobile
      ? window.innerHeight
      : citiesListRef.current.offsetHeight

    const scrollY = isMobile ? window.scrollY : citiesListRef.current.scrollTop

    const isCloseToBottom =
      scrollY + containerHeight > contentHeight - bottomPixelsThreshold

    if (!isCloseToBottom) return

    onSearch({ ...params, sortBy: sortCriterions }, cities.length, cities)
  }, [windowScroll, citiesListScroll])

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
  const isMobile = isMobileView(size)

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
        <CitiesFilterList />
      </CitiesFilterContainer>
      {!isMobile && (
        <Infopanel>
          <p>
            Les villes qui vous sont proposées sont les villes où il y a des
            offres et peu de concurrence, afin d’accélérer votre recherche
            d’emploi.
          </p>
        </Infopanel>
      )}
      {cities.map((city) => (
        <Items key={city.id} to={getCityUrl(city)}>
          <CityItem city={city} />
        </Items>
      ))}
      {!isLoading && cities.length === 0 && (
        <NotFoundContainer>
          <img alt="" src={noResultsPic} style={{ marginBottom: '2rem' }} />
          Aucune ville correspondante
          <br />
          Modifiez vos critères
        </NotFoundContainer>
      )}
      {isLoading && <p style={{ margin: '2rem auto' }}>Chargement...</p>}
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
    <MainLayout style={{ overflow: isMobile ? 'inherit' : 'hidden' }}>
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
          {!isLoading ? (
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
              {cities.map((city) => (
                <Marker
                  key={city.id}
                  position={[city.geo_point_2d_x, city.geo_point_2d_y]}
                >
                  <Popup>
                    <Link to={getCityUrl(city)}>
                      <b>{city.nom_comm}</b> (
                      {Math.floor(city.population * 1000)} habitants)
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

CitiesPage.propTypes = {}

CitiesPage.defaultProps = {}

export default React.memo(CitiesPage)
