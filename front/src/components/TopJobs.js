import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { Chip, CircularProgress } from '@mui/material'

import { ReactComponent as RightChevronIcon } from '../assets/images/icons/right_chevron.svg'

import { COLOR_PRIMARY, COLOR_WHITE } from '../constants/colors'
import { formatCityUrl, wordsCapitalize } from '../utils/utils'
import { SectionHeader } from '.'
import { useDevice } from '../common/contexts'

const Container = styled.div`
  color: ${COLOR_PRIMARY};
`

const JobsContainer = styled.div`
  max-width: 1072px; // 1040px + 2*16px
  width: 100%;
  margin: 25px auto;
  padding: 1px 16px;
  overflow-x: ${({ $isMobile }) => ($isMobile ? 'scroll' : 'auto')};

  display: grid;
  grid-auto-rows: ${({ $isMobile }) => ($isMobile ? '100px' : '80px')};
  gap: 8px 24px;
  ${({ $isMobile }) =>
    $isMobile
      ? css`
          grid-template-columns: repeat(2, minmax(80vw, 1fr));
        `
      : css`
          grid-template-columns: repeat(2, 1fr);
        `}
`

const JobLabel = styled(Link)`
  width: 100%;
  padding: 30px;
  border-radius: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: ${COLOR_WHITE};
  font-size: ${({ $isMobile }) => ($isMobile ? '16px' : '18px')};
  font-weight: 700;
  text-align: start;
  overflow: hidden;

  &&:hover {
    box-shadow: 0px 0px 0px 1px ${COLOR_PRIMARY};
    -webkit-box-shadow: 0px 0px 0px 1px ${COLOR_PRIMARY};
    -moz-box-shadow: 0px 0px 0px 1px ${COLOR_PRIMARY};
  }
  & .MuiChip-root {
    margin-right: 5px;
  }
`

const TopJobs = ({ departement, city }) => {
  const { isMobile } = useDevice()
  const [topJobs, setTopJobs] = useState(null)

  useEffect(() => {
    if (!departement && !city?.insee_com) return

    fetch(
      !!city?.insee_com
        ? `/api/cities/${city?.insee_com}/topJobs`
        : `/api/departement/${departement.code}/topJobs`
    )
      .then((response) => response.json())
      .then((jobOffers) => setTopJobs(jobOffers))
  }, [departement, city?.insee_com])

  const spinner = (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
      }}
    >
      <CircularProgress />
      {/* <p>Chargement...</p> */}
      <p></p>
    </div>
  )

  const isOutremer = (codeDepartement) =>
    ['1', '2', '3', '4', '5', '6'].includes(codeDepartement)

  const urlToSearch = (job) => {
    if (!!departement?.code) {
      if (isOutremer(departement.code)) {
        // les outremer sont considéré comme region dans l'autocomplétion des lieux
        return `/villes?codeRome=${job.codeRome}&codeRegion=${departement.code}`
      }
      return `/villes?codeRome=${job.codeRome}&codeDepartement=${departement.code}`
    }
    return formatCityUrl(city, job.rome)
  }

  return (
    <Container>
      <SectionHeader
        title={
          !!departement?.name
            ? `Les métiers avec le plus d'offres dans le département ${departement?.name}`
            : `Les métiers avec le plus d'offres à ${wordsCapitalize(
                city?.nom_comm
              )}`
        }
        centerOnMobile
      />

      {!topJobs ? (
        spinner
      ) : (
        <JobsContainer $isMobile={isMobile}>
          {topJobs?.map((job) => (
            <JobLabel
              $isMobile={isMobile}
              key={job?.codeRome ?? job?.rome}
              to={urlToSearch(job)}
            >
              <span>{job?.libelleRome ?? job?.rome_label}</span>
              <span style={{ whiteSpace: 'nowrap' }}>
                {!!job?.embauche ? <Chip label={job.embauche} /> : null}
                <RightChevronIcon />
              </span>
            </JobLabel>
          ))}
        </JobsContainer>
      )}
    </Container>
  )
}

export default TopJobs
