import loadable from '@loadable/component'
import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled, { css } from 'styled-components'

import { ReactComponent as CalculatorIcon } from '../../assets/images/icons/calculator.svg'
import { ReactComponent as CrowdIcon } from '../../assets/images/icons/crowd.svg'
import { ReactComponent as HandshakeIcon } from '../../assets/images/icons/handshake.svg'
import { ReactComponent as MaletteIcon } from '../../assets/images/icons/malette.svg'
import { ReactComponent as RightChevronIcon } from '../../assets/images/icons/right_chevron.svg'

import { useDevice } from '../../common/contexts'
import {
  BackButton,
  KeyFigures,
  MainLayout,
  Map,
  SectionTitle,
  TopPageButton,
  TopJobs,
} from '../../components'
import { COLOR_PRIMARY, COLOR_WHITE } from '../../constants/colors'
import { formatNumber, wordsCapitalize } from '../../utils/utils'

const TopCities = loadable(() => import('./components/TopCities'))

const WelcomeContainer = styled.div`
  max-width: 1040px;
  display: flex;
  flex-wrap: wrap;
  margin: ${({ $isMobile }) => ($isMobile ? 'auto' : '0 auto')};
  padding: ${({ $isMobile }) =>
    $isMobile ? '1px 16px 16px 16px' : '1px 0 60px 0'};

  background: ${COLOR_WHITE};
  color: ${COLOR_PRIMARY};

  box-shadow: 0px 0px 0px 100vw ${COLOR_WHITE};
  -webkit-box-shadow: 0px 0px 0px 100vw ${COLOR_WHITE};
  -moz-box-shadow: 0px 0px 0px 100vw ${COLOR_WHITE};
  clip-path: polygon(-100vw 0, 100vw 0, 100vw 100%, -100vw 100%);
`

const Title = styled.h1`
  margin-top: ${({ $isMobile }) => ($isMobile ? '30px' : '0px')};
  margin-bottom: 0px;
  font-weight: 900;

  width: ${({ $isMobile }) => ($isMobile ? '100%' : '')};
  font-size: ${({ $isMobile }) => ($isMobile ? '24px' : '36px')};
`

const InfoContainer = styled.div`
  width: ${({ $isMobile }) => ($isMobile ? '100%' : '55%')};
`
const NotWrappableText = styled.span`
  white-space: nowrap;
`

const TextContainer = styled.div`
  position: relative;

  max-height: ${({ $showFullText }) => ($showFullText ? 'none' : '255px')};
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: space-between;
`
const MapContainer = styled.div`
  flex: ${({ $isMobile }) => ($isMobile ? 'unset' : '1')};
  margin-top: ${({ $isMobile }) => ($isMobile ? '15px' : '75px')};
  height: ${({ $isMobile }) => ($isMobile ? '255px' : 'auto')};
  width: 100%;
`

const Description = styled.p`
  margin: 0;
  overflow: hidden;
  margin-right: 35px;
  font-size: 18px;
  font-weight: 400;
`

const ReadMore = styled.p`
  cursor: pointer;
  margin: 0;
  flex-shrink: 0;

  color: ${COLOR_PRIMARY};
  font-size: 24px;
  font-weight: 900;
  text-decoration: underline;
`

const ReadMoreText = styled.span`
  font-size: 16px;
  padding-left: 10px;
`

const GridContainer = styled.div`
  max-width: 1072px;
  width: 100%;
  padding: 1px 16px 32px 16px;
  margin: auto;
  overflow-x: ${({ $isMobile }) => ($isMobile ? 'scroll' : 'auto')};

  display: grid;
  grid-auto-rows: 80px;
  gap: 8px 16px;
  ${({ $isMobile }) => ($isMobile ? css`
    grid-template-columns: repeat(2, minmax(80vw, 1fr));
  ` : css`
    grid-template-columns: repeat(2, minmax(max-content, 1fr));
  `)}
`

const GridItem = styled(Link)`
  min-width: 240px;
  padding: 0 30px;

  display: flex;
  align-items: center;

  border-radius: 8px;
  background: ${COLOR_WHITE};

  color: ${COLOR_PRIMARY};
  font-size: 18px;
  font-weight: bold;

  &&:hover {
    box-shadow: 0px 0px 0px 1px ${COLOR_PRIMARY};
    -webkit-box-shadow: 0px 0px 0px 1px ${COLOR_PRIMARY};
    -moz-box-shadow: 0px 0px 0px 1px ${COLOR_PRIMARY};
  }
`

