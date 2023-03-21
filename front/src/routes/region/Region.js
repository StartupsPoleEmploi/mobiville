import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

import { ReactComponent as CrowdIcon } from '../../assets/images/icons/crowd.svg'
import { ReactComponent as CalculatorIcon } from '../../assets/images/icons/calculator.svg'
import { ReactComponent as MaletteIcon } from '../../assets/images/icons/malette.svg'
import { ReactComponent as RightChevronIcon } from '../../assets/images/icons/right_chevron.svg'

import { useRegions } from '../../common/contexts/regionsContext'
import { useWindowSize } from '../../common/hooks/window-size'
import {
  BackButton,
  Image,
  KeyFigures,
  MainLayout,
  SectionTitle,
  Tag,
  TopPageButton,
} from '../../components'
import { COLOR_PRIMARY, COLOR_WHITE } from '../../constants/colors'
import { isMobileView } from '../../constants/mobile'
import {
  alphabetOrder,
  formatCityUrl,
  formatNumber,
  splitSort,
  wordsCapitalize,
} from '../../utils/utils'

const WelcomeContainer = styled.div`
  max-width: 1040px;
  display: flex;
  flex-wrap: wrap;
  margin: ${({ $isMobile }) => ($isMobile ? 'auto' : '0 auto')};
  padding: ${({ $isMobile }) => ($isMobile ? '1px 16px 16px 16px' : '1px 0')};

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
  font-size: ${({ $isMobile }) => ($isMobile ? '24px' : '36px')};
`

const InfoContainer = styled.div`
  width: ${({ $isMobile }) => ($isMobile ? '100%' : '55%')};
`

const TextContainer = styled.div`
  position: relative;

  max-height: ${({ $showFullText }) => ($showFullText ? 'none' : '255px')};
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: space-between;
`

const Description = styled.p`
  margin: 0;
  overflow: hidden;
  line-height: 24px;
  max-height: ${({ $showFullText }) =>
    $showFullText ? 'unset' : 'calc(24px * 9)'};
  margin-right: 35px;
  font-size: 18px;
  font-weight: 400;
`

const ReadMore = styled.p`
  cursor: pointer;
  margin: 0;
  flex-shrink: 0;

  color: ${COLOR_PRIMARY};
  font-size: 16px;
  font-weight: 900;
  text-decoration: underline;
`

const NotWrappableText = styled.span`
  white-space: ${({ $isMobile }) => ($isMobile ? 'initial' : 'nowrap')};
`

const ReadMoreText = styled.span`
  padding-left: 10px;
`

const ImageContainer = styled.div`
  flex: ${({ $isMobile }) => ($isMobile ? 'unset' : '1')};
  margin-top: ${({ $isMobile }) => ($isMobile ? '15px' : '75px')};
  margin-bottom: ${({ $isMobile }) => ($isMobile ? '0px' : '10px')};
  height: ${({ $isMobile }) => ($isMobile ? '255px' : 'auto')};
  max-height: 300px;
  width: 100%;
`
const RegionImage = styled(Image)`
  img {
    border-radius: 8px;
    width: 100%;
    height: 100%;
    // object-fit: cover;
  }
  width: 100%;
`

const GridContainer = styled.div`
  max-width: 1072px;
  width: 100%;
  padding: 0 16px 32px 16px;
  margin: auto;
  padding-top: 5px;

  display: grid;
  grid-template-columns: repeat(
    ${({ $columnNumber }) => $columnNumber},
    minmax(max-content, 1fr)
  );
  grid-auto-rows: 80px;
  gap: 8px 16px;
  overflow-x: ${({ $isMobile }) => ($isMobile ? 'scroll' : 'auto')};
`

const GridItem = styled(Link)`
  min-width: 240px;
  padding: ${({ $isMobile }) => ($isMobile ? '0 10px' : '0 30px')};

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

const GridItemHeader = styled.div`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'auto')};
  width: 100%;
  margin-left: ${({ $isMobile }) => ($isMobile ? '0px' : '10px')};
`
const GridItemTitle = styled.div`
  flex: auto;
