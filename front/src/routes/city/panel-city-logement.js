import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'
import {
  COLOR_SECONDARY, COLOR_TEXT_SECONDARY, COLOR_RED, COLOR_GREEN
} from '../../constants/colors'
import { useCities } from '../../common/contexts/citiesContext'

const MainLayout = styled.div`
  display: flex;
  margin: auto;
  width: fit-content;

  > div {
    width: 50%;
  }
`

const ItemLayout = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  margin: auto;
  width: 100%;
  width: 336px;
  max-width: 336px;
  padding: 16px;
  margin-bottom: 16px;
  margin-left: 8px;
  margin-right: 8px;
`

const MainLayoutMobile = styled.div`
  padding-bottom: 130px;
`

const ItemLayoutMobile = styled.div`
  background: #FFFFFF;
  width: 100%;
  padding: 16px;
  margin-bottom: 1px;
`

const ItemContentLayout = styled.div`

`

const ItemTitleLayout = styled.div`
  font-weight: bold;
  font-size: 14px;
  padding-bottom: 16px;
`

const ElementObject = styled.div`
  width: 50%;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 138px;

  .material-icons {
    color: ${COLOR_SECONDARY};
    margin-bottom: 6px;
  }

  .title {
    font-weight: bold;
    font-size: 12px;
    margin-bottom: 4px;
    margin-top: 0;
    text-align: center;
  }

  .sub-title {
    font-size: 10px;
    margin-top: 0;
    margin-bottom: 0;
  }

  .details {
    font-size: 14px;
    font-weight: 700;
    margin-top: 0;
  }
`

const Tag = styled.div`
  line-height: 32px;
  height: 32px;
  width: 54px;
  text-align: center;
  border-radius: 32px;
  background-color: ${(props) => (props.isRed ? COLOR_RED : COLOR_GREEN)};
  color: white;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
