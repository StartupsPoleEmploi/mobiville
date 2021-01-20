import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const MainLayout = styled.div`

`

const PanelCityLife = ({ city }) => {
  useEffect(() => {
  }, [city])

  return (
    <MainLayout>
      Cadre de vie
    </MainLayout>
  )
}

PanelCityLife.propTypes = {
  city: PropTypes.object.isRequired
}

PanelCityLife.defaultProps = {
}

export default PanelCityLife