`

const Region = () => {
  const isMobile = isMobileView(useWindowSize())
  const { codeSlug } = useParams()
  const { regions } = useRegions()

  const [isTextExpended, setIsTextExpended] = useState(false)
  const [region, setRegion] = useState({})
  const [departements, setDepartements] = useState([])
  const [jobOffers, setJobOffers] = useState()

  const showFullText = useCallback(
    () => isTextExpended || region.description.length < 521,
    [isTextExpended, region.description]
  )

  const sortedDepartements = useMemo(
    () => (!!departements ? splitSort(departements) : []),
    [departements]
  )

  const sortedCities = useMemo(
    () => (!!region?.cities ? splitSort(region.cities) : []),
    [region?.cities]
  )

  useEffect(() => {
    if (!codeSlug || !regions?.length) return

    const [code] = codeSlug.split('-')

    setRegion(regions.find((region) => region.code === +code))

    axios
      .get(`/api/region/${code}/jobs`)
      .then((response) => response.data || null)
      .then((jobOffers) => setJobOffers(jobOffers))
  }, [codeSlug, regions])

  useEffect(() => {
    if (!region?.departements) return
    setDepartements(region.departements.sort(alphabetOrder('name')))

    region.departements.forEach((departement) => {
      axios
        .get(`/api/departement/${departement.code}/jobs`)
        .then((response) => response.data || null)
        .then((jobOffers) => {
          const updatedDepartement = {
            ...region?.departements.find(
              (dep) => dep.code === departement.code
            ),
            jobOffers,
          }
          setDepartements((departements) =>
            [
              ...departements.filter((dep) => dep.code !== departement.code),
              updatedDepartement,
            ].sort(alphabetOrder('name'))
          )
        })
    })
  }, [region?.departements])

  if (!region || !departements) return null

  return (
    <MainLayout>
      <WelcomeContainer $isMobile={isMobile}>
        <InfoContainer $isMobile={isMobile}>
          <BackButton />
          <Title>
            Les opportunités en{' '}
            <NotWrappableText $isMobile={isMobile}>
              {wordsCapitalize(region.name)}
            </NotWrappableText>
          </Title>
          {region.description ? (
            <TextContainer $showFullText={showFullText()}>
              <Description $showFullText={showFullText()}>
                {region.description}
              </Description>
              <ReadMore
                $isMobile={isMobile}
                onClick={() => setIsTextExpended(!isTextExpended)}
              >
                {region.description.length > 521 &&
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
          ) : null}
        </InfoContainer>

        {region.code ? (
          <ImageContainer $isMobile={isMobile}>
            <RegionImage src={`/regions/${region.code}.jpg`} isUrlSrc />
          </ImageContainer>
        ) : null}
      </WelcomeContainer>

      <KeyFigures
        figures={[
          {
            label: 'Habitants',
            data: formatNumber(region.population),
            icon: <CrowdIcon />,
          },
          {
            label: 'Superficie',
            data: `${formatNumber(region.superficie / 100)} km²`,
            icon: <CalculatorIcon />,
          },
          {
            label: "Offres d'emploi",
            data: formatNumber(jobOffers),
            icon: <MaletteIcon />,
          },
        ]}
      />

      <SectionTitle style={{ marginTop: 64 }}>
        <span>Découvrez les </span>
        <span style={{ whiteSpace: 'nowrap' }}>départements de la région</span>
      </SectionTitle>
      <GridContainer $columnNumber={2} $isMobile={isMobile}>
        {sortedDepartements.map((departement) => (
          <GridItem
            $isMobile={isMobile}
            key={departement.code}
            to={`/departement/${departement.code}`}
          >
            <GridItemHeader $isMobile={isMobile}>
              <GridItemTitle>{departement.name}</GridItemTitle>
              <Tag>{formatNumber(departement.jobOffers)} offres d'emploi</Tag>
            </GridItemHeader>
            <RightChevronIcon style={{ margin: isMobile ? 5 : 15 }} />
          </GridItem>
        ))}
      </GridContainer>

      <SectionTitle>
        Découvrez les villes qui proposent le plus d’offres{' '}
        <span style={{ whiteSpace: 'nowrap' }}>dans la région</span>
      </SectionTitle>
      <GridContainer $columnNumber={isMobile ? 1 : 2} $isMobile={isMobile}>
        {sortedCities.map((city) => (
          <GridItem key={city.insee_com} to={formatCityUrl(city)}>
            <GridItemTitle>{wordsCapitalize(city.nom_comm)}</GridItemTitle>
            <RightChevronIcon style={{ margin: 16 }} />
          </GridItem>
        ))}
      </GridContainer>

      <TopPageButton />
    </MainLayout>
  )
}

export default Region
