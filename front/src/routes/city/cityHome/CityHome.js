import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import loadable from '@loadable/component'

import {
  ActionButton,
  HelpsStandOut,
  HorizontalScrollableSection,
  Image,
  KeyFigures,
  Tag,
  TopPageButton,
  TopJobs as Top10Rome,
} from '../../../components'

import { ReactComponent as MaletteIcon } from '../../../assets/images/icons/malette.svg'
import { ReactComponent as ProfilEntrepriseIcon } from '../../../assets/images/icons/profil_entreprise.svg'
import { ReactComponent as HandshakeIcon } from '../../../assets/images/icons/handshake.svg'

import {
  capitalize,
  formatCityTension,
  formatNumber,
  wordsCapitalize,
} from '../../../utils/utils'
import {
  COLOR_LIGHT_PURPLE,
  COLOR_PRIMARY,
  COLOR_TEXT_PRIMARY,
  COLOR_WHITE,
} from '../../../constants/colors'
import { useProfessions } from '../../../common/contexts/professionsContext'
import { useCities } from '../../../common/contexts/citiesContext'
import { isMobileView } from '../../../constants/mobile'
import { useWindowSize } from '../../../common/hooks/window-size'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const CityHeader = loadable(() => import('../CityHeader'))

const JobCard = loadable(() => import('../cityJobs/components/JobCard'))
const CloseCompanies = loadable(() => import('./components/CloseCompanies'))
//prettier-ignore
const SectionHeader = loadable(() => import('../../../components/SectionHeader'))
//prettier-ignore
const CityHousingSection = loadable(() => import('./components/CityHousingSection'))

const ElementContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  max-width: 1040px;
  margin: ${({ $isMobile }) =>
    $isMobile ? '5px auto' : '40px auto 20px auto'};
  align-items: center;
  font-size: 16px;
  line-height: 24px;
`

const JobCardContainer = styled(Link)`
  min-width: 279px;
`

const TitlesContainer = styled.div`
  width: 100%;
  padding: ${({ $isMobile }) => ($isMobile ? '0 14px' : '0')};

  display: flex;
  flex-direction: column;
  text-align: start;

  color: ${COLOR_TEXT_PRIMARY};
`

const CityName = styled.h1`
  margin: 8px 0 22px 0;

  font-weight: 900;
  font-size: ${({ $isMobile }) => ($isMobile ? '24px' : '36px')};
  line-height: ${({ $isMobile }) => ($isMobile ? '36px' : '42px')};
  color: ${COLOR_PRIMARY};
`
const SubCityName = styled.h2`
  margin: 0px auto;
  text-align: center;
  font-weight: 900;
  font-size: ${({ $isMobile }) => ($isMobile ? '24px' : '36px')};
  line-height: ${({ $isMobile }) => ($isMobile ? '36px' : '42px')};
  color: ${COLOR_PRIMARY};
`
const SubHeaderHousing = styled.h3`
  margin: 0px auto;
  text-align: center;
  font-weight: 900;
  font-size: 24px;
  line-height: 36px;
  color: ${COLOR_PRIMARY};
`

const RegionName = styled.div`
  margin: 0;
  padding: 0;

  color: ${COLOR_PRIMARY};
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`

const RoundSeparator = styled.span`
  font-size: 24px;
  vertical-align: bottom;
`

const TagsContainer = styled.div`
  margin-top: 28px;

  display: grid;
  place-content: center;
`

const EventsContainer = styled.div`
  padding: 32px 0;
  margin: 16px 0;
  background: ${COLOR_LIGHT_PURPLE};

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: ${({ $isMobile }) => ($isMobile ? 'center' : 'inherit')};

  gap: 40px;
`

const EventBannerContent = styled.div`
  color: ${COLOR_PRIMARY};
  font-size: 22px;
  font-weight: 700;

  & > p {
    margin: 0;
  }
`
const EventBannerImgContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`
const EventBannerTitle = styled.p`
  font-size: 36px;
  font-weight: 900;
`
const EventBannerText = styled.p`
  font-size: 24px;
  text-align: center;
  line-height: 33px;
`
const EventBannerLink = styled.a`
  font-size: ${({ $isMobile }) => ($isMobile ? '16px' : '24px')};
  line-height: ${({ $isMobile }) => ($isMobile ? '19px' : '33px')};
  text-decoration: underline;
`

