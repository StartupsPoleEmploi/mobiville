import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import { ucFirst } from '../../utils/utils'
import { COLOR_TEXT_PRIMARY, COLOR_TEXT_SECONDARY } from '../../constants/colors'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'

const Wrapper = styled.div` 
  margin-top: 16px;
  margin-bottom: ${(props) => (props.isMobile ? '16px' : '32px')};
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
  align-items: ${(props) => (props.isMobile ? 'stretch' : 'center')};
`

const Title = styled(Typography)`
  && {
    font-weight: bold;
    margin-bottom: 9px;
    font-size: 18px;
  }
`

const Image = styled.div`
  height: ${(props) => (props.isMobile ? '172px' : '160px')};
  border-radius: 8px;
  margin-bottom: ${(props) => (props.isMobile ? '16px' : '0')};
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: ${(props) => (props.isMobile ? '100%' : '248px')};
  min-width: ${(props) => (props.isMobile ? 'auto' : '248px')};
  margin-right: ${(props) => (props.isMobile ? '0' : '16px')};
`

const Description = styled(Typography)`
  && {
    max-height: 64px;
    overflow: hidden;
  }
`

const TagsBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 8px 0 0 0;
`

const Tag = styled.div`
  background: white;
  border-radius: 1000px;
  padding: 4px 6px;
  font-size: 12px;
  margin-right: 8px;
  margin-bottom: 8px;
  font-weight: 500;
  color: ${COLOR_TEXT_PRIMARY};
  border: 1px solid ${COLOR_TEXT_SECONDARY};
`

const InformationsBlock = styled.div`

`

const CityItem = ({ city }) => {
  const size = useWindowSize()

  return (
    <Wrapper isMobile={isMobileView(size)}>
      <Image style={{ backgroundImage: `url(${city.photo || `/regions/region-${city['region.new_code']}.jpg`})` }} isMobile={isMobileView(size)} />
      <InformationsBlock>
        <Title>{ucFirst(city.nom_comm.toLowerCase())}</Title>
        <Description>
          {city.description}
        </Description>
        <TagsBlock>
          {city.distance_from_sea && city.distance_from_sea <= 10 && (
          <Tag>
            Mer
            {' < '}
            10km
          </Tag>
          )}
          {city.distance_from_sea
          && city.distance_from_sea > 10
          && city.distance_from_sea <= 20 && (
          <Tag>
            Mer
            {' < '}
            20km
          </Tag>
          )}
          {city.distance_from_sea
          && city.distance_from_sea > 20
          && city.distance_from_sea <= 30 && (
          <Tag>
            Mer
            {' < '}
            30km
          </Tag>
          )}
          {city.city_size_label && <Tag>{city.city_size_label}</Tag>}
          {city.z_moyen && (
          <Tag>
            Altitude moyenne
            {' '}
            {city.z_moyen}
            m
          </Tag>
          )}
          {city.match && (
          <Tag>
            Correspond à
            {' '}
            {Math.floor(city.match)}
            %
          </Tag>
          )}
          {city['region.new_name'] && <Tag>{ucFirst(city['region.new_name'].toLowerCase())}</Tag>}
        </TagsBlock>
      </InformationsBlock>
    </Wrapper>
  )
}

CityItem.propTypes = {
  city: PropTypes.object.isRequired
}

CityItem.defaultProps = {
}

export default CityItem
