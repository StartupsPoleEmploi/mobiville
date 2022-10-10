import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import _ from 'lodash'
import queryString from 'query-string'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import { CircularProgress } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import DescriptionIcon from '@mui/icons-material/Description'

import { ActionButton, KeyFigures, MainLayout } from '../../components'
import CityHeader from './CityHeader'
import CityJobs from './CityJobs'
import CityLife from './CityLife'
import CityHousing from './CityHousing'
import CitySubHeader from './CitySubHeader'
import CityHousingSimulator from './CityHousingSimulator'

import { useCities } from '../../common/contexts/citiesContext'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'
import { useProfessions } from '../../common/contexts/professionsContext'
import {
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_TAG_GREEN,
  COLOR_TAG_RED,
  COLOR_TEXT_PRIMARY,
  COLOR_VERT_MOBIVILLE
} from '../../constants/colors'

import balance from '../../assets/images/icons/balance.svg'
import bread from '../../assets/images/icons/bread.svg'
import briefcase from '../../assets/images/icons/briefcase.svg'
import building from '../../assets/images/icons/building.svg'
import doctors from '../../assets/images/icons/doctors.svg'
import euro from '../../assets/images/icons/euro.svg'
import house from '../../assets/images/icons/house.svg'
import medalBronze from '../../assets/images/icons/medal_bronze.svg'
import medalGold from '../../assets/images/icons/medal_gold.svg'
import medalSilver from '../../assets/images/icons/medal_silver.svg'
import redEllipse from '../../assets/images/icons/red_ellipse.svg'
import greenEllipse from '../../assets/images/icons/green_ellipse.svg'
import restaurantsIcon from '../../assets/images/icons/restaurants.svg'
import pastille from '../../assets/images/icons/pastille.svg'

import { ReactComponent as MaletteIcon } from '../../assets/images/icons/malette.svg'
import { ReactComponent as ProfilEntrepriseIcon } from '../../assets/images/icons/profil_entreprise.svg'
// import { ReactComponent as HandshakeIcon } from '../../assets/images/icons/handshake.svg'

import { formatCityTension, getXDaysAgo } from "../../utils/utils"

const ElementContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  max-width: 1040px;
  margin: ${({ isMobile }) => (isMobile ? '5px auto' : '60px auto')};
  align-items: center;
  font-size: 16px;
  line-height: 24px;
`

const BlockContainer = styled.div`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
  justify-content: ${({ isMobile }) => (isMobile ? 'space-around' : 'space-between')};;
  ${({ isMobile }) => (isMobile ? '' : 'width: 100%;')}
  max-width: 1040px;
  margin: ${({ isMobile }) => (isMobile ? '5px auto 8px auto ' : '0 auto')};
  margin-bottom: 8px;
`
const Block = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: ${({ isMobile }) => (isMobile ? '20px' : '32px')};
  color: ${COLOR_TEXT_PRIMARY};

  &:not(:first-of-type) {
    margin-left: ${({ isMobile }) => (isMobile ? 0 : '16px')};
  }
`

const BlockHeader = styled.div``
const BlockHeaderText = styled.div`
  ${({ isMobile }) => (isMobile ? 'width: 310px;margin: auto;' : '')}
  margin-bottom: ${({ isMobile }) => (isMobile ? '5px' : '')}
`
const BlockHeaderRating = styled.div``
const BlockHeaderH2 = styled.h2`
  margin: 8px 0px;
  font-weight: 900;
  font-size: 24px;
  line-height: 28px;
  color: ${COLOR_PRIMARY};
`
const BlockHeaderP = styled.p`
  margin: 8px 0px;
  font-size: 16px;
  line-height: 24px;
  color: ${COLOR_PRIMARY};
`
const BlockContent = styled.div`
  height: 272px;
  background-color: #fff;
  padding: 0px 20px;
  border: 1px ${COLOR_GRAY} solid;
  border-radius: 8px;
  ${({ isMobile }) => (isMobile ? 'width: 310px;' : '')}
`

