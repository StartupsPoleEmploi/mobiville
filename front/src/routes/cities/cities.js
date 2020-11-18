import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useCities } from '../../common/contexts/citiesContext'
import { MainLayout } from '../../components/main-layout'
import { paramUrlToObject } from '../../utils/url'

const CitiesPage = ({ location: { search } }) => {
  const { onSearch, cities, isLoading } = useCities()

  useEffect(() => {
    onSearch(paramUrlToObject(search))
  }, [])

  return (
    <MainLayout>
      <p>Cities</p>
      {isLoading && (<p>Loading...</p>)}
      {cities.map((c) => (
        <div key={c.id}>
          <ul>
            <li>
              commune:
              {' '}
              {c.nom_comm}
            </li>
            <li>
              nom_dept:
              {' '}
              {c.nom_dept}
            </li>
            <li>
              altitude:
              {' '}
              {c.z_moyen}
            </li>
            <li>
              nom_region:
              {' '}
              {c.nom_region}
            </li>
            <li>
              population:
              {' '}
              {c.population}
            </li>
            <li>
              match:
              {' '}
              {c.match}
              %
            </li>
            <hr />
          </ul>
        </div>
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
