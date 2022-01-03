import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import { useCities } from '../../common/contexts/citiesContext'
import { COLOR_GRAY } from '../../constants/colors'
import { formatNumber, ucFirstOnly } from '../../utils/utils'
import { useScroll } from '../../common/hooks/use-scroll'

import compass from '../../assets/images/icons/compass.svg'
import crowd from '../../assets/images/icons/crowd.svg'
import weather from '../../assets/images/icons/weather.svg'

const Container = styled.div`
  background-color: #fff;
  padding-top: ${(props) => (props.isMobile ? '0' : '72px')};
  z-index: 1;
  border-bottom: 1px ${COLOR_GRAY} solid;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PicAndMapContainer = styled.div`
  display: flex;
  height: 224px;
  max-width: 1040px;
  width: 100%;
`

const CityPic = styled.img.attrs({ alt: '' })`
  max-width: ${({ isMobile }) => (isMobile ? 'auto' : '336px')};
  width: 100%;
  height: 224px;
  border-radius: 8px;
  object-fit: cover;
`

const TitlesContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
`

const StyledMapContainer = styled(MapContainer)`
  height: 224px;
  max-width: 688px;
  width: 100%;
  margin-left: 16px;
  border-radius: 8px;
`

const CityName = styled.h1`
  height: ${(props) => (props.fixedView ? '78px' : '46px')};
  line-height: ${(props) => (props.fixedView ? '100px' : '46px')};
  font-weight: 500;
  font-size: 24px;
  margin-top: 0;
  margin-bottom: 0;
`

const RegionName = styled.h2`
  height: 17px;
  font-size: 12px;
  position: relative;
  top: 10px;
  font-weight: normal;
  margin: 0;
  padding: 0;
`

const NameMobile = styled.p`
  && {
    height: 46px;
    line-height: 41px;
    font-weight: 500;
    font-size: 24px;
    text-align: center;
    margin-top: 0;
    margin-bottom: 0;
  }
`

const TitleAndStatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  max-width: 1040px;
  width: 100%;
`

const StatsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 266px;
`

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  font-size: 10px;
`

const FixedLayout = styled.div`
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(0, 0, 0, 0.12),
    0px 1px 5px rgba(0, 0, 0, 0.2);
  background-color: white;
  position: fixed;
  top: 76px;
  left: 0;
  right: 0;
  height: 124px;
  z-index: 10;
`

const FixedLayoutMobile = styled.div`
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(0, 0, 0, 0.12),
    0px 1px 5px rgba(0, 0, 0, 0.2);
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 92px;
  z-index: 10;
`

const ArrowBackOutlinedIconDesktopSmall = styled(ArrowBackOutlinedIcon)`
  position: absolute;
  top: 36px;
  cursor: pointer;
`

const ArrowBackOutlinedIconMobileSmall = styled(ArrowBackOutlinedIcon)`
  position: absolute;
  left: 20px;
  top: 11px;
  cursor: pointer;
`

const BackLine = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: ${(props) => (props.isMobile ? '100%' : '95%')};
  max-width: 1024px;
  position: relative;
`

const CityHeader = ({ isMobile }) => {
  const { city } = useCities()
  const { scrollY } = useScroll()
  const history = useHistory()

  const onBack = () => {
    history.push({
      pathname: '/cities',
      search: localStorage.getItem('lastSearch'),
    })
  }

  return (
    <>
      <Container isMobile={isMobile}>
        <PicAndMapContainer>
          <CityPic
            isMobile={isMobile}
            src={city.photo || `/regions/region-${city['region.new_code']}.jpg`}
          />
          {!isMobile && city && (
            <StyledMapContainer
              center={[city.geo_point_2d_x, city.geo_point_2d_y]}
              zoom={8}
              scrollWheelZoom
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={[city.geo_point_2d_x, city.geo_point_2d_y]} />
            </StyledMapContainer>
          )}
        </PicAndMapContainer>

        <TitleAndStatsContainer>
          <TitlesContainer>
            <CityName>{ucFirstOnly(city.nom_comm)}</CityName>
            <RegionName>{ucFirstOnly(city['oldRegion.new_name'])}</RegionName>
          </TitlesContainer>

          <StatsContainer isMobile={isMobile}>
            <Stats>
              <img src={crowd} alt="" />
              Habitants <br />
              <b>{formatNumber(city.population * 1000)}</b>
            </Stats>

            <Stats>
              <img src={weather} alt="" />
              Température
              <br />
              <b>{Math.floor(city.average_temperature)}°</b>
            </Stats>

            <Stats>
              <img src={compass} alt="" />
              Démarrer mon projet
              <br />
              <Link
                to="/mobility-guide"
                style={{ fontWeight: 500, textDecoration: 'underline' }}
              >
                Accéder au guide
              </Link>
            </Stats>
          </StatsContainer>
        </TitleAndStatsContainer>
      </Container>

      {scrollY >= 296 &&
        (isMobile ? (
          <FixedLayoutMobile>
            <BackLine isMobile={isMobile}>
              <ArrowBackOutlinedIconMobileSmall onClick={onBack} />
            </BackLine>
            <NameMobile fixedView>{ucFirstOnly(city.nom_comm)}</NameMobile>
          </FixedLayoutMobile>
        ) : (
          <FixedLayout>
            <BackLine>
              <ArrowBackOutlinedIconDesktopSmall onClick={onBack} />
            </BackLine>
            <CityName fixedView>{ucFirstOnly(city.nom_comm)}</CityName>
          </FixedLayout>
        ))}
    </>
  )
}

export default CityHeader

CityHeader.propTypes = {
  isMobile: PropTypes.bool.isRequired,
}

CityHeader.defaultProps = {}