const BlockContentOffer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: #fff;
  border-radius: 8px;
  width: 336px;
  height: 170px;
  padding: 16px;
`

const BlockOfferLabel = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: ${COLOR_PRIMARY};
`

const BlockOfferCompany = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: ${COLOR_PRIMARY};
`

const BlockOfferCity = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: ${COLOR_TEXT_PRIMARY};
`

const BlockOfferContract = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: ${COLOR_PRIMARY};
  display: flex;
  align-items: center;
`

const BlockOfferDate = styled.div`
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  color: ${COLOR_PRIMARY};
  display: flex;
  align-items: center;
`

const BlockContentCity = styled.div`
  background-color: #fff;
  border: 1px ${COLOR_GRAY} solid;
  border-radius: ${({ isMobile }) => (isMobile ? '4px' : '8px')};
  width: 328px;
  height: 153px;
  margin: ${({ isCenter }) => (isCenter ? 'auto' : 0)};
  ${({ isMobile }) => (isMobile ? 'margin-bottom: 8px;' : '')}
  transition: border 0.2s cubic-bezier(0.4, 0, 1, 1);

  :hover {
    border: 2px solid #191970;
  }
  li,
  li img {
    margin: auto;
    text-align: center;
    display: block;
  }
`

const BlockContentUl = styled.ul`
  list-style: none;
  list-style-type: none;
  padding-left: 0;
`

const BlockLinkSyle = `
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 4px;
  font-size: 16px;
  line-height: 24px;
  
  div {
    margin:auto;
    min-width: 232px;
  }
`

const BlockContentProximity = styled.div`
  width: 500px;
  padding: 24px 16px;
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;

  background-color: #fff;
`

const BlockCompanyName = styled.span`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: ${COLOR_PRIMARY};
`

const BlockCompanyCity = styled.span`
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: ${COLOR_PRIMARY};
`

const BlockCompanyDataFrom = styled.span`
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: ${COLOR_VERT_MOBIVILLE};
  
  > a {
    color: ${COLOR_VERT_MOBIVILLE};
    text-decoration: underline;
  }
`


const BlockLinkDiv = styled.div`
  ${BlockLinkSyle}
`

const BlockLinkLi = styled.li`
  ${BlockLinkSyle}
  height: 40px;
`

const BlockContentLi = styled.li`
  height: 56px;
  display: flex;
  align-items: center;
  padding: 8px 4px;
  border-radius: 4px;
  font-size: 16px;
  line-height: 24px;
  b {
    font-size: 20px;
  }
  ${({ isPaddingReduced }) =>
    isPaddingReduced ? 'margin-top: -20px !important;' : ''}
`

const BlockContentLiImg = styled.img.attrs({ alt: '' })`
  height: 30px;
`
const BlockContentLiDesc = styled.div`
  padding-left: 8px;
  padding-right: 8px;
  flex: 1;

  b {
    font-size: 19px;
  }
`
const BlockContentLiValue = styled.span`
  font-weight: 700;
  justify-self: flex-end;
  font-size: 20px;
`

const TitlesContainer = styled.div`
  display: ${({ isMobile }) => (isMobile ? 'contents' : 'flex')};
  flex-direction: column;
  text-align: ${({ isMobile }) => (isMobile ? 'center' : 'start')};
  padding: ${({ isMobile }) => (isMobile ? '8px 0' : '0')};
  width: 1040px;
  color: ${COLOR_TEXT_PRIMARY};
`

const CityName = styled.h1`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 900;
  font-size: 36px;
  line-height: 42px;
  margin-top: 8px;
  margin-bottom: 34px;
  color: ${COLOR_PRIMARY};
`

const RegionName = styled.p`
  font-size: ${({ isMobile }) => (isMobile ? '14px' : '12px')};
  margin: 0;
  padding: 0;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${COLOR_PRIMARY};

  img {
    margin: 2px 4px;
  }
`

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: auto;
  margin-top: 28px;
`

