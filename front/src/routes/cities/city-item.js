import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Typography } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import { formatNumber, ucFirst } from '../../utils/utils'
import {
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_TEXT_PRIMARY,
} from '../../constants/colors'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'
import redMarker from '../../assets/images/marker-red.png'

const Wrapper = styled.div`
  margin-top: 16px;
  margin-bottom: ${(props) => (props.isMobile ? '16px' : '32px')};
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
  align-items: ${(props) => (props.isMobile ? 'stretch' : 'center')};
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12),
    0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
`

const Title = styled(Typography)`
  && {
    font-weight: bold;
    margin-bottom: 9px;
    font-size: 18px;
    display: flex;
    align-items: center;
  }
`

const SelectedMarkerImg = styled.img`
  width: 12px;
  height: auto;
  margin-left: 8px;
`

const Image = styled.div`
  min-height: ${(props) => (props.isMobile ? '172px' : '160px')};
  border-top-left-radius: ${(props) => (props.isMobile ? '8px' : '8px')};
  border-top-right-radius: ${(props) => (props.isMobile ? '8px' : '0')};
  border-bottom-left-radius: ${(props) => (props.isMobile ? '0' : '8px')};
  margin-bottom: ${(props) => (props.isMobile ? '16px' : '0')};
  align-self: stretch;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: ${(props) => (props.isMobile ? '100%' : '248px')};
  min-width: ${(props) => (props.isMobile ? 'auto' : '248px')};0
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
  padding: 3px 6px;
  font-size: 12px;
  font-weight: 500;
  margin-right: 8px;
  margin-bottom: 8px;
  color: ${COLOR_TEXT_PRIMARY};
  background: ${COLOR_GRAY};
`

const InformationsBlock = styled.div`
  padding: 16px;
  width: 100%;
`

const ViewMore = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${COLOR_PRIMARY};
  margin-top: 12px;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const CityItem = ({ city, selected }) => {
  const size = useWindowSize()

  if (!city) {
    return <div />
  }

  let { photo } = city
  if (photo) {
    if (photo.indexOf('.svg') === -1) {
      photo = photo.replace('/commons/', '/commons/thumb/')
      const split = photo.split('/')
      photo += `/250px-${split[split.length - 1]}`
    }
  } else {
    photo = `/regions/region-${city['region.new_code']}.jpg`
  }

  return (
    <Wrapper isMobile={isMobileView(size)}>
      <Image
        style={{ backgroundImage: `url(${photo})` }}
        isMobile={isMobileView(size)}
      />
      <InformationsBlock>
        <Title>
          {ucFirst(city.nom_comm.toLowerCase())}
          {selected && <SelectedMarkerImg src={redMarker} alt="" />}
        </Title>
        <Description>
          {(city.description || '').replace('Écouter', '')}
        </Description>
        <TagsBlock>
          {city.distance_from_sea !== null && city.distance_from_sea <= 10 && (
            <Tag>
              Mer
              {' < '}
              10km
            </Tag>
          )}
          {city.distance_from_sea !== null &&
            city.distance_from_sea > 10 &&
            city.distance_from_sea <= 20 && (
              <Tag>
                Mer
                {' < '}
                20km
              </Tag>
            )}
          {city.distance_from_sea !== null &&
            city.distance_from_sea > 20 &&
            city.distance_from_sea <= 30 && (
              <Tag>
                Mer
                {' < '}
                30km
              </Tag>
            )}
          {city.city_size_label && <Tag>{city.city_size_label}</Tag>}
          {city.population && (
            <Tag>{formatNumber(city.population * 1000)} habitants</Tag>
          )}
          {city.z_moyen && <Tag>Altitude moyenne {city.z_moyen}m</Tag>}
          {city['region.new_name'] && (
            <Tag>{ucFirst(city['region.new_name'].toLowerCase())}</Tag>
          )}
        </TagsBlock>
        <ViewMore>
          En savoir plus
          <ArrowForwardIcon fontSize="small" style={{ marginLeft: 8 }} />
        </ViewMore>
      </InformationsBlock>
    </Wrapper>
  )
}

CityItem.propTypes = {
  city: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
}

CityItem.defaultProps = {}

export default CityItem
