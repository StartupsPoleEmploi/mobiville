import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import loadable from '@loadable/component'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Card from '@mui/material/Card'

import { COLOR_PRIMARY, COLOR_WHITE } from '../../../../constants/colors'
import { formatNumber } from '../../../../utils/utils'
import { ReactComponent as BuildingIcon } from '../../../../assets/images/icons/building.svg'
import { Image, KeyFigures, Tag } from '../../../../components'
import { useDevice } from '../../../../common/contexts'

//prettier-ignore
const HousingSimulator = loadable(() => import('./HousingSimulator'))

const HousingMetrics = styled.div`
  display: flex;
  color: ${COLOR_PRIMARY};
  width: 100%;
  flex-direction: column;
  margin-bottom: 40px;
`

const MetricsTitle = styled.p`
  vertical-align: middle;
  height: 48px;
  line-height: 48px;
  span {
    font-weight: 900;
    font-size: 45px;
  }
`

const TagsContainer = styled.div`
  margin: 28px auto;
`

const HousingSearchContainer = styled.div`
  max-width: 888px;
  margin: ${({ $isMobile }) => ($isMobile ? '0 21px' : '0 8px')};

  display: flex;
  flex-wrap: wrap;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'row' : 'column')};
  gap: 15px;
`

const HousingActorsContainer = styled.div`
  flex: 1 1 100%;

  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  gap: 0px 16px;

  color: ${COLOR_PRIMARY};
`

const HousingActorHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  gap: 10px;

  color: ${COLOR_PRIMARY};
`

const HousingActor = styled(Card)`
  padding: ${({ $isMobile }) => ($isMobile ? '25px 30px' : '25px 35px')};
  flex: auto;
  width: ${({ $isMobile }) => ($isMobile ? '100%' : 'calc(50% - 8px)')};
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  gap: 8px;

  box-shadow: unset;
  margin-bottom: 15px;
  border-radius: 4px;
  background: ${COLOR_WHITE};
`

const HousingActorTitle = styled.div`
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  color: ${COLOR_PRIMARY};
`

const HousingActorDescription = styled.div`
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: ${COLOR_PRIMARY};
`

const HousingActorLink = styled.a`
  height: 19px;
  align-self: center;

  font-weight: 700;
  font-size: 16px;
  line-height: 19px;

  text-decoration-line: underline;

  color: ${COLOR_PRIMARY};

  & > svg {
    vertical-align: bottom;
  }
`
const ContainerHeader = styled.h3`
  width: 100%;

  margin: 0px;
  font-weight: 900;
  font-size: 24px;
  line-height: 36px;
  color: ${COLOR_PRIMARY};
`

const HousingActorImage = styled(Image)`
  max-height: 70px;
  max-width: 100%;
  align-self: center;
`

const CityHousingSection = ({ city }) => {
  const { isMobile } = useDevice()

  return (
    <>
      <HousingMetrics $isMobile={isMobile}>
        <TagsContainer>
          <Tag green={!city.city_house_tension} size="tall">
            {!!city?.city_house_tension
              ? "Tension immobilière a l'achat"
              : "Pas de tension immobilière a l'achat"}
          </Tag>
        </TagsContainer>

        <KeyFigures
          figures={[
            {
              label: 'Prix d’achat moyen/m2',
              data: city?.buy_m2 || city?.departement?.buy_m2
                ? `${formatNumber(city?.buy_m2 ?? city?.departement?.buy_m2)}€`
                : 'A venir',
              icon: <BuildingIcon />,
            },
            {
              label: 'Loyer moyen en location',
              data:
                city.rent_t2 || city?.departement?.rent_m2
                  ? `${formatNumber(
                      city.rent_t2 ?? city?.departement?.rent_m2 * 45
                    )}€`
                  : 'A venir',
              icon: (
                <MetricsTitle className="metrics-title">
                  <span>2</span> pièces
                </MetricsTitle>
              ),
            },
            {
              label: 'Loyer moyen en location',
              data:
                city.rent_t4 || city?.departement?.rent_m2
                  ? `${formatNumber(
                      city.rent_t4 ?? city?.departement?.rent_m2 * 80
                    )}€`
                  : 'A venir',
              icon: (
                <MetricsTitle className="metrics-title">
                  <span>4</span> pièces
                </MetricsTitle>
              ),
            },
          ]}
        />
      </HousingMetrics>

      <HousingSearchContainer $isMobile={isMobile}>
        {(!!city?.rent_m2 || !!city?.departement?.rent_m2 || !!city?.buy_m2 || !!city?.departement?.buy_m2) && (
          <>
            <ContainerHeader>
              Calculez votre budget pour un achat ou une location
            </ContainerHeader>
            <HousingSimulator city={city} />
          </>
        )}

        <HousingActorsContainer $isMobile={isMobile}>
          <ContainerHeader>Faites vos demandes de logement</ContainerHeader>

          <HousingActor $isMobile={isMobile}>
            <HousingActorHeader>
              <HousingActorImage
                src="logo-logement-social"
                alt="Ma demande de logement social"
              />
              <Tag green size="normal">
                Salarié - Demandeur d'emploi
              </Tag>
            </HousingActorHeader>
            <div>
              <HousingActorTitle>Demandez un logement social</HousingActorTitle>
              <HousingActorDescription>
                Pour obtenir un logement social (ou logement HLM), vous devez
                faire votre demande en ligne ou sur place (au guichet) et
                obtenir un numéro unique de demande de logement social (NUR/NUD)
              </HousingActorDescription>
            </div>
            <HousingActorLink
              href="https://www.actionlogement.fr/le-logement-social"
              target="_blank"
            >
              Créez ma demande de logement <ArrowForwardIcon />
            </HousingActorLink>
          </HousingActor>
          <HousingActor $isMobile={isMobile}>
            <HousingActorHeader>
              <HousingActorImage
                src="logo-ALin"
                alt="AL'in.fr offres de logement"
              />
              <Tag green size="normal">
                Salarié
              </Tag>
            </HousingActorHeader>
            <div>
              <HousingActorTitle>Offres de logement</HousingActorTitle>
              <HousingActorDescription>
                Consultez la plateforme d'offres de logements liées à votre
                situation
              </HousingActorDescription>
            </div>
            <HousingActorLink href="https://al-in.fr/" target="_blank">
              Recherchez des logements <ArrowForwardIcon />
            </HousingActorLink>
          </HousingActor>
        </HousingActorsContainer>
      </HousingSearchContainer>
    </>
  )
}

CityHousingSection.propTypes = {
  city: PropTypes.object.isRequired,
}

export default CityHousingSection
