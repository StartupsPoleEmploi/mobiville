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
  const { cities, isLoading, onSearch } = useCities()
  const [params, setParams] = useState(null)
  const [itemsViews, setItemsViews] = useState(10)
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
      onSearch(params)
    }
  }, [params])

  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset)
    }
  }, [])

  useEffect(() => {
    // on list change replace on the top
    window.scrollTo(0, 0)
    setItemsViews(10)
  }, [cities])

  useEffect(() => {
    const heightCheck = window.innerHeight * 2
    const { body } = document
    const html = document.documentElement
    const contentHeight = Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight)

    if (
      contentHeight - window.scrollY < heightCheck
    ) {
      // can load next page
      if (cities.length > itemsViews + 20) {
        setItemsViews(itemsViews + 20)
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

  return (
    <MainLayout>
      {isMobileView(size) && <MobileCriterionsPanel criterions={params} total={cities.length} />}
      {!isMobileView(size) && (
      <DesktopCriterionsPanel
        paramsUrl={params}
        total={cities.length}
        redirectTo={onRedirectTo}
      />
      )}
      {isLoading && (<p>Loading...</p>)}
      {!isLoading && cities.length === 0 && (<p>Aucuns resultat</p>)}
      <CitiesArea isMobile={isMobileView(size)}>
        {cities.slice(0, itemsViews).map((c) => (
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

export default React.memo(CitiesPage)
