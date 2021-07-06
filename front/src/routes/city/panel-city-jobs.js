import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'

import {
  FormControl,
  MenuItem,
  InputLabel,
  Select
} from '@material-ui/core'

import { useProfessions } from '../../common/contexts/professionsContext'
import { COLOR_GRAY, COLOR_TEXT_PRIMARY, COLOR_TEXT_SECONDARY } from '../../constants/colors'
import { useCities } from '../../common/contexts/citiesContext'
import { thereAre } from '../../utils/utils'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'

const ONE_DAY = 'ONE_DAY'
const THREE_DAY = 'THREE_DAY'
const ONE_WEEK = 'ONE_WEEK'
const TWO_WEEKS = 'TWO_WEEKS'
const ONE_MONTH = 'ONE_MONTH'

const MainLayout = styled.div`
  display: flex;
  align-items: flex-start;
  margin: auto;
  max-width: 1024px;

  ${(props) => (props.isMobileView ? `
    flex-direction: column;

    > div {
      margin-right: 0;
      margin-bottom: 2px;
      box-shadow: none;
      border-radius: 0;
      width: 100%;
    }
  ` : '')}
`

const StatistiqueLayout = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  width: 400px;
  padding: 16px;
  margin-right: 16px;
`

const StatistiqueTitleLayout = styled.p`
  font-weight: bold;
  margin-bottom: 32px;
  margin-top: 0;
`

const StatistiqueItem = styled.div`
  img {
    display: block;
    margin: auto;
  }

  p {
    margin: 2px 0 4px 0;
    text-align: center;
    font-weight: bold;
  }
`

const JobLayout = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  flex: 1;
  padding: 16px;
`

const JobContentLayout = styled.div`

`

const JobTitleLayout = styled.div`
  font-weight: bold;
  font-size: 14px;
  padding-bottom: 16px;
  border-bottom: 2px solid ${COLOR_GRAY};
`

const JobItem = styled.div`
  padding: 16px 0;
  border-bottom: 2px solid ${COLOR_GRAY};

  a {
    text-decoration: none;
    color: ${COLOR_TEXT_PRIMARY};

    .title {
      font-weight: bold;
      font-size: 14px;
      margin-bottom: 0;
    }

    .enterprise {
      text-transform: uppercase;
      color: ${COLOR_TEXT_SECONDARY};
      font-size: 12px;
      margin-bottom: 0;
    }

    .description {
      margin-top: 8px;
      margin-bottom: 16px;
      font-size: 12px;
      color: black;
      max-height: 98px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .actions {
      font-size: 12px;
      color: ${COLOR_TEXT_SECONDARY};
      font-weight: 500;
      display: flex;
      justify-content: space-between;
    }
  }
`

const MAX_DESCRIPTION_LENGTH = 280

