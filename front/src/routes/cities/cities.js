import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useCities } from '../../common/contexts/citiesContext'
import { MainLayout } from '../../components/main-layout'
import { paramUrlToObject } from '../../utils/url'
import MobileCriterionsPanel from './mobile-criterions-panel'
import CityItem from './city-item'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'
// import DesktopCriterionsPanel from './desktop-criterions-panel'

const Items = styled(Link)`
  && {
    color: inherit;
    text-decoration: none;
  }        
`

const CitiesArea = styled.div`
  max-width: ${(props) => (props.isMobile ? 'auto' : '700px')};
  margin-left: ${(props) => (props.isMobile ? '16px' : 'auto')};
  margin-right: ${(props) => (props.isMobile ? '16px' : 'auto')};
`

const CitiesPage = () => {
  const { onSearch, cities, isLoading } = useCities()
  const [params, setParams] = useState(null)
  const size = useWindowSize()
  const location = useLocation()

  useEffect(() => {
    if (location.search) {
      setParams(paramUrlToObject(location.search))
    }
  }, [location])

  useEffect(() => {
    if (params && params.code_rome) {
      onSearch(params)
    }
  }, [params])

  const getCityUrl = (city) => {
    let url = `/city/${city.insee_com}-${city.nom_comm}`

    if (params && params.code_rome) {
      url += `?code_rome=${params.code_rome.join(',')}`
    }

    return url
  }

  return (
    <MainLayout>
      {isMobileView(size) && <MobileCriterionsPanel criterions={params} total={cities.length} />}
      {/*! isMobileView(size) && <DesktopCriterionsPanel
      criterions={params} total={cities.length} /> */}
      {isLoading && (<p>Loading...</p>)}
      <CitiesArea isMobile={isMobileView(size)}>
        {cities.slice(0, 10).map((c) => (
          <Items key={c.id} to={getCityUrl(c)}><CityItem city={c} /></Items>
        ))}
      </CitiesArea>
    </MainLayout>
  )
}

CitiesPage.propTypes = {
}

CitiesPage.defaultProps = {
}

export default CitiesPage
