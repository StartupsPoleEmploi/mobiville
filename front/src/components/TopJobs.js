import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Chip, CircularProgress } from '@mui/material'

import { ReactComponent as RightChevronIcon } from '../assets/images/icons/right_chevron.svg'

import { COLOR_PRIMARY, COLOR_WHITE } from '../constants/colors'
import { formatCityUrl, wordsCapitalize } from '../utils/utils'
import SectionHeader from '../routes/city/components/SectionHeader'
import { isMobileView } from '../constants/mobile'
import { useWindowSize } from '../common/hooks/window-size'

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
  grid-template-columns: repeat(2, 1fr);
  // grid-auto-rows: 80px;
  gap: 8px 24px;
`

const JobLabel = styled(Link)`
  width: ${({ $isMobile }) => ($isMobile ? '270px' : '100%')};
  // height: 100px;
  height: ${({ $isMobile }) => ($isMobile ? '100px' : '80px')};
  padding: ${({ $isMobile }) => ($isMobile ? '5px' : '15px')};
  border-radius: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: ${COLOR_WHITE};
  font-size: ${({ $isMobile }) => ($isMobile ? '16px' : '18px')};
  font-weight: 700;
  padding-left: ${({ $isMobile }) => ($isMobile ? '10px' : 'unset')};
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
  const [topJobs, setTopJobs] = useState(null)
  const isMobile = isMobileView(useWindowSize())

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
      />

      {!topJobs ? (
        spinner
      ) : (
        <JobsContainer $isMobile={isMobile}>
          {topJobs?.map((job) => (
            <JobLabel
              $isMobile={isMobile}
              key={job?.codeRome ?? job?.rome}
              to={
                !!departement?.code
                  ? `/villes?codeRome=${job.codeRome}&codeDepartement=${departement.code}`
                  : formatCityUrl(city, job.rome)
              }
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