const ServicesStandOut = styled.div`
  width: ${({ $isMobile }) => ($isMobile ? 'auto' : '100%')};
  max-width: 1040px;
  padding: 32px;
  margin: ${({ $isMobile }) => ($isMobile ? '21px' : '32px auto')};
  border-radius: 4px;

  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  justify-content: stretch;
  gap: ${({ $isMobile }) => ($isMobile ? '0' : '125px')};

  color: ${COLOR_PRIMARY};
  background: ${COLOR_WHITE};
`

const ServicesStandOutTitle = styled.p`
  margin: 0;
  font-size: 24px;
  font-weight: 900;
`

const ServicesStandOutDescription = styled.p`
  margin: 0;
  font-size: 18px;
  font-weight: 400;
`

const ServicesStandOutContent = styled.div`
  flex: 1;
`

const ServicesStandOutImageContainer = styled.div`
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;
`

const CityHome = ({ romeLabel, insee, codeRome }) => {
  const isMobile = isMobileView(useWindowSize())

  const { companiesCount, onSearchCloseCompanies, city, criterions } =
    useCities()
  const {
    jobsMissingApplicant,
    isMissingApplicants,
    professions,
    totalOffres,
    infosTravail,
    onSearchInfosTravail,
    sortByDistanceFromCity,
  } = useProfessions()

  // const [ events, setEvents ] = useState(null)
  const [isDefaultJobsPreview, setIsDefaultJobsPreview] = useState(true)
  const [displayedJobs, setDisplayedJobs] = useState([])

  useEffect(() => {
    const isDefaultJobsPreview = jobsMissingApplicant.length < 3
    setIsDefaultJobsPreview(isDefaultJobsPreview)
  }, [jobsMissingApplicant])

  useEffect(() => {
    if (!city || (!jobsMissingApplicant?.length && !professions?.length)) return

    setDisplayedJobs(
      (isDefaultJobsPreview ? professions : jobsMissingApplicant)
        ?.sort(sortByDistanceFromCity(city))
        .slice(0, 3)
    )
  }, [codeRome, city, isDefaultJobsPreview, jobsMissingApplicant, professions])

  const jobSelectedParam = (job) =>
    isMissingApplicants(job) ? `&jobSelected=${job.id}` : ''

  useEffect(() => {
    if (!city?.insee_com || (!codeRome && !criterions?.codeRomes)) return

    if (!codeRome) {
      onSearchCloseCompanies({
        codeRome: criterions.codeRomes.map((codeRome) => codeRome.key),
        insee: city.insee_com,
        sort: 'distance',
      })
    } else {
      onSearchCloseCompanies({
        codeRome: [codeRome],
        insee: city.insee_com,
        sort: 'distance',
      })
    }

    onSearchInfosTravail({
      ...(codeRome && codeRome !== '' ? { codeRome: codeRome } : null),
      insee: city.insee_com,
    })
  }, [city?.insee_com, codeRome, criterions])

  // useEffect(() => {
  //   fetch(`/api/events`)
  //     .then((r) => r.json())
  //     .then((events) => setEvents(events.slice(0, 6)))
  // }, [])

  const Title = () => {
    return (
      <CityName $isMobile={isMobile}>
        {wordsCapitalize(city.nom_comm)}
        {romeLabel && isMobile ? <br /> : ' '}
        {romeLabel ? `pour le métier ${romeLabel}` : ''}
      </CityName>
    )
  }

  return (
    <div tag-page="/city">
      <CityHeader isMobile={isMobile}>
        <TitlesContainer $isMobile={isMobile}>
          <RegionName isMobile={isMobile}>
            {capitalize(city.nom_region)}
            <RoundSeparator> • </RoundSeparator>
            {capitalize(city.nom_dept)}
          </RegionName>
          <Title />
        </TitlesContainer>
      </CityHeader>
      <br />
      <SubCityName>
        L'emploi à{' '}
        <span style={{ whiteSpace: 'nowrap' }}>
          {wordsCapitalize(city.nom_comm)}
        </span>
      </SubCityName>
      <TagsContainer>
        <Tag green={infosTravail?.bassinTensionIndT < 4} size="tall">
          {formatCityTension(infosTravail?.bassinTensionIndT)}
        </Tag>
      </TagsContainer>

      <KeyFigures
        figures={[
          !totalOffres
            ? null
            : {
                label: "Offres d'emploi",
                data: formatNumber(totalOffres),
                icon: <MaletteIcon />,
              },
          !companiesCount
            ? null
            : {
                label: 'Entreprises',
                data: formatNumber(companiesCount),
                icon: <ProfilEntrepriseIcon />,
              },
          !infosTravail?.hiringRate
            ? null
            : {
                label: "Taux d'embauche",
                $isNoWrap: true,
                data:
                  infosTravail?.hiringRate > 100
                    ? '100%'
                    : `${infosTravail?.hiringRate}%`,
                icon: <HandshakeIcon />,
              },
        ]}
      />
      <SectionHeader title={`Les entreprises qui recrutent`} />
      <CloseCompanies />

      {!!codeRome ? null : <Top10Rome city={city} />}

      <SectionHeader
        title={
          isDefaultJobsPreview
            ? "Les dernières offres d'emploi"
            : "Les offres d'emploi avec peu de candidats"
        }
        subTitle={
          !isDefaultJobsPreview &&
          'Offres de plus de 15 jours, comptant moins de 4 candidatures'
        }
      />

      <HorizontalScrollableSection>
        {displayedJobs.map((job) => (
          <JobCardContainer
            $isMobile={isMobile}
            key={job.id}
            to={{
              pathname: `/ville/${insee}/metier`,
              search: `?codeRome=${codeRome}${jobSelectedParam(job)}`,
            }}
          >
            <JobCard job={job} style={{ height: '100%' }} />
          </JobCardContainer>
        ))}
      </HorizontalScrollableSection>

      <ActionButton
        path={`/ville/${insee}/metier?codeRome=${codeRome}`}
        libelle={`Voir toutes les offres d’emploi`}
        isMobile={isMobile}
        isBlue={true}
        centered
      />

      {/* (<EventsContainer>
          <SectionHeader
            title="Les rencontres professionnelles dans ce département"
            subTitle="Pour augmenter vos chances de trouver une emploi dans cette ville"
            margin={false} />
          <Events events={events} />
        </EventsContainer>)  */}

      <EventsContainer $isMobile={isMobile}>
        {!isMobile && (
          <img src="/logos/events-city-mobile.svg" alt="" role="presentation" />
        )}
        <EventBannerContent>
          <EventBannerTitle>Mes événements emploi</EventBannerTitle>
          <EventBannerImgContainer>
            {isMobile && (
              <img
                src="/logos/events-city-mobile.svg"
                alt=""
                role="presentation"
              />
            )}
          </EventBannerImgContainer>
          <EventBannerText>
            Pour augmenter votre chance de trouver une emploi dans cette ville
          </EventBannerText>
          <EventBannerLink
            $isMobile={isMobile}
            href="https://mesevenementsemploi.pole-emploi.fr/mes-evenements-emploi/evenements"
            target="_blank"
          >
            Découvrez les rencontres professionnelles{' '}
            <ArrowForwardIcon style={{ verticalAlign: 'middle' }} />
          </EventBannerLink>
        </EventBannerContent>
      </EventsContainer>

      <ElementContainer $isMobile={isMobile}>
        <SubHeaderHousing>
          Et sinon pour vous loger à {wordsCapitalize(city.nom_comm)} ?
        </SubHeaderHousing>
        <CityHousingSection city={city}></CityHousingSection>
      </ElementContainer>

      {!!codeRome ? (
        <>
          <SectionHeader title="Les aides pour vous accompagner dans votre projet" />
          <HelpsStandOut />
        </>
      ) : null}

      {!!codeRome ? (
        <ServicesStandOut $isMobile={isMobile}>
          <ServicesStandOutContent>
            <ServicesStandOutTitle>
              Découvrez les services de la ville
            </ServicesStandOutTitle>
            <ServicesStandOutDescription>
              Tout savoir sur les transports, la santé, l’éducation, la culture
              et les loisirs
            </ServicesStandOutDescription>
            <ActionButton
              style={{ marginTop: 16, width: 'fit-content' }}
              path={`/ville/${insee}/services?codeRome=${codeRome}`}
              libelle={`Voir tous les services`}
              isMobile={isMobile}
              isBlue={false}
              isWhite={true}
            />
          </ServicesStandOutContent>
          <ServicesStandOutImageContainer>
            <Image src="cityServicesStandOut" />
          </ServicesStandOutImageContainer>
        </ServicesStandOut>
      ) : null}

      {!!codeRome ? (
        <ActionButton
          path={'/conseils-et-astuces'}
          libelle={`Consultez nos conseils pour votre projet`}
          isMobile={isMobile}
          isBlue={false}
          isWhite={true}
          centered
        />
      ) : null}

      <TopPageButton />
    </div>
  )
}

CityHome.propTypes = {
  romeLabel: PropTypes.string,
  insee: PropTypes.string,
  codeRome: PropTypes.string,
}

export default CityHome
