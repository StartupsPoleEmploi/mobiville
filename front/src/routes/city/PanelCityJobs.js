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
  ListItemText,
  TextField,
  InputAdornment,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import EuroIcon from '@material-ui/icons/Euro'
import DescriptionIcon from '@material-ui/icons/Description'
import ScheduleIcon from '@material-ui/icons/Schedule'

import { useProfessions } from '../../common/contexts/professionsContext'
import {
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_TEXT_SECONDARY,
} from '../../constants/colors'
import { thereAre, ucFirstOnly } from '../../utils/utils'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'

const MainLayout = styled.div`
  display: flex;
  align-items: flex-start;
  margin: auto;
  max-width: 1024px;
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
`

const StatistiqueLayout = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12),
    0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  width: 400px;
  padding: 16px;
  margin-right: 16px;
  text-align: center;

  ${({ isMobile }) =>
    isMobile
      ? `
      margin-right: 0;
      box-shadow: none;
      border-radius: 0;
      width: 100%;
  `
      : ''}
`

const StatistiqueTitleLayout = styled.h3`
  font-size: 12px;
  margin-bottom: 32px;
  margin-top: 0;
`

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
`

const StatsItem = styled.div`
  flex: 0 1 40%;

  img {
    display: block;
    margin: auto;
  }
`

const JobLayout = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12),
    0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  flex: 1;
  padding: 16px;

  ${({ isMobile }) =>
    isMobile
      ? `
      box-shadow: none;
      border-radius: 0;
  `
      : ''}
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
  display: flex;
  flex-direction: column;
  width: 100%;
`

const JobItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const JobItemTitle = styled.h4`
  margin: 0;
  font-size: 14px;
`

const JobItemAdditionalInfos = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 0;
  color: ${COLOR_TEXT_SECONDARY};
`

const JobItemAdditionalInfo = styled.li`
  display: flex;
  align-items: center;
`

const StyledFormControl = styled(FormControl).attrs({
  variant: 'filled',
})`
  width: 100px;
  margin-left: 16px;
  margin-bottom: 8px;

  .MuiInputBase-root {
    border-radius: 8px;
    overflow: hidden;
  }

  .MuiFilledInput-underline::before {
    border-bottom: none;
  }

  // The two styles below are to allow ellipsis, because the labels
  // of the filter fields are too long.
  // These can be removed once the fields are reworked to be bigger
  .MuiInputLabel-root {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 75%;
    height: 100%;
  }
  .MuiInputLabel-shrink {
    max-width: 109%;
  }
`

const ViewMoreButton = styled.button.attrs({
  role: 'button',
})`
  font-weight: 500;
  color: ${COLOR_PRIMARY};
  margin: 0;
  display: flex;
  align-items: center;
  background: transparent;
  border: 0;
  cursor: pointer;
`

const ApplyToJobLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR_PRIMARY};
  border-radius: 16px;
  border: 0;
  color: #fff;
  height: 32px;
  padding: 8px 24px;
  font-size: 18px;
