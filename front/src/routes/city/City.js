import React, { useEffect, useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import queryString from 'query-string'
import { Helmet } from 'react-helmet-async'
import { CircularProgress } from '@mui/material'

import CityJobs from './cityJobs/CityJobs'
import CityHome from './cityHome/CityHome'
import CityServices from './cityServices/CityServices'
import CityCloseCities from './cityCloseCities/CityCloseCities'
import CityMenuBack from './components/CityMenuBack'
import { MainLayout, TopPageButton } from '../../components'

import { COLOR_WHITE } from '../../constants/colors'
import { capitalize, ucFirst, wordsCapitalize } from '../../utils/utils'
import { useDevice, useCities, useProfessions } from '../../common/contexts'

const JOB = 'metier'
const LIFE = 'services'
const CLOSE_CITIES = 'villes-proches'

const CityPage = () => {
  const { isMobile } = useDevice()
  const { onLoadCity, isLoadingCity, city, criterions, unloadCity } =
    useCities()
  const { onSearch: onSearchProfessions } = useProfessions()

  const location = useLocation()
  const { insee, section } = useParams()
  const [inseeCode] = insee.split('-')

  const params = queryString.parse(location.search)

  const codeRome = params?.codeRome || ''
  let romeLabel = ''

  if (criterions?.codeRomes && codeRome) {
    const foundLabel =
      criterions.codeRomes.find((c) => c.key === codeRome)?.label || ''
    romeLabel = foundLabel.toLowerCase()
  }

  const backLink = useMemo(() => {
    if (city?.code_dept === '97') {
      return `/departement/${city?.code_region}-${city?.nom_dept?.toLowerCase()}`
    }
    if (!codeRome) return `/departement/${city?.departement?.code}`
    return `/villes?codeRome=${codeRome}${
      city?.region?.code ? `&codeRegion=${city?.region?.code}` : ''
    }`
  }, [codeRome, city])

  useEffect(() => {
    onLoadCity(inseeCode)

    return () => {
      unloadCity()
    }
  }, [inseeCode])

  useEffect(() => {
    if (!city?.insee_com) return

    onSearchProfessions({
      ...(codeRome && codeRome !== '' ? { codeRome: [codeRome] } : null),
      insee: [city.insee_com],
    })
  }, [city?.insee_com, codeRome])

  const currentSection = useMemo(() => {
    if (!city) return
    if (JOB === section) {
      return <CityJobs codeRome={codeRome} romeLabel={romeLabel} />
    } else if (CLOSE_CITIES === section) {
      return <CityCloseCities backLink={backLink} codeRome={codeRome} />
    } else if (LIFE === section) {
      return <CityServices />
    }
    return <CityHome romeLabel={romeLabel} codeRome={codeRome} insee={insee} />
  }, [section, city, codeRome, romeLabel, backLink, insee])

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

  return (
    <MainLayout menu={{ visible: !isMobile }}>
      <Helmet>
        <title>
          {!!romeLabel ? `${ucFirst(romeLabel)} à ` : ''}
          {wordsCapitalize(city.nom_comm)} | Mobiville
        </title>
        <meta
          name="description"
          content={`Explorez le marché de l'emploi de ${capitalize(
            city.nom_comm
          )} pour le métier de ${romeLabel} ainsi que les informations sur l’immobilier, les services et les équipements.`}
        />
      </Helmet>

      <CityMenuBack
        backLink={backLink}
        isMobile={isMobile}
        background={
          [JOB, CLOSE_CITIES].includes(section) && !isMobile
            ? 'none'
            : COLOR_WHITE
        }
        showAdvicesButton={
          false // désactivé tant que la page n'a pas été refondu
          // !isMobile && ![LIFE, JOB, CLOSE_CITIES].includes(section)
        }
      />

      {currentSection}

      <TopPageButton />
    </MainLayout>
  )
}

CityPage.propTypes = {}

export default CityPage