`

const PanelCityLogement = ({ city }) => {
  const { onGetCityTenement, cityTenement } = useCities()
  const size = useWindowSize()

  useEffect(() => {
    if (city && city.insee_com) {
      onGetCityTenement(city.insee_com)
    }
  }, [city])

  return (
    <>
      {!isMobileView(size) && (
      <MainLayout>
        <div>
          <ItemLayout>
            <ItemTitleLayout>
              Prix des logements
            </ItemTitleLayout>
            <ItemContentLayout>
              <ElementObject>
                <i className="material-icons">home</i>
                <p className="title">Achat</p>
                <p className="sub-title">Prix au m2 moyen</p>
                <p className="details">{city && city.average_houseselled ? `${city.average_houseselled}€` : 'A venir'}</p>
              </ElementObject>
              <ElementObject>
                <i className="material-icons">location_city</i>
                <p className="title">Location</p>
                <p className="sub-title">loyer au m2 moyen</p>
                <p className="details">{city && city.average_houserent ? `${city.average_houserent.toFixed(2)}€` : 'A venir'}</p>
              </ElementObject>
            </ItemContentLayout>
          </ItemLayout>

          <ItemLayout>
            <ItemTitleLayout>
              Logements sociaux
            </ItemTitleLayout>
            <ItemContentLayout>
              <ElementObject>
                <i className="material-icons">domain</i>
                <p className="title">Nombre de logements dans la région</p>
                <p className="details">{cityTenement && cityTenement.nbSocialHousing ? cityTenement.nbSocialHousing : 'A venir'}</p>
              </ElementObject>
              <ElementObject>
                <i className="material-icons" style={{ color: COLOR_TEXT_SECONDARY }}>access_time</i>
                <p className="title">
                  Délais d
                  {'\''}
                  obtention moyen dans la région
                </p>
                <p className="details">{city && city['region.average_delay_obtain_social_housing'] ? `${city['region.average_delay_obtain_social_housing']} jours` : 'A venir'}</p>
              </ElementObject>
            </ItemContentLayout>
          </ItemLayout>
        </div>

        <div>
          <ItemLayout>
            <ItemTitleLayout>
              Tension immobilière
            </ItemTitleLayout>
            <ItemContentLayout>
              <Tag isRed={city && city.city_house_tension}>{city && city.city_house_tension ? 'Oui' : 'Non'}</Tag>
              <p>
                <b>
                  Il y a
                  {' '}
                  {city && city.city_house_tension ? 'plus' : 'moins'}
                  {' '}
                  d
                  {'\''}
                  acheteurs que de biens à vendre.
                </b>
              </p>
              <p>
                L
                {'\''}
                Indicateur de Tension Immobilière (ITI) permet de comprendre l
                {'\''}
                impact sur le marché immobilier dans les 6 prochains mois grâce
                au rapport entre le nombre d
                {'\''}
                acheteurs et le nombre de biens à vendre.
              </p>
            </ItemContentLayout>
          </ItemLayout>
        </div>
      </MainLayout>
      )}
      {isMobileView(size) && (
      <MainLayoutMobile>
        <ItemLayoutMobile>
          <ItemTitleLayout>
            Prix des logements
          </ItemTitleLayout>
          <ItemContentLayout>
            <ElementObject>
              <i className="material-icons">home</i>
              <p className="title">Achat</p>
              <p className="sub-title">Prix au m2 moyen</p>
              <p className="details">{city && city.average_houseselled ? `${city.average_houseselled.toFixed(2)}€` : 'A venir'}</p>
            </ElementObject>
            <ElementObject>
              <i className="material-icons">location_city</i>
              <p className="title">Location</p>
              <p className="sub-title">loyer au m2 moyen</p>
              <p className="details">{city && city.average_houserent ? `${city.average_houserent.toFixed(2)}€` : 'A venir'}</p>
            </ElementObject>
          </ItemContentLayout>
        </ItemLayoutMobile>

        <ItemLayoutMobile>
          <ItemTitleLayout>
            Tension immobilière
          </ItemTitleLayout>
          <ItemContentLayout>
            <Tag isRed={city && city.city_house_tension}>{city && city.city_house_tension ? 'Oui' : 'Non'}</Tag>
            <p>
              <b>
                Il y a
                {' '}
                {city && city.city_house_tension ? 'plus' : 'moins'}
                {' '}
                d
                {'\''}
                acheteurs que de biens à vendre.
              </b>
            </p>
            <p>
              L
              {'\''}
              Indicateur de Tension Immobilière (ITI) permet de comprendre l
              {'\''}
              impact sur le marché immobilier dans les 6 prochains mois grâce
              au rapport entre le nombre d
              {'\''}
              acheteurs et le nombre de biens à vendre.
            </p>
          </ItemContentLayout>
        </ItemLayoutMobile>

        <ItemLayoutMobile>
          <ItemTitleLayout>
            Logements sociaux
          </ItemTitleLayout>
          <ItemContentLayout>
            <ElementObject>
              <i className="material-icons">domain</i>
              <p className="title">Nombre de logements dans la région</p>
              <p className="details">{cityTenement && cityTenement.nbSocialHousing ? cityTenement.nbSocialHousing : 'A venir'}</p>
            </ElementObject>
            <ElementObject>
              <i className="material-icons" style={{ color: COLOR_TEXT_SECONDARY }}>access_time</i>
              <p className="title">
                Délais d
                {'\''}
                obtention moyen dans la région
              </p>
              <p className="details">{city && city['region.average_delay_obtain_social_housing'] ? `${city['region.average_delay_obtain_social_housing']} jours` : 'A venir'}</p>
            </ElementObject>
          </ItemContentLayout>
        </ItemLayoutMobile>
      </MainLayoutMobile>
      )}
    </>
  )
}

PanelCityLogement.propTypes = {
  city: PropTypes.object.isRequired
}

PanelCityLogement.defaultProps = {
}

export default PanelCityLogement
