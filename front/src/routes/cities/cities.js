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

  useEffect(() => {
    onSearch(paramUrlToObject(search))
  }, [])

  return (
    <MainLayout>
      <CriterionsPanel criterions={paramUrlToObject(search)} total={cities.length} />
      {isLoading && (<p>Loading...</p>)}
      {cities.map((c) => (
        <Items key={c.id} to={`/city/${c.insee_com}-${c.nom_comm}`}><CityItem city={c} /></Items>
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
