import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import queryString from 'query-string'

import { useCities } from '../../common/contexts/citiesContext'
import { MainLayout } from '../../components/main-layout'
import MobileCriterionsPanel from './mobile-criterions-panel'
import CityItem from './city-item'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'
import DesktopCriterionsPanel from './desktop-criterions-panel'
import MobileCriterionsSelection from './mobile-criterions-selection'

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

const CitiesArea = styled.div`
  max-width: ${(props) => (props.isMobile ? 'auto' : '700px')};
  margin-left: ${(props) => (props.isMobile ? '16px' : 'auto')};
  margin-right: ${(props) => (props.isMobile ? '16px' : 'auto')};
`

const CitiesPage = () => {
  const { cities, isLoading, onSearch, totalCities, sortCriterions } =
    useCities()
  const size = useWindowSize()
  const location = useLocation()
  const history = useHistory()
  const [params, setParams] = useState(queryString.parse(location.search))
  const [offset, setOffset] = useState(0)
  const [showMobilePanel, setShowMobileCriterionsSelection] = useState(false)

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
      setOffset(window.pageYOffset)
    }
  }, [])

  useEffect(() => {
    const heightCheck = window.innerHeight * 1.5
    const { body } = document
    const html = document.documentElement
    const contentHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    )

    if (
      contentHeight - window.scrollY < heightCheck &&
      !isLoading &&
      cities.length
    ) {
      // can load next page
      if (totalCities > cities.length) {
        onSearch({ ...params, sortBy: sortCriterions }, cities.length, cities)
      }
    }
  }, [offset])

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

  return (
    <MainLayout>
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

      {cities.length === 0 ? (
        !isLoading && (
          <NotFoundContainer>
            <img alt="" src={noResultsPic} style={{ marginBottom: '2rem' }} />
            Aucune ville correspondante
            <br />
            Modifiez vos crit??res
          </NotFoundContainer>
        )
      ) : (
        <CitiesArea isMobile={isMobile}>
          {cities.map((city) => (
            <Items key={city.id} to={getCityUrl(city)}>
              <CityItem city={city} />
            </Items>
          ))}
        </CitiesArea>
      )}

      {isLoading && <p style={{ margin: '2rem auto' }}>Chargement...</p>}
    </MainLayout>
  )
}

CitiesPage.propTypes = {}

CitiesPage.defaultProps = {}

export default React.memo(CitiesPage)
