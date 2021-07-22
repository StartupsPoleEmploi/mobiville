import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'

import {
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Checkbox,
  ListItemText
} from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

import { useProfessions } from '../../common/contexts/professionsContext'
import {
  COLOR_GRAY, COLOR_PRIMARY, COLOR_TEXT_PRIMARY, COLOR_TEXT_SECONDARY
} from '../../constants/colors'
import { useCities } from '../../common/contexts/citiesContext'
import { thereAre } from '../../utils/utils'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'

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
  display: flex;
  flex-wrap: wrap;
`

const JobTitleLayout = styled.div`
  display: flex;
  align-items: center;
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
      margin: 8px 0;
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

const StyledFormControl = styled(FormControl).attrs({
  variant: 'filled'
})`
  width: 100px;
  margin-left: 16px;

  .MuiInputBase-root {
    border-radius: 8px;
    overflow: hidden;
  }

  .MuiFilledInput-underline::before {
    border-bottom: none;
  }
`

const ViewMore = styled.p`
  font-weight: 500;
  color: ${COLOR_PRIMARY};
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const MAX_DESCRIPTION_LENGTH = 280

const ONE_DAY = 'ONE_DAY'
const THREE_DAY = 'THREE_DAY'
const ONE_WEEK = 'ONE_WEEK'
const TWO_WEEKS = 'TWO_WEEKS'
const ONE_MONTH = 'ONE_MONTH'
const ALL_TIME = 'ALL_TIME'

const OTHER_CONTRACTS = 'Autres'
const CONTRACT_TYPES = ['CDI', 'CDD', 'MIS', OTHER_CONTRACTS]
const OTHER_DURATIONS = 'Non renseigné'
const DURATION_TYPES = ['Temps plein', 'Temps partiel', OTHER_DURATIONS]

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

  useEffect(() => {
    if (city && rome && rome.length) {
      onSearchProfessions({ code_rome: rome, insee: [city.insee_com] })
      onSearchInfosTravail({ code_rome: rome[0], insee: city.insee_com }).then(setInfosTravail)
    }
  }, [city])

  const contractCountObject = {}
  const durationCountObject = {}
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

    if (contractFilters.length) {
      // If we have contracts, 2 choices :
      // - It’s a contract type we handle specifically (eg. CDI, CDD, MIS)
      // - It’s a contract type we do not handle (and we only match it when "others" is selected)
      if (
        !contractFilters.includes(profession.typeContrat)
        && CONTRACT_TYPES.includes(profession.typeContrat)
      ) {
        return false
      }
    }

    // if we have a duration filter, either it’s filled (and we handle it explicitely)
    // or it’s undefined in the data, which means it’s in our "other" category
    if (durationFilters.length && (
      (
        profession.dureeTravailLibelleConverti
        && !durationFilters.includes(profession.dureeTravailLibelleConverti)
      ) || (!profession.dureeTravailLibelleConverti && !durationFilters.includes(OTHER_DURATIONS))
    )) {
      return false
    }

    return true
  })

  displayedProfessions.forEach(({ typeContrat, dureeTravailLibelleConverti }) => {
    if (CONTRACT_TYPES.includes(typeContrat)) {
      contractCountObject[typeContrat] = (contractCountObject[typeContrat] || 0) + 1
    } else {
      contractCountObject[OTHER_CONTRACTS] = (contractCountObject[typeContrat] || 0) + 1
    }

    if (DURATION_TYPES.includes(dureeTravailLibelleConverti)) {
      durationCountObject[dureeTravailLibelleConverti] = (
        durationCountObject[dureeTravailLibelleConverti] || 0
      ) + 1
    } else {
      durationCountObject[OTHER_DURATIONS] = (durationCountObject[OTHER_DURATIONS] || 0) + 1
    }
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
              <div style={{ flex: '0 1 40%' }}>
                {displayedProfessions.length}
                {' '}
                offre
                {displayedProfessions.length > 1 ? 's' : ''}
                {' pour '}
                {romeLabel}
                <br />
                <span style={{ fontSize: 12 }}>Dans un rayon de 30 km</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', flex: '0 0 60%' }}>
                <StyledFormControl>
                  <InputLabel htmlFor="filter-date-creation">
                    Date
                  </InputLabel>
                  <Select
                    inputProps={{
                      id: 'filter-date-creation'
                    }}
                    label="Date de création"
                    value={dateFilter}
                    onChange={(event) => setDateFilter(event.target.value)}
                  >
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
                    <MenuItem value={ALL_TIME}>
                      Toutes les offres
                    </MenuItem>
                  </Select>
                </StyledFormControl>

                <StyledFormControl>
                  <InputLabel htmlFor="filter-contract">
                    Contrat
                  </InputLabel>
                  <Select
                    inputProps={{
                      id: 'filter-contract'
                    }}
                    label="Contrat"
                    multiple
                    value={contractFilters}
                    onChange={(event) => {
                      setContractFilters(event.target.value)
                    }}
                    // quick & dirty replace of the only label that needs it
                    renderValue={(selected) => selected.join(', ').replace('MIS', 'Intérim')}
                  >
                    {CONTRACT_TYPES.map(
                      (filter) => {
                        const isChecked = contractFilters.includes(filter)
                        const label = filter.concat(
                          contractFilters.length === 0 || isChecked
                            ? ` (${contractCountObject[filter] || 0})`
                            : ''
                        )
                        return (
                          <MenuItem
                            value={filter}
                          >
                            <Checkbox checked={isChecked} />
                            <ListItemText
                              // quick & dirty replace of the only label that needs it
                              primary={label.replace('MIS', 'Intérim')}
                            />
                          </MenuItem>
                        )
                      }
                    )}
                  </Select>
                </StyledFormControl>

                <StyledFormControl>
                  <InputLabel htmlFor="filter-duration">
                    Durée
                  </InputLabel>
                  <Select
                    inputProps={{
                      id: 'filter-duration'
                    }}
                    label="Durée"
                    multiple
                    value={durationFilters}
                    onChange={(event) => {
                      setDurationFilters(event.target.value)
                    }}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {DURATION_TYPES.map(
                      (filter) => {
                        const isChecked = durationFilters.includes(filter)
                        const label = filter.concat(
                          durationFilters.length === 0 || isChecked
                            ? ` (${durationCountObject[filter] || 0})`
                            : ''
                        )

                        return (
                          <MenuItem
                            value={filter}
                          >
                            <Checkbox checked={durationFilters.includes(filter)} />
                            <ListItemText primary={label} />
                          </MenuItem>
                        )
                      }
                    )}
                  </Select>
                </StyledFormControl>
              </div>
            </JobTitleLayout>

            <JobContentLayout>
              {isLoadingProfessions && <p>Chargement des métiers</p>}
              {displayedProfessions.map((p) => {
                // We truncate too long descriptions
                const description = p.description.length > MAX_DESCRIPTION_LENGTH
                  ? p.description.slice(0, MAX_DESCRIPTION_LENGTH).concat(
                    p.description.slice(MAX_DESCRIPTION_LENGTH).split(' ')[0]
                  )
                    .concat('…') : p.description

                const contractLabel = p.typeContrat === 'CDI' || p.typeContrat === 'CDD' ? p.typeContrat : p.typeContratLibelle

                return (
                  <JobItem key={p.id}>
                    { /* eslint-disable-next-line */ }
                  <a href={p.origineOffre.urlOrigine} target="_blank" tag-exit="offres-d-emplois">
                    <p className="title">{p.appellationlibelle}</p>
                    {p.entreprise && p.entreprise.nom && (<p className="enterprise">{p.entreprise.nom}</p>)}
                    <p className="description">
                      {description}
                    </p>

                    <ViewMore>
                      En savoir plus
                      <ArrowForwardIcon fontSize="small" style={{ marginLeft: 8 }} />
                    </ViewMore>

                    <div className="actions">
                      <p className="date">{thereAre(p.dateCreation)}</p>
                      <p className="type">
                        {contractLabel}
                        {p.dureeTravailLibelleConverti && ` - ${p.dureeTravailLibelleConverti}`}
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
