import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useCities } from '../../common/contexts/citiesContext'
import { MainLayout } from '../../components/main-layout'
import { paramUrlToObject } from '../../utils/url'
import CriterionsPanel from './criterions-panel'
import CityItem from './city-item'

const Items = styled(Link)`
  && {
    color: inherit;
    text-decoration: none;
  }
`

const CitiesPage = ({ location: { search } }) => {
  const { onSearch, cities, isLoading } = useCities()
  const params = paramUrlToObject(search)

  useEffect(() => {
    onSearch(params)
  }, [])

  const getCityUrl = (city) => {
    let url = `/city/${city.insee_com}-${city.nom_comm}`

    if (params.code_rome) {
      url += `?code_rome=${params.code_rome.join(',')}`
    }

    return url
  }

  return (
    <MainLayout>
      <CriterionsPanel criterions={params} total={cities.length} />
      {isLoading && (<p>Loading...</p>)}
      {cities.slice(0, 10).map((c) => (
        <Items key={c.id} to={getCityUrl(c)}><CityItem city={c} /></Items>
      ))}
    </MainLayout>
  )
}

CitiesPage.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  })
}

CitiesPage.defaultProps = {
  location: {
    search: ''
  }
}

export default CitiesPage