`

const MAX_DESCRIPTION_LENGTH = 480

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

const PanelCityJobs = ({
  city,
  codeRome,
  romeLabel,
  searchValue,
  setSearchValue,
}) => {
  const {
    isLoading: isLoadingProfessions,
    onSearch: onSearchProfessions,
    onSearchInfosTravail,
    professions,
  } = useProfessions()
  const size = useWindowSize()
  const [infosTravail, setInfosTravail] = useState(null)
  const [dateFilter, setDateFilter] = useState('')
  const [contractFilters, setContractFilters] = useState([])
  const [durationFilters, setDurationFilters] = useState([])
  const [fullJobsOnDisplay, setFullJobsOnDisplay] = useState({})

  const toggleFullJobDisplay = (id) =>
    setFullJobsOnDisplay({ ...fullJobsOnDisplay, [id]: !fullJobsOnDisplay[id] })

  useEffect(() => {
    if (city && codeRome) {
      onSearchProfessions({ codeRome: [codeRome], insee: [city.insee_com] })
      onSearchInfosTravail({ codeRome: codeRome, insee: city.insee_com }).then(
        setInfosTravail
      )
    }
  }, [city, codeRome])

  const bassinTension = infosTravail?.bassinTension
  const deptTension = infosTravail?.deptTension

  const contractCountObject = {}
  const durationCountObject = {}

  const displayedProfessions = professions.filter((profession) => {
    if (!profession.id) return false

    if (dateFilter) {
      const currentMoment = moment()
      const creationMoment = moment(profession.dateCreation)

      if (
        dateFilter === ONE_DAY &&
        currentMoment.isAfter(creationMoment.add(1, 'days'))
      )
        return false
      if (
        dateFilter === THREE_DAY &&
        currentMoment.isAfter(creationMoment.add(3, 'days'))
      )
        return false
      if (
        dateFilter === ONE_WEEK &&
        currentMoment.isAfter(creationMoment.add(7, 'days'))
      )
        return false
      if (
        dateFilter === TWO_WEEKS &&
        currentMoment.isAfter(creationMoment.add(14, 'days'))
      )
        return false
      if (
        dateFilter === ONE_MONTH &&
        currentMoment.isAfter(creationMoment.add(1, 'month'))
      )
        return false
    }

    if (contractFilters.length) {
      // If we have contracts, 2 choices :
      // - It’s a contract type we handle specifically (eg. CDI, CDD, MIS)
      // - It’s a contract type we do not handle (and we only match it when "others" is selected)
      if (
        !contractFilters.includes(profession.typeContrat) &&
        CONTRACT_TYPES.includes(profession.typeContrat)
      ) {
        return false
      }
    }

    // if we have a duration filter, either it’s filled (and we handle it explicitely)
    // or it’s undefined in the data, which means it’s in our "other" category
    if (
      durationFilters.length &&
      ((profession.dureeTravailLibelleConverti &&
        !durationFilters.includes(profession.dureeTravailLibelleConverti)) ||
        (!profession.dureeTravailLibelleConverti &&
          !durationFilters.includes(OTHER_DURATIONS)))
    ) {
      return false
    }

    // Finally, this search filter
    // Another way would be to access one by one every property we might want to search
    // but this is faster and less error prone that accessing these objects with lose structure
    const dataToSearch = JSON.stringify(profession).toLowerCase()

    if (!dataToSearch.includes(searchValue.trim().toLowerCase())) {
      return false
    }

    return true
  })

  displayedProfessions.forEach(
    ({ typeContrat, dureeTravailLibelleConverti }) => {
      if (CONTRACT_TYPES.includes(typeContrat)) {
        contractCountObject[typeContrat] =
          (contractCountObject[typeContrat] || 0) + 1
      } else {
        contractCountObject[OTHER_CONTRACTS] =
          (contractCountObject[typeContrat] || 0) + 1
      }

      if (DURATION_TYPES.includes(dureeTravailLibelleConverti)) {
        durationCountObject[dureeTravailLibelleConverti] =
          (durationCountObject[dureeTravailLibelleConverti] || 0) + 1
      } else {
        durationCountObject[OTHER_DURATIONS] =
          (durationCountObject[OTHER_DURATIONS] || 0) + 1
      }
    }
  )

  const isMobile = isMobileView(size)

  return (
    <MainLayout isMobile={isMobile}>
      <StatistiqueLayout isMobile={isMobile}>
        <StatistiqueTitleLayout>
          Statistiques pour {romeLabel} à {ucFirstOnly(city.nom_comm)}
        </StatistiqueTitleLayout>
        <StatsContainer>
          {(bassinTension || deptTension) && (
            <StatsItem>
              <div>
                <img src="/icons/trending-up.svg" alt="" />
                <b>
                  {bassinTension || deptTension} offres pour 10 demandeurs{' '}
                  {bassinTension
                    ? 'dans ce bassin d’emploi'
                    : 'dans ce département'}
                </b>
              </div>
            </StatsItem>
          )}

          <StatsItem>
            <img src="/icons/euro.svg" alt="" />
            <b>Salaire brut</b>
            <br />
            {infosTravail?.min > 0 ? (
              <b>
                {infosTravail.min}€ à {infosTravail.max}€
              </b>
            ) : (
              <b>A venir</b>
            )}
          </StatsItem>
        </StatsContainer>
      </StatistiqueLayout>
      <JobLayout isMobile={isMobile}>
        <FormControl fullWidth style={{ paddingBottom: '16px' }}>
          <TextField
            label="Rechercher dans les offres"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <JobTitleLayout>
          <h3 style={{ flex: '0 1 35%' }}>
            {displayedProfessions.length} offre
            {displayedProfessions.length > 1 ? 's' : ''}
            {' pour '}
            {romeLabel}
            <br />
            <span style={{ fontSize: 12 }}>Dans un rayon de 30 km</span>
          </h3>

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              flex: '0 0 65%',
              flexWrap: 'wrap',
            }}
          >
            <StyledFormControl>
              <InputLabel htmlFor="filter-date-creation">
                Date de publication
              </InputLabel>
              <Select
                inputProps={{
                  id: 'filter-date-creation',
                }}
                label="Date de publication"
                value={dateFilter}
                onChange={(event) => setDateFilter(event.target.value)}
              >
                <MenuItem value={ONE_DAY}>Un jour</MenuItem>
                <MenuItem value={THREE_DAY}>Trois jours</MenuItem>
                <MenuItem value={ONE_WEEK}>Une semaine</MenuItem>
                <MenuItem value={TWO_WEEKS}>Deux semaines</MenuItem>
                <MenuItem value={ONE_MONTH}>Un mois</MenuItem>
                <MenuItem value={ALL_TIME}>Toutes les offres</MenuItem>
              </Select>
            </StyledFormControl>

            <StyledFormControl>
              <InputLabel htmlFor="filter-contract">Contrat</InputLabel>
              <Select
                inputProps={{
                  id: 'filter-contract',
                }}
                label="Contrat"
                multiple
                value={contractFilters}
                onChange={(event) => {
                  setContractFilters(event.target.value)
                }}
                // quick & dirty replace of the only label that needs it
                renderValue={(selected) =>
                  selected.join(', ').replace('MIS', 'Intérim')
                }
              >
                {CONTRACT_TYPES.map((filter) => {
                  const isChecked = contractFilters.includes(filter)
                  const label = filter.concat(
                    contractFilters.length === 0 || isChecked
                      ? ` (${contractCountObject[filter] || 0})`
                      : ''
                  )
                  return (
                    <MenuItem value={filter}>
                      <Checkbox checked={isChecked} />
                      <ListItemText
                        // quick & dirty replace of the only label that needs it
                        primary={label.replace('MIS', 'Intérim')}
                      />
                    </MenuItem>
                  )
                })}
              </Select>
            </StyledFormControl>

            <StyledFormControl>
              <InputLabel htmlFor="filter-duration">Durée hebdo</InputLabel>
              <Select
                inputProps={{
                  id: 'filter-duration',
                }}
                label="Durée hebdo"
                multiple
                value={durationFilters}
                onChange={(event) => {
                  setDurationFilters(event.target.value)
                }}
                renderValue={(selected) => selected.join(', ')}
              >
                {DURATION_TYPES.map((filter) => {
                  const isChecked = durationFilters.includes(filter)
                  const label = filter.concat(
                    durationFilters.length === 0 || isChecked
                      ? ` (${durationCountObject[filter] || 0})`
                      : ''
                  )

                  return (
                    <MenuItem value={filter}>
                      <Checkbox checked={durationFilters.includes(filter)} />
                      <ListItemText primary={label} />
                    </MenuItem>
                  )
                })}
              </Select>
            </StyledFormControl>
          </div>
        </JobTitleLayout>

        <JobContentLayout>
          {isLoadingProfessions && <p>Chargement des métiers</p>}
          {displayedProfessions.map((p) => {
            // We truncate too long descriptions. "?", as it seems they can be absent.
            const shortDescription =
              p.description?.length > MAX_DESCRIPTION_LENGTH
                ? p.description
                    .slice(0, MAX_DESCRIPTION_LENGTH)
                    .concat(
                      p.description.slice(MAX_DESCRIPTION_LENGTH).split(' ')[0]
                    )
                    .concat('…')
                : p.description

            const contractLabel =
              p.typeContrat === 'CDI' || p.typeContrat === 'CDD'
                ? p.typeContrat
                : p.typeContratLibelle

            return (
              <JobItem key={p.id}>
                <JobItemHeader>
                  <div>
                    <JobItemTitle>{p.appellationlibelle}</JobItemTitle>
                    {p.entreprise?.nom && (
                      <div style={{ color: COLOR_TEXT_SECONDARY }}>
                        {p.entreprise.nom}
                      </div>
                    )}
                    {p.lieuTravail?.libelle && (
                      <div style={{ color: COLOR_TEXT_SECONDARY }}>
                        {p.lieuTravail.libelle} -{' '}
                        <a
                          href={`https://fr.mappy.com/plan#/${p.lieuTravail.libelle}`}
                          target="_blank"
                          referer="noreferrer noopener"
                        >
                          Localiser avec Mappy
                        </a>
                      </div>
                    )}
                  </div>
                  {fullJobsOnDisplay[p.id] && !isMobile && (
                    <ApplyToJobLink
                      href={p.origineOffre.urlOrigine}
                      target="_blank"
                      tag-exit="offres-d-emplois"
                    >
                      Postuler
                    </ApplyToJobLink>
                  )}
                </JobItemHeader>
                <p className="description">
                  {fullJobsOnDisplay[p.id] ? (
                    <>
                      {p.description.split('\n').map((text) => (
                        <>
                          <span>{text}</span>
                          <br />
                        </>
                      ))}
                    </>
                  ) : (
                    shortDescription
                  )}
                </p>

                <JobItemAdditionalInfos>
                  {p.salaire?.libelle && (
                    <JobItemAdditionalInfo>
                      <EuroIcon style={{ fontSize: 13, marginRight: 8 }} />
                      Salaire : {p.salaire?.libelle}
                    </JobItemAdditionalInfo>
                  )}
                  <JobItemAdditionalInfo>
                    <DescriptionIcon style={{ fontSize: 13, marginRight: 8 }} />
                    {contractLabel}{' '}
                    {p.dureeTravailLibelleConverti &&
                      ` - ${p.dureeTravailLibelleConverti}`}
                  </JobItemAdditionalInfo>
                  <JobItemAdditionalInfo>
                    <ScheduleIcon style={{ fontSize: 13, marginRight: 8 }} />
                    {thereAre(p.dateCreation)}
                  </JobItemAdditionalInfo>
                </JobItemAdditionalInfos>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: isMobile ? 'space-between' : 'flex-end',
                  }}
                >
                  {fullJobsOnDisplay[p.id] && isMobile ? (
                    <ApplyToJobLink
                      href={p.origineOffre.urlOrigine}
                      target="_blank"
                      tag-exit="offres-d-emplois"
                    >
                      Postuler
                    </ApplyToJobLink>
                  ) : (
                    <div />
                  )}

                  <ViewMoreButton onClick={() => toggleFullJobDisplay(p.id)}>
                    {fullJobsOnDisplay[p.id] ? (
                      <>
                        Voir moins
                        <ArrowUpwardIcon
                          fontSize="small"
                          style={{ marginLeft: 8 }}
                        />
                      </>
                    ) : (
                      <>
                        En savoir plus
                        <ArrowDownwardIcon
                          fontSize="small"
                          style={{ marginLeft: 8 }}
                        />
                      </>
                    )}
                  </ViewMoreButton>
                </div>
              </JobItem>
            )
          })}
        </JobContentLayout>
      </JobLayout>
    </MainLayout>
  )
}

PanelCityJobs.propTypes = {
  city: PropTypes.object.isRequired,
  codeRome: PropTypes.string.isRequired,
}

PanelCityJobs.defaultProps = {}

export default PanelCityJobs