const Tag = styled.div`
  padding: 4px 6px;
  border-radius: 8px;

  font-size: 12px;
  font-weight: 500;
  color: ${COLOR_PRIMARY};
  background: white;
  background: ${({ $color }) => ($color ? $color : COLOR_GRAY)};
`

const BAKERY_CODE = 'B203'
const DOCTORS_CODE = 'D201'
const RESTAURANTS_CODE = 'A504'

const JOB = 'job'
const LIFE = 'life'
const HOUSING = 'housing'

const CityPage = () => {
  const {
    onLoadCity,
    isLoadingCity,
    city,
    criterions,
    unloadCity,
    closeCities,
    similarCities,
    similarCitiesCriterionsQueryString,
    onSearchCloseCities,
    onSearchSimilarCities,
    onSearchCloseCompanies,
    companiesCount,
    closeCompanies
  } = useCities()

  const {
    isLoading: isLoadingProfessions,
    onSearch: onSearchProfessions,
    onSearchInfosTravail,
    professions,
    professionsCandidatsManquants,
    totalOffres,
    bassinTensionIndT,
  } = useProfessions()

  const { insee, section } = useParams()
  const [inseeCode] = insee.split('-')
  const size = useWindowSize()
  const navigate = useNavigate()
  const [infosTravail, setInfosTravail] = useState(null)

  const location = useLocation()
  const params = queryString.parse(location.search)

  const [jobSearchValue, setJobSearchValue] = useState(
    decodeURIComponent(params.jobSearch || '')
  )
  const codeRome = params?.codeRome || ''
  const bassinTension = infosTravail?.bassinTension
  const deptTension = infosTravail?.deptTension

  useEffect(() => {
    onLoadCity(inseeCode)

    return () => {
      unloadCity()
    }
  }, [inseeCode])

  useEffect(() => {
    if (!jobSearchValue) return
    if (jobSearchValue === decodeURIComponent(params.jobSearch)) return

    navigate(
      {
        pathname: location.pathname,
        search: queryString.stringify({ ...params, jobSearch: jobSearchValue }),
      },
      { replace: true }
    )
  }, [navigate, jobSearchValue, params, location.pathname])

  useEffect(() => {
    if (city && codeRome) {
      onSearchProfessions({ codeRome: [codeRome], insee: [city.insee_com] })
      onSearchProfessions({ codeRome: [codeRome], insee: [city.insee_com], offresManqueCandidats: true })
      onSearchInfosTravail({ codeRome: codeRome, insee: city.insee_com }).then(
        setInfosTravail
      )
      onSearchSimilarCities({
        codeRome,
        city,
      })
      onSearchCloseCities({
        latitude: city.geo_point_2d_x,
        longitude: city.geo_point_2d_y,
        codeRome,
        inseeCode: city.insee_com,
      })
      onSearchCloseCompanies({
        codeRome,
        insee: city.insee_com,
        sort: 'distance'
      })
    }
  }, [city, codeRome])

  let bakeriesNumber
  let doctorsNumber
  let restaurantsNumber

  if (city?.equipments?.length) {
    bakeriesNumber =
      city.equipments.find(({ typequ }) => typequ === BAKERY_CODE)?.total || 0
    doctorsNumber =
      city.equipments.find(({ typequ }) => typequ === DOCTORS_CODE)?.total || 0
    restaurantsNumber =
      city.equipments.find(({ typequ }) => typequ === RESTAURANTS_CODE)
        ?.total || 0
  }

  let romeLabel = ''

  if (criterions?.codeRomes && codeRome) {
    const foundLabel =
      criterions.codeRomes.find((c) => c.key === codeRome)?.label || ''
    romeLabel = foundLabel.toLowerCase()
  }

  if (isLoadingCity) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <CircularProgress />
      </div>
    )
  }

  if (!city) return null

  const lastSearch = localStorage.getItem('lastSearch')

  const childrenComponentsBacklink = `/city/${insee}?codeRome=${codeRome}`
  const backLink = `/cities${lastSearch || `?codeRome=${codeRome}`}`

  if (section === JOB)
    return (
      <CityJobs
        jobs={professions}
        isLoading={isLoadingProfessions}
        romeLabel={romeLabel}
        city={city}
        searchValue={jobSearchValue}
        setSearchValue={setJobSearchValue}
        backLink={childrenComponentsBacklink}
      />
    )

  if (section === HOUSING)
    return (
      <CityHousing
        nbSocialHousing={city.total_social_housing}
        city={city}
        backLink={childrenComponentsBacklink}
      />
    )

  if (section === LIFE)
    return (
      <CityLife
        city={city}
        backLink={childrenComponentsBacklink}
        cityEquipments={city.equipments}
      />
    )

  const isMobile = isMobileView(size)

  const titlesNode = (
    <TitlesContainer isMobile={isMobile}>
      <RegionName isMobile={isMobile}>
        {_.capitalize(city.nom_region)} <img src={pastille} alt="" />{' '}
        {_.capitalize(city.nom_dept)}
      </RegionName>
      {!isMobile && (
        <CityName isMobile={isMobile}>
          {_.capitalize(city.nom_comm)}{' '}pour le métier {romeLabel}
        </CityName>
      )}
      {isMobile && (
        <CityName isMobile={isMobile}>
          {_.capitalize(city.nom_comm)} <br /> pour le métier {romeLabel}
        </CityName>
      )}
    </TitlesContainer>
  )

  return (
    <MainLayout menu={{ visible: !isMobile }}>
      <Helmet>
        <title>
          {_.upperFirst(romeLabel)} à {_.capitalize(city.nom_comm)} | Mobiville
        </title>
        <meta
          name="description"
          content={`Explorez le marché de l'emploi de ${_.capitalize(
            city.nom_comm
          )} pour le métier de ${romeLabel} ainsi que les informations sur l’immobilier, les services et les équipements.`}
        />
      </Helmet>

      {!isMobile && (
        // A custom header is used for the mobile version in the CityHeader component
        <CitySubHeader
          backLink={backLink}
          node={titlesNode}
          isMobile={isMobile}
        />
      )}

      <CityHeader
        backLink={backLink}
        isMobile={isMobile}
        titlesNode={titlesNode}
      />

      {!isMobile && (
          <TagsContainer>
            <Tag
                $color={
                  bassinTensionIndT < 4
                      ? COLOR_TAG_GREEN
                      : COLOR_TAG_RED
                }
            >
              {formatCityTension(bassinTensionIndT)}
            </Tag>
          </TagsContainer>
      )}
      {!isMobile && (
          <KeyFigures figures={[
            { label: "Offres d'emploi", data: totalOffres, icon: <MaletteIcon /> },
            { label: "Entreprises", data: companiesCount, icon: <ProfilEntrepriseIcon /> },
            // { label: "Taux d'embauche", data: totalOffres, icon: <BlockJobInfosImg src={handshake} /> },
          ]} />
      )}
      {!isMobile && (
          <BlockContainer isMobile={isMobile}>
            <Block isMobile={isMobile}>
              <BlockHeader>
                <BlockHeaderText isMobile={isMobile}>
                  <BlockHeaderH2>Les offres d'emploi avec plus d'opportunités</BlockHeaderH2>
                  <BlockHeaderP>
                    Offres de plus de 15 jours, comptant moins de 4 candidatures
                  </BlockHeaderP>
                </BlockHeaderText>
              </BlockHeader>
              <BlockContainer isMobile={isMobile}>
                {professionsCandidatsManquants?.slice(0,3).map((profession) => (
                    <BlockContentOffer>
                      <BlockOfferLabel>{profession.appellationlibelle}</BlockOfferLabel>
                      <BlockOfferCompany>{profession.entreprise.nom}</BlockOfferCompany>
                      <BlockOfferCity>{profession.lieuTravail.libelle}</BlockOfferCity>
                      <BlockOfferContract><DescriptionIcon/>{profession.typeContrat} {profession.dureeTravailLibelleConverti ? ' \u2022 ' + profession.dureeTravailLibelleConverti : ''}
                      </BlockOfferContract>
                      <BlockOfferDate><AccessTimeIcon/>Publié il y a {getXDaysAgo(profession.dateActualisation)}</BlockOfferDate>
                    </BlockContentOffer>
                ))}
              </BlockContainer>

              <BlockLinkDiv>
                <ActionButton
                    path={`/city/${insee}/job?codeRome=${codeRome}`}
                    libelle={`Voir toutes les offres d’emploi`}
                    isMobile={isMobile}
                    isBlue={true}
                />
              </BlockLinkDiv>
            </Block>
          </BlockContainer>
      )}

      {!isMobile && (
          <BlockContainer isMobile={isMobile}>
            <Block isMobile={isMobile}>
              <BlockHeader>
                <BlockHeaderText isMobile={isMobile}>
                  <BlockHeaderH2>Les entreprises qui recrutent à proximité</BlockHeaderH2>
                </BlockHeaderText>
              </BlockHeader>
              <BlockContainer isMobile={isMobile}>
                <BlockContentProximity>
                  {closeCompanies?.slice(0,5).map((company, index) => (
                    <a key={index} href={company.url} target="_blank">
                      <BlockCompanyName>{_.startCase(_.toLower(company.name))}</BlockCompanyName>{' '}
                      <BlockCompanyCity>{_.capitalize(company.city)}</BlockCompanyCity>
                    </a>
                  ))}
                  <BlockCompanyDataFrom>(Données issues de <a target="_blank" href="https://labonneboite.pole-emploi.fr/">La Bonne Boite</a>)</BlockCompanyDataFrom>
                </BlockContentProximity>
              </BlockContainer>
            </Block>
          </BlockContainer>
      )}

      {isMobile && (
          <BlockContainer isMobile={isMobile}>
            <Block isMobile={isMobile}>
              <BlockHeader>
                <BlockHeaderText>
                  <BlockHeaderH2>Emploi</BlockHeaderH2>
                </BlockHeaderText>
                <BlockHeaderRating></BlockHeaderRating>
              </BlockHeader>
              <BlockContent isMobile={isMobile}>
                <BlockContentUl>
                  <BlockContentLi>
                    <BlockContentLiImg src={balance} />
                    <BlockContentLiDesc>
                      <BlockContentLiValue>
                        {' '}
                        {bassinTension || deptTension || 'À venir'}{' '}
                      </BlockContentLiValue>
                      Offres pour
                      <BlockContentLiValue> 10 </BlockContentLiValue>
                      demandeurs
                    </BlockContentLiDesc>
                  </BlockContentLi>

                  <BlockContentLi>
                    <BlockContentLiImg src={euro} />
                    <BlockContentLiDesc>
                      <BlockContentLiValue>
                        {infosTravail?.min > 0
                            ? `${infosTravail.min}€ à ${infosTravail.max}€ `
                            : `A venir `}
                      </BlockContentLiValue>
                      Salaire brut
                    </BlockContentLiDesc>
                  </BlockContentLi>

                  <BlockContentLi>
                    <BlockContentLiImg src={briefcase} />
                    <BlockContentLiDesc>
                      <BlockContentLiValue>{totalOffres} </BlockContentLiValue>
                      Offres d’emploi
                    </BlockContentLiDesc>
                  </BlockContentLi>

                  <BlockLinkLi>
                    <ActionButton
                        path={`/city/${insee}/job?codeRome=${codeRome}`}
                        libelle={`Voir les offres d’emploi`}
                        isMobile={isMobile}
                        isBlue={true}
                    />
                  </BlockLinkLi>
                </BlockContentUl>
              </BlockContent>
            </Block>

            <Block isMobile={isMobile}>
              <BlockHeader>
                <BlockHeaderText>
                  <BlockHeaderH2>Logement</BlockHeaderH2>
                </BlockHeaderText>
                <BlockHeaderRating></BlockHeaderRating>
              </BlockHeader>
              <BlockContent isMobile={isMobile}>
                <BlockContentUl>
                  <BlockContentLi>
                    <BlockContentLiImg src={house} />
                    <BlockContentLiDesc>
                      <BlockContentLiValue>
                        {city && city.average_houseselled
                            ? `${city.average_houseselled}€ `
                            : 'A venir '}
                      </BlockContentLiValue>
                      Achat {isMobile && <br />}
                      <span style={{ whiteSpace: 'nowrap' }}>(prix m² moyen)</span>
                    </BlockContentLiDesc>
                  </BlockContentLi>

                  <BlockContentLi>
                    <BlockContentLiImg src={building} />
                    <BlockContentLiDesc>
                      <BlockContentLiValue>
                        {city && city.average_houserent
                            ? `${city.average_houserent.toFixed(2)}€ `
                            : 'A venir '}
                      </BlockContentLiValue>
                      Location {isMobile && <br />}
                      <span style={{ whiteSpace: 'nowrap' }}>(prix m² moyen)</span>
                    </BlockContentLiDesc>
                  </BlockContentLi>

                  <BlockContentLi>
                    <BlockContentLiImg
                        src={city?.city_house_tension ? redEllipse : greenEllipse}
                        style={{ height: 15 }}
                    />
                    <BlockContentLiDesc>
                      <b>
                        {city?.city_house_tension
                            ? 'Tension immobilière'
                            : 'Pas de tension immobilière'}
                      </b>
                    </BlockContentLiDesc>
                  </BlockContentLi>

                  <BlockLinkLi>
                    <ActionButton
                        path={`/city/${insee}/housing?codeRome=${codeRome}`}
                        libelle={`En savoir plus`}
                        isMobile={isMobile}
                        isBlue={false}
                    />
                  </BlockLinkLi>
                </BlockContentUl>
              </BlockContent>
            </Block>

            <Block isMobile={isMobile}>
              <BlockHeader>
                <BlockHeaderText>
                  <BlockHeaderH2>Cadre de vie</BlockHeaderH2>
                </BlockHeaderText>
                <BlockHeaderRating></BlockHeaderRating>
              </BlockHeader>
              <BlockContent isMobile={isMobile}>
                <BlockContentUl>
                  <BlockContentLi>
                    <BlockContentLiImg src={bread} />
                    <BlockContentLiDesc>
                      <BlockContentLiValue>
                        {bakeriesNumber + ` ` || 'À venir'}
                      </BlockContentLiValue>
                      Boulangeries
                    </BlockContentLiDesc>
                  </BlockContentLi>

                  <BlockContentLi>
                    <BlockContentLiImg src={doctors} />
                    <BlockContentLiDesc>
                      <BlockContentLiValue>
                        {doctorsNumber + ` ` || 'À venir'}
                      </BlockContentLiValue>
                      Médecins
                    </BlockContentLiDesc>
                  </BlockContentLi>

                  <BlockContentLi>
                    <BlockContentLiImg src={restaurantsIcon} />
                    <BlockContentLiDesc>
                      <BlockContentLiValue>
                        {restaurantsNumber + ` ` || 'À venir'}
                      </BlockContentLiValue>
                      Restaurants
                    </BlockContentLiDesc>
                  </BlockContentLi>

                  <BlockLinkLi>
                    <ActionButton
                        path={`/city/${insee}/life?codeRome=${codeRome}`}
                        libelle={`Découvrir le cadre de vie`}
                        isMobile={isMobile}
                        isBlue={false}
                    />
                  </BlockLinkLi>
                </BlockContentUl>
              </BlockContent>
            </Block>
          </BlockContainer>
      )}

      {isMobile && !!similarCities.length && (
        <BlockContainer isMobile={isMobile}>
          <Block isMobile={isMobile}>
            <BlockHeader>
              <BlockHeaderText isMobile={isMobile}>
                <BlockHeaderH2>Villes similaires</BlockHeaderH2>
                <BlockHeaderP>
                  Avec de fortes probabilités d'emploi et de logement
                </BlockHeaderP>
              </BlockHeaderText>
              <BlockHeaderRating></BlockHeaderRating>
            </BlockHeader>
            <BlockContainer isMobile={isMobile}>
              {similarCities.map((similarCity, index) => (
                <BlockContentCity
                  isCenter={
                    (index === 1 && similarCities.length === 3) || isMobile
                  }
                  isMobile={isMobile}
                  key={similarCity.insee_com}
                >
                  <Link
                    to={`/city/${similarCity.insee_com}-${similarCity.nom_comm}?codeRome=${codeRome}`}
                    style={{ color: 'inherit' }}
                  >
                    <BlockContentUl>
                      <BlockContentLi>
                        <BlockContentLiImg
                          src={
                            index === 0
                              ? medalGold
                              : index === 1
                              ? medalSilver
                              : medalBronze
                          }
                        />
                      </BlockContentLi>
                      {/* TODO : <BlockContentLi>
                            <b>XXX offres</b>
                          </BlockContentLi>*/}
                      <BlockContentLi isPaddingReduced={true}>
                        <b>{_.capitalize(similarCity.nom_comm)}</b>
                        <br /> ({similarCity['newRegion.name']})
                      </BlockContentLi>
                    </BlockContentUl>
                  </Link>
                </BlockContentCity>
              ))}
            </BlockContainer>

            <BlockLinkDiv>
              <ActionButton
                path={`/cities?${similarCitiesCriterionsQueryString}`}
                libelle={`Voir toutes les villes`}
                isMobile={isMobile}
                isBlue={false}
              />
            </BlockLinkDiv>
          </Block>
        </BlockContainer>
      )}

      {isMobile && !!closeCities.length && (
        <BlockContainer isMobile={isMobile}>
          <Block isMobile={isMobile}>
            <BlockHeader>
              <BlockHeaderText isMobile={isMobile}>
                <BlockHeaderH2>Villes à proximité</BlockHeaderH2>
              </BlockHeaderText>
              <BlockHeaderP>Avec des logements plus accessibles</BlockHeaderP>
              <BlockHeaderRating></BlockHeaderRating>
            </BlockHeader>
            <BlockContainer isMobile={isMobile}>
              {closeCities.map((closeCity, index) => (
                <BlockContentCity
                  isCenter={index === 1 || isMobile}
                  isMobile={isMobile}
                  key={closeCity.insee_com}
                >
                  <Link
                    to={`/city/${closeCity.insee_com}-${closeCity.nom_comm}?codeRome=${codeRome}`}
                    style={{ color: 'inherit' }}
                  >
                    <BlockContentUl>
                      <BlockContentLi>
                        <BlockContentLiImg
                          src={
                            index === 0
                              ? medalGold
                              : index === 1
                              ? medalSilver
                              : medalBronze
                          }
                        />
                      </BlockContentLi>
                      {/* TODO : <BlockContentLi>
                            <b>XXX Km</b>
                          </BlockContentLi>*/}
                      <BlockContentLi isPaddingReduced={true}>
                        <b>{_.capitalize(closeCity.nom_comm)}</b>
                        <br /> ({closeCity['newRegion.name']})
                      </BlockContentLi>
                    </BlockContentUl>
                  </Link>
                </BlockContentCity>
              ))}
            </BlockContainer>

            <BlockLinkDiv>
              <ActionButton
                path={`/cities?codeRegion=${city.newRegion.code}&codeRome=${codeRome}`}
                libelle={`Voir toutes les villes`}
                isMobile={isMobile}
                isBlue={false}
              />
            </BlockLinkDiv>
          </Block>
        </BlockContainer>
      )}

      <ElementContainer isMobile={isMobile}>
        <CityHousingSimulator city={city}>
          
        </CityHousingSimulator>
      </ElementContainer>

      <ElementContainer isMobile={isMobile}>
        <ActionButton
          path={'/mobility-guide'}
          libelle={`Consultez nos conseils pour votre projet`}
          isMobile={isMobile}
          isBlue={false}
          isWhite={true}
        />
      </ElementContainer>
    </MainLayout>
  )
}

CityPage.propTypes = {}

export default CityPage
