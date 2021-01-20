import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const MainLayout = styled.div`

`

const PanelCityLogement = ({ city }) => {
  useEffect(() => {
  }, [city])

  return (
    <MainLayout>
      Logement
    </MainLayout>
  )
}

PanelCityLogement.propTypes = {
  city: PropTypes.object.isRequired
}

PanelCityLogement.defaultProps = {
}

export default PanelCityLogement
