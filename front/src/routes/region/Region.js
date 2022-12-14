import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

import { ReactComponent as CrowdIcon } from '../../assets/images/icons/crowd.svg'
import { ReactComponent as CalculatorIcon } from '../../assets/images/icons/calculator.svg'
import { ReactComponent as MaletteIcon } from '../../assets/images/icons/malette.svg'

import { ReactComponent as RightChevronIcon } from '../../assets/images/icons/right_chevron.svg'
import { useWindowSize } from '../../common/hooks/window-size'
import { BackButton, KeyFigures, MainLayout, SectionTitle, Tag } from '../../components'
import { COLOR_PRIMARY, COLOR_WHITE } from '../../constants/colors'
import { isMobileView } from '../../constants/mobile'
import { alphabetOrder, formatCityUrl, formatNumber, wordsCapitalize } from '../../utils/utils'

const WelcomeContainer = styled.div`
  max-width: 1040px;
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
  margin-bottom: 12px;
  font-weight: 900;
`

const InfoContainer = styled.div`
  padding: 16px 0;
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  gap: 24px;
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
  padding-left: 10px;
`

const Picture = styled.img``

const GridContainer = styled.div`
  max-width: 1072px;
  width: 100%;
  padding: 0 16px 32px 16px;
  margin: auto;

  display: grid;
  grid-template-columns: repeat(2, minmax(max-content, 1fr));
  grid-auto-rows: 80px;
  gap: 8px 24px;
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

const Region = () => {
  const isMobile = isMobileView(useWindowSize())
  const { codeSlug } = useParams()
  const navigate = useNavigate()

  const [isTextExpended, setIsTextExpended] = useState(false)
  const [region, setRegion] = useState({})
  const [departements, setDepartements] = useState([])
  const [jobOffers, setJobOffers] = useState()

  const showFullText = useCallback(
    () => isTextExpended || region.description.length < 521,
    [isTextExpended, region.description]
  )

  const splitSort = (array) => {
    const halfLength = Math.ceil(array.length / 2)

    let temp = []
    const firstHalf = array.slice(0, halfLength)
    const secondHalf = array.slice(halfLength)

    for (let i = 0 ; i <= halfLength ; i++) {
      temp.push(firstHalf[i])
      temp.push(secondHalf[i])
    }

    return temp.filter(v => !!v)
  }

  const sortedDepartements = useMemo(() =>
    (!!departements ? splitSort(departements) : []),
    [departements])

  const sortedCities = useMemo(() =>
    (!!region?.biggestCities ? splitSort(region.biggestCities) : []),
    [region?.biggestCities])

  useEffect(() => {
    if (!codeSlug) return

    const [ code ] = codeSlug.split('-')

    axios
      .get(`/api/region/${code}`)
      .then((response) => response.data || null)
      .then(region => setRegion(region))
      .catch(() => navigate('/'))

    axios
      .get(`/api/region/${code}/jobs`)
      .then(response => response.data || null)
      .then(jobOffers => setJobOffers(jobOffers))
  }, [codeSlug])

  useEffect(() => {
    if (!region?.departements) return
    setDepartements(region.departements.sort(alphabetOrder('name')))

    region.departements.forEach(departement => {
      axios
        .get(`/api/departement/${departement.code}/jobs`)
        .then(response => response.data || null)
        .then(jobOffers => {
          const updatedDepartement = {
            ...region?.departements.find(dep => dep.code === departement.code),
            jobOffers
          }
          setDepartements(departements => ([
            ...departements.filter(dep => dep.code !== departement.code),
            updatedDepartement
          ].sort(alphabetOrder('name'))))
        })
    })
  }, [region?.departements])

  if (!region || !departements) return null

  return (
    <MainLayout>
      <WelcomeContainer $isMobile={isMobile}>
        <BackButton />
        <Title>Les opportunités en {wordsCapitalize(region.name)}</Title>

        <InfoContainer $isMobile={isMobile}>
          {region.description ? (
            <TextContainer $showFullText={showFullText()}>
              <Description>{region.description}</Description>
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

          <Picture src={`/regions/${region.code}.jpg`} />
        </InfoContainer>
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

      <SectionTitle style={{ marginTop: 64 }}>Découvrez les départements de la région</SectionTitle>
      <GridContainer>
        {sortedDepartements.map(departement => (
          <GridItem key={departement.code} to={`/departement/${departement.code}`}>
            <GridItemTitle>{departement.name}</GridItemTitle>
            <Tag>{formatNumber(departement.jobOffers)} offres d'emploi</Tag>
            <RightChevronIcon style={{ margin: 16 }} />
          </GridItem>
        ))}
      </GridContainer>

      <SectionTitle>Découvrez les plus grandes villes de la région</SectionTitle>
      <GridContainer>
        {sortedCities.map(city => (
          <GridItem key={city.insee_com} to={formatCityUrl(city)}>
            <GridItemTitle>{wordsCapitalize(city.nom_comm)}</GridItemTitle>
            <RightChevronIcon style={{ margin: 16 }} />
          </GridItem>
        ))}
      </GridContainer>

    </MainLayout>
  )
}

export default Region
