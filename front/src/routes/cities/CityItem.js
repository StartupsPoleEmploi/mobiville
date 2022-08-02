import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Typography } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import { formatNumber, ucFirst } from '../../utils/utils'
import {
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_TAG_GREEN,
  COLOR_TAG_RED,
  COLOR_TEXT_PRIMARY,
} from '../../constants/colors'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'
import redMarker from '../../assets/images/marker-red.png'

const CityLink = styled(Link)`
  display: flex;
  margin-top: 16px;
  margin-bottom: ${(props) => (props.isMobile ? '16px' : '32px')};
  flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
  align-items: ${(props) => (props.isMobile ? 'stretch' : 'center')};
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e4e9ed;
  color: inherit;
  text-decoration: none;

  &:hover,
  &:focus {
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12),
      0px 1px 3px rgba(0, 0, 0, 0.2);
    color: inherit;
  }
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
  border-top-left-radius: 8px;
  border-top-right-radius: ${(props) => (props.isMobile ? '8px' : '0')};
  border-bottom-left-radius: ${(props) => (props.isMobile ? '0' : '8px')};
  align-self: stretch;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: ${(props) => (props.isMobile ? '100%' : '160px')};
  min-width: ${(props) => (props.isMobile ? 'auto' : '160px')};
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
  border-radius: 8px;
  padding: 4px 6px;
  font-size: 12px;
  font-weight: 500;
  margin-right: 8px;
  margin-bottom: 8px;
  color: ${({ isUsingFilter }) =>
    isUsingFilter ? COLOR_PRIMARY : COLOR_TEXT_PRIMARY};
  background: ${(props) => (props.color ? props.color : COLOR_GRAY)};
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

const CityItem = ({
  city,
  selected,
  isUsingSeaFilter,
  isUsingCitySizeFilter,
  isUsingMountainFilter,
  isUsingRegionFilter,
  onMouseOver,
  onMouseLeave,
  itemRef,
  to,
}) => {
  const size = useWindowSize()

  if (!city) {
    return <div />
  }

  let { photo } = city
  if (photo) {
    photo = photo.replace('/2000px', '/500px')
  } else {
    photo = `/regions/region-${city?.newRegion?.code}.jpg`
  }

  const formatCityTension = (tension) => {
    if (tension < 4) {
      return "Opportunités d'emploi"
    }
    return "Peu d'opportunités d'emploi"
  }

  const topTags = [
    {
      isPrioritary: true,
      node: city['bassin.tensions.ind_t'] && (
        <Tag isUsingFilter={true} color={city['bassin.tensions.ind_t'] < 4 ? COLOR_TAG_GREEN : COLOR_TAG_RED} key="tension">
          {formatCityTension(city['bassin.tensions.ind_t'])}
        </Tag>
      ),
    }
  ]

  const bottomTags = [
    {
      isPrioritary: isUsingRegionFilter,
      node: city?.newRegion?.name && (
        <Tag isUsingFilter={isUsingRegionFilter} key="region">
          {ucFirst(city.newRegion.name.toLowerCase())}
        </Tag>
      ),
    },
    {
      isPrioritary: false,
      node: city.totalOffres && (
          <Tag >
            {city.totalOffres} offre{city.totalOffres > 0 ? "s" : ""} d'emploi
          </Tag>
      ),
    },
    {
      isPrioritary: isUsingCitySizeFilter,
      node: city.population && (
        <Tag isUsingFilter={isUsingCitySizeFilter} key="citysize">
          {formatNumber(city.population * 1000)} habitants
        </Tag>
      ),
    },
  ].sort((a) => (a.isPrioritary ? -1 : 1))

  return (
    <CityLink
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      ref={itemRef}
      to={to}
      isMobile={isMobileView(size)}
    >
      <Image
        style={{ backgroundImage: `url(${photo})` }}
        isMobile={isMobileView(size)}
      />
      <InformationsBlock>
        <TagsBlock>{topTags.map(({ node }) => node)}</TagsBlock>
        <Title>
          {ucFirst(city.nom_comm.toLowerCase())}
          {selected && <SelectedMarkerImg src={redMarker} alt="" />}
        </Title>
        <Description>
          {(city.description || '').replace('Écouter', '')}
        </Description>
        <TagsBlock>{bottomTags.map(({ node }) => node)}</TagsBlock>
        <ViewMore>
          En savoir plus
          <ArrowForwardIcon fontSize="small" style={{ marginLeft: 8 }} />
        </ViewMore>
      </InformationsBlock>
    </CityLink>
  )
}

CityItem.propTypes = {
  city: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  isUsingRegionFilter: PropTypes.bool.isRequired,
  isUsingCitySizeFilter: PropTypes.bool.isRequired,
  isUsingSeaFilter: PropTypes.bool.isRequired,
  isUsingMountainFilter: PropTypes.bool.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  ref: PropTypes.func.isRequired,
  to: PropTypes.string.isRequired,
}

CityItem.defaultProps = {}

export default CityItem