const PanelCityJobs = ({ city, rome }) => {
  const {
    isLoading: isLoadingProfessions,
    onSearch: onSearchProfessions,
    onSearchInfosTravail,
    professions
  } = useProfessions()
  const {
    criterions
  } = useCities()
  const size = useWindowSize()
  const [infosTravail, setInfosTravail] = useState(null)
  const [dateFilter, setDateFilter] = useState('')
  const [contractFilters, setContractFilters] = useState([])
  const [durationFilters, setDurationFilters] = useState([])
  const [contractFilter, setContractFilter] = useState('')
  const [durationFilter, setDurationFilter] = useState('')

  useEffect(() => {
    if (city && rome && rome.length) {
      onSearchProfessions({ code_rome: rome, insee: [city.insee_com] })
      onSearchInfosTravail({ code_rome: rome[0], insee: city.insee_com }).then(setInfosTravail)
    }
  }, [city])

  useEffect(() => {
    setContractFilters(professions.reduce((prev, { typeContrat }) => {
      if (prev.includes(typeContrat) || !typeContrat) return prev
      return prev.concat(typeContrat)
    }, []))

    setDurationFilters(professions.reduce((prev, { dureeTravailLibelleConverti }) => {
      if (prev.includes(dureeTravailLibelleConverti) || !dureeTravailLibelleConverti) return prev
      return prev.concat(dureeTravailLibelleConverti)
    }, []))
  }, [professions])

  let romeLabel = ''
  if (criterions && criterions.codeRomes && rome && rome.length) {
    const finded = criterions.codeRomes.find((c) => c.key === rome[0])
    if (finded) {
      romeLabel = finded.label.toLowerCase()

      if (professions.length) {
        romeLabel = romeLabel.replace(/e\)/g, 'es)')
      }
    }
  }

  const displayedProfessions = professions.filter((profession) => {
    if (!profession.id) return false

    if (dateFilter) {
      const currentMoment = moment()
      const creationMoment = moment(profession.dateCreation)

      if (dateFilter === ONE_DAY && currentMoment.isAfter(creationMoment.add(1, 'days'))) return false
      if (dateFilter === THREE_DAY && currentMoment.isAfter(creationMoment.add(3, 'days'))) return false
      if (dateFilter === ONE_WEEK && currentMoment.isAfter(creationMoment.add(7, 'days'))) return false
      if (dateFilter === TWO_WEEKS && currentMoment.isAfter(creationMoment.add(14, 'days'))) return false
      if (dateFilter === ONE_MONTH && currentMoment.isAfter(creationMoment.add(1, 'month'))) return false
    }

    if (contractFilter && profession.typeContrat !== contractFilter) return false
    if (durationFilter && profession.dureeTravailLibelleConverti !== durationFilter) return false

    return true
  })

  return (
    <MainLayout isMobileView={isMobileView(size)}>
      {rome && (
        <>
          <StatistiqueLayout>
            <StatistiqueTitleLayout>
              Statistique pour
              {' '}
              {romeLabel}
              {' '}
              à
              {' '}
              {city.nom_comm}
            </StatistiqueTitleLayout>
            <StatistiqueItem>
              <img src="/icons/euro.svg" alt="euro" />
              <p>Salaire brut</p>
              {infosTravail && infosTravail.min ? (
                <p>
                  {infosTravail.min}
                  € à
                  {' '}
                  {infosTravail.max}
                  €
                </p>
              ) : (<p>A venir</p>)}
            </StatistiqueItem>

          </StatistiqueLayout>
          <JobLayout>
            <JobTitleLayout>
              {displayedProfessions.length}
              {' '}
              offre
              {displayedProfessions.length > 1 ? 's' : ''}
              {' pour '}
              {romeLabel}
              {' '}
              dans un rayon de 30 km
            </JobTitleLayout>
            <JobContentLayout>
              <div>
                <FormControl fullWidth>
                  <InputLabel htmlFor="filter-date-creation" shrink>
                    Date de création
                  </InputLabel>
                  <Select
                    displayEmpty
                    inputProps={{
                      id: 'filter-date-creation'
                    }}
                    value={dateFilter}
                    onChange={(event) => setDateFilter(event.target.value)}
                  >
                    <MenuItem value="">Toutes les offres</MenuItem>
                    <MenuItem value={ONE_DAY}>
                      Un jour
                    </MenuItem>
                    <MenuItem value={THREE_DAY}>
                      Trois jours
                    </MenuItem>
                    <MenuItem value={ONE_WEEK}>
                      Une semaine
                    </MenuItem>
                    <MenuItem value={TWO_WEEKS}>
                      Deux semaines
                    </MenuItem>
                    <MenuItem value={ONE_MONTH}>
                      Un mois
                    </MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel htmlFor="filter-contract" shrink>
                    Contrat
                  </InputLabel>
                  <Select
                    displayEmpty
                    inputProps={{
                      id: 'filter-contract'
                    }}
                    value={contractFilter}
                    onChange={(event) => setContractFilter(event.target.value)}
                  >
                    <MenuItem value="" />
                    {contractFilters.map(
                      (filter) => (
                        <MenuItem
                          value={filter}
                        >
                          {filter}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel htmlFor="filter-duration" shrink>
                    Durée hebdo.
                  </InputLabel>
                  <Select
                    displayEmpty
                    inputProps={{
                      id: 'filter-duration'
                    }}
                    value={durationFilter}
                    onChange={(event) => setDurationFilter(event.target.value)}
                  >
                    <MenuItem value="" />
                    {durationFilters.map(
                      (filter) => (
                        <MenuItem
                          value={filter}
                        >
                          {filter}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>

              </div>

              {isLoadingProfessions && <p>Chargement des métiers</p>}
              {displayedProfessions.map((p) => {
                // We truncate too long descriptions
                const description = p.description.length > MAX_DESCRIPTION_LENGTH
                  ? p.description.slice(0, MAX_DESCRIPTION_LENGTH).concat(
                    p.description.slice(MAX_DESCRIPTION_LENGTH).split(' ')[0]
                  )
                    .concat('…') : p.description
                return (
                  <JobItem key={p.id}>
                    { /* eslint-disable-next-line */ }
                  <a href={p.origineOffre.urlOrigine} target="_blank" tag-exit="offres-d-emplois">
                    <p className="title">{p.appellationlibelle}</p>
                    {p.entreprise && p.entreprise.nom && (<p className="enterprise">{p.entreprise.nom}</p>)}
                    <p className="description">
                      {description}
                    </p>
                    <div className="actions">
                      <p className="date">{thereAre(p.dateCreation)}</p>
                      <p className="type">
                        {p.typeContrat}
                        {' '}
                        -
                        {' '}
                        {p.dureeTravailLibelleConverti}
                      </p>
                    </div>
                  </a>
                  </JobItem>
                )
              })}
            </JobContentLayout>
          </JobLayout>
        </>
      )}
    </MainLayout>
  )
}

PanelCityJobs.propTypes = {
  city: PropTypes.object.isRequired,
  rome: PropTypes.array.isRequired
}

PanelCityJobs.defaultProps = {
}

export default PanelCityJobs
