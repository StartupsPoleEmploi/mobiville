import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'
import {
  COLOR_SECONDARY, COLOR_BACKGROUND, COLOR_GRAY
} from '../../constants/colors'
import { useCities } from '../../common/contexts/citiesContext'
import { ucFirstOnly } from '../../utils/utils'

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
  width: 25%;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 92px;

  .material-icons {
    color: ${COLOR_SECONDARY};
    margin-bottom: 6px;
  }

  .image-block {
    margin-bottom: 6px;
  }

  .title {
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

const ElementLine = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${COLOR_BACKGROUND};
  border-radius: 4px;

  .material-icons {
    color: ${COLOR_SECONDARY};
    margin-right: 8px;
    background-color: ${COLOR_GRAY};
    border-radius: 4px;
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
  }

  .image-block {
    margin-right: 8px;
    background-color: ${COLOR_GRAY};
    border-radius: 4px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title {
    font-weight: 500;
    font-size: 12px;
    flex: 1;
  }

  .details {
    font-size: 14px;
    font-weight: 700;
  }
`

const PanelCityLife = ({ city }) => {
  const { onGetCityAmenities, cityAmenities } = useCities()
  const size = useWindowSize()

  useEffect(() => {
    if (city && city.insee_com) {
      onGetCityAmenities(city.insee_com)
    }
  }, [city])

  let transports = []
  let culture = []
  let health = []
  let services = []
  if (cityAmenities) {
    const findTransport = cityAmenities.find((k) => k.key === 'transport')
    if (findTransport) {
      transports = findTransport.tab
    }

    const findCulture = cityAmenities.find((k) => k.key === 'culture')
    if (findCulture) {
      culture = findCulture.tab
    }

    const findHealth = cityAmenities.find((k) => k.key === 'health')
    if (findHealth) {
      health = findHealth.tab
    }

    const findServices = cityAmenities.find((k) => k.key === 'services')
    if (findServices) {
      services = findServices.tab
    }
  }

  return (
    <>
      {!isMobileView(size) && (
      <MainLayout>
        <div>
          <ItemLayout>
            <ItemTitleLayout>
              Description de la ville
            </ItemTitleLayout>
            <ItemContentLayout>
              {(city.description || '').replace(/\((.*?)\)/gim, '').replace(/\[(.*?)\]/gim, '')}
            </ItemContentLayout>
          </ItemLayout>

          {transports.length > 0 && (
          <ItemLayout>
            <ItemTitleLayout>
              Transports à proximité
            </ItemTitleLayout>
            <ItemContentLayout>
              {transports.map((t) => (
                <ElementLine key={t.label}>
                  <div className="image-block"><img src={`/icons/${t.icon}`} alt={t.label} /></div>
                  <p className="title">
                    {t.label}
                    {' '}
                    de
                    {' '}
                    {ucFirstOnly(city.nom_comm)}
                  </p>
                  <p className="details">{t.total}</p>
                </ElementLine>
              ))}
            </ItemContentLayout>
          </ItemLayout>
          )}

          {health.length > 0 && (
          <ItemLayout>
            <ItemTitleLayout>
              Santé
            </ItemTitleLayout>
            <ItemContentLayout>
              {health.map((t) => (
                <ElementObject key={t.label}>
                  <div className="image-block"><img src={`/icons/${t.icon}`} alt={t.label} /></div>
                  <p className="title">
                    {t.label}
                  </p>
                  <p className="details">{t.total}</p>
                </ElementObject>
              ))}
            </ItemContentLayout>
          </ItemLayout>
          )}
        </div>

        <div>
          {culture.length > 0 && (
          <ItemLayout>
            <ItemTitleLayout>
              Culture & Loisirs
            </ItemTitleLayout>
            <ItemContentLayout>
              {culture.map((t) => (
                <ElementObject key={t.label}>
                  <div className="image-block"><img src={`/icons/${t.icon}`} alt={t.label} /></div>
                  <p className="title">
                    {t.label}
                  </p>
                  <p className="details">{t.total}</p>
                </ElementObject>
              ))}
            </ItemContentLayout>
          </ItemLayout>
          )}

          <ItemLayout>
            <ItemTitleLayout>
              Environnement
            </ItemTitleLayout>
            <ItemContentLayout>
              <ElementLine>
                <i className="material-icons">domain</i>
                <p className="title">
                  Qualité de l
                  {'\''}
                  air moyenne
                </p>
                <p className="details">A venir</p>
              </ElementLine>
              <ElementLine>
                <i className="material-icons">domain</i>
                <p className="title">Parcs et jardins</p>
                <p className="details">A venir</p>
              </ElementLine>
            </ItemContentLayout>
          </ItemLayout>

          {services.length > 0 && (
          <ItemLayout>
            <ItemTitleLayout>
              Services
            </ItemTitleLayout>
            <ItemContentLayout>
              {services.map((t) => (
                <ElementObject key={t.label}>
                  <div className="image-block"><img src={`/icons/${t.icon}`} alt={t.label} /></div>
                  <p className="title">
                    {t.label}
                  </p>
                  <p className="details">{t.total}</p>
                </ElementObject>
              ))}
            </ItemContentLayout>
          </ItemLayout>
          )}
        </div>
      </MainLayout>
      )}
      {isMobileView(size) && (
      <MainLayoutMobile>
        <ItemLayoutMobile>
          <ItemTitleLayout>
            Description de la ville
          </ItemTitleLayout>
          <ItemContentLayout>
            {(city.description || '').replace(/\((.*?)\)/gim, '').replace(/\[(.*?)\]/gim, '')}
          </ItemContentLayout>
        </ItemLayoutMobile>

        {culture.length > 0 && (
          <ItemLayoutMobile>
            <ItemTitleLayout>
              Culture & Loisirs
            </ItemTitleLayout>
            <ItemContentLayout>
              {culture.map((t) => (
                <ElementObject key={t.label}>
                  <div className="image-block"><img src={`/icons/${t.icon}`} alt={t.label} /></div>
                  <p className="title">
                    {t.label}
                  </p>
                  <p className="details">{t.total}</p>
                </ElementObject>
              ))}
            </ItemContentLayout>
          </ItemLayoutMobile>
        )}

        {transports.length > 0 && (
        <ItemLayoutMobile>
          <ItemTitleLayout>
            Transports à proximité
          </ItemTitleLayout>
          <ItemContentLayout>
            {transports.map((t) => (
              <ElementLine key={t.label}>
                <div className="image-block"><img src={`/icons/${t.icon}`} alt={t.label} /></div>
                <p className="title">
                  {t.label}
                  {' '}
                  de
                  {' '}
                  {ucFirstOnly(city.nom_comm)}
                </p>
                <p className="details">{t.total}</p>
              </ElementLine>
            ))}
          </ItemContentLayout>
        </ItemLayoutMobile>
        )}

        {health.length > 0 && (
        <ItemLayoutMobile>
          <ItemTitleLayout>
            Santé
          </ItemTitleLayout>
          <ItemContentLayout>
            {health.map((t) => (
              <ElementObject key={t.label}>
                <div className="image-block"><img src={`/icons/${t.icon}`} alt={t.label} /></div>
                <p className="title">
                  {t.label}
                </p>
                <p className="details">{t.total}</p>
              </ElementObject>
            ))}
          </ItemContentLayout>
        </ItemLayoutMobile>
        )}

        {services.length > 0 && (
        <ItemLayoutMobile>
          <ItemTitleLayout>
            Services
          </ItemTitleLayout>
          <ItemContentLayout>
            {services.map((t) => (
              <ElementObject key={t.label}>
                <div className="image-block"><img src={`/icons/${t.icon}`} alt={t.label} /></div>
                <p className="title">
                  {t.label}
                </p>
                <p className="details">{t.total}</p>
              </ElementObject>
            ))}
          </ItemContentLayout>
        </ItemLayoutMobile>
        )}
      </MainLayoutMobile>
      )}
    </>
  )
}

PanelCityLife.propTypes = {
  city: PropTypes.object.isRequired
}

PanelCityLife.defaultProps = {
}

export default PanelCityLife
