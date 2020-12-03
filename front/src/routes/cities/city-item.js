import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import { ucFirst } from '../../utils/utils'

const Wrapper = styled.div` 
  padding: 16px;
  margin-top: 32px;
`

const Title = styled(Typography)`
  && {
    font-weight: bold;
    margin-bottom: 9px;
    font-size: 18px;
  }
`

const Image = styled.div`
  height: 172px;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`

const Description = styled(Typography)`
  && {
    max-height: 64px;
    overflow: hidden;
  }
`

const CityItem = ({ city }) => (
  <Wrapper>
    <Image />
    <Title>{ucFirst(city.nom_comm.toLowerCase())}</Title>
    <Description>
      {city.description}
    </Description>
  </Wrapper>
)

CityItem.propTypes = {
  city: PropTypes.object.isRequired
}

CityItem.defaultProps = {
}

export default CityItem
