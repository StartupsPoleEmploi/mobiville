import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useCities } from '../../common/contexts/citiesContext'
import { MainLayout } from '../../components/main-layout'
import { paramUrlToObject } from '../../utils/url'
import MobileCriterionsPanel from './mobile-criterions-panel'
import CityItem from './city-item'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'
import DesktopCriterionsPanel from './desktop-criterions-panel'

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
  const {
    cities, isLoading, onSearch, totalCities, sortCriterions
  } = useCities()
  const [params, setParams] = useState(null)
  const [offset, setOffset] = useState(0)
  const size = useWindowSize()
  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    if (location.search) {
      localStorage.setItem('lastSearch', location.search)
      setParams(paramUrlToObject(location.search))
    }
  }, [location])

  useEffect(() => {
    if (params && params.code_rome) {
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
    const contentHeight = Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight)

    if (
      contentHeight - window.scrollY < heightCheck && !isLoading && cities.length
    ) {
      // can load next page
      if (totalCities > cities.length) {
        onSearch({ ...params, sortBy: sortCriterions }, cities.length, cities)
      }
    }
  }, [offset])

  const getCityUrl = (city) => {
    let url = `/city/${city.insee_com}-${city.nom_comm}`

    if (params && params.code_rome) {
      url += `?code_rome=${params.code_rome.join(',')}`
    }

    return url
  }

  const onRedirectTo = (to) => {
    // add test log
    history.push({ pathname: '/cities', search: `?${to}&n=${new Date().getTime()}` })
  }

  const isMobile = isMobileView(size)

  return (
    <MainLayout>
      {isMobile
        ? <MobileCriterionsPanel criterions={params} total={totalCities} />
        : (
          <DesktopCriterionsPanel
            paramsUrl={params}
            total={totalCities}
            redirectTo={onRedirectTo}
          />
        )}

      {isLoading && (<p style={{ margin: '2rem auto' }}>Chargement...</p>)}

      {!isLoading && (
        cities.length === 0 ? (
          <NotFoundContainer>
            <img
              alt=""
              src={noResultsPic}
              style={{ marginBottom: '2rem' }}
            />
            Aucune ville correspondante
            <br />
            Modifiez vos critères
          </NotFoundContainer>
        ) : (
          <CitiesArea isMobile={isMobile}>
            {cities.map((city) => (
              <Items key={city.id} to={getCityUrl(city)}><CityItem city={city} /></Items>
            ))}
          </CitiesArea>
        )
      )}
    </MainLayout>
  )
}

CitiesPage.propTypes = {
}

CitiesPage.defaultProps = {
}

export default React.memo(CitiesPage)