const GridItemTitle = styled.div`
  flex: auto;
`

const Departement = () => {
  const { isMobile } = useDevice()
  const { codeSlug } = useParams()

  const [isTextExpended, setIsTextExpended] = useState(false)
  const [departement, setDepartement] = useState(null)
  const [jobOffers, setJobOffers] = useState()
  const [hiringRate, setHiringRate] = useState()

  const showFullText = useCallback(
    () => isTextExpended || !(departement?.description?.length >= 521),
    [isTextExpended, departement]
  )

  useEffect(() => {
    if (!codeSlug) return
    const [code] = codeSlug.split('-')

    fetch(`/api/departement/${code}`)
      .then((r) => r.json())
      .then((dept) => setDepartement(dept))

    // cas Dom-Tom
    fetch(`/api/departement/${code.length < 2 ? '97' + code : code}/jobs`)
      .then((response) => response.json())
      .then((jobOffers) => setJobOffers(jobOffers))

    fetch(`/api/departement/${code}/hiringRate`)
      .then((response) => response.json())
      .then((hiringRate) => setHiringRate(hiringRate.hiringRate))
  }, [codeSlug])

  if (!departement) return null

  return (
    <MainLayout>
      <WelcomeContainer $isMobile={isMobile}>
        <InfoContainer $isMobile={isMobile}>
          <BackButton
            backLink={
              !!departement?.region
                ? `/region/${departement.region.code}-${departement.region.slug}`
                : '/'
            }
          />
          <Title $isMobile={isMobile}>
            Les opportunités en{' '}
            <NotWrappableText>
              {wordsCapitalize(departement?.name)}
            </NotWrappableText>
          </Title>
          <TextContainer $showFullText={showFullText()}>
            <Description>{departement?.description}</Description>
            <ReadMore
              $isMobile={isMobile}
              onClick={() => setIsTextExpended(!isTextExpended)}
            >
              {departement?.description?.length > 521 &&
                (isTextExpended ? (
                  <>
                    <RightChevronIcon />
                    <ReadMoreText>Réduire le texte</ReadMoreText>
                  </>
                ) : (
                  <>
                    <RightChevronIcon />
                    <ReadMoreText>Lire la suite</ReadMoreText>
                  </>
                ))}
            </ReadMore>
          </TextContainer>
        </InfoContainer>
        <MapContainer $isMobile={isMobile}>
          <Map
            departement={departement}
            isZoomBtnShowed={false}
            style={{
              minHeight: '200px',
              height: '100%',
              width: '100%',
              margin: 0,
              borderRadius: '8px',
            }}
          />
        </MapContainer>
      </WelcomeContainer>

      <KeyFigures
        figures={[
          {
            label: 'Habitants',
            data: formatNumber(departement.population),
            icon: <CrowdIcon />,
          },
          {
            label: 'Superficie',
            data: `${formatNumber(departement.superficie / 100)} km²`,
            icon: <CalculatorIcon />,
          },
          {
            label: "Offres d'emploi",
            data: formatNumber(jobOffers),
            icon: <MaletteIcon />,
          },
          !hiringRate
            ? null
            : {
              label: "Taux d'embauche",
              $isNoWrap: true,
              data: hiringRate > 100 ? '100%' : `${formatNumber(hiringRate)}%`,
              icon: <HandshakeIcon />,
            },
        ]}
      />

      <TopJobs departement={departement}></TopJobs>

      <TopCities departement={departement}></TopCities>

      {departement.region?.departements && (
        <SectionTitle>Autres départements de la région</SectionTitle>
      )}
      <GridContainer $isMobile={isMobile}>
        {departement.region?.departements
          ?.filter((d) => d.code !== departement.code)
          .slice(0, 8)
          .map((dept) => (
            <GridItem
              key={dept.code}
              to={`/departement/${dept.code}-${dept.name}`}
            >
              <GridItemTitle>{wordsCapitalize(dept.name)}</GridItemTitle>
              <RightChevronIcon style={{ margin: 16 }} />
            </GridItem>
          ))}
      </GridContainer>
      <TopPageButton />
    </MainLayout>
  )
}

export default Departement
