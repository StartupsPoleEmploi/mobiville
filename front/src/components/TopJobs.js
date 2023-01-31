import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Chip } from '@mui/material'

import { ReactComponent as RightChevronIcon } from '../assets/images/icons/right_chevron.svg'

import { COLOR_PRIMARY, COLOR_WHITE } from '../constants/colors'
import { formatCityUrl, wordsCapitalize } from '../utils/utils'

const Container = styled.div`
  color: ${COLOR_PRIMARY};
`

const Title = styled.h2`
  margin: 16px 16px 0 16px;

  text-align: center;
  font-size: 24px;
  font-weight: 900;
`

const JobsContainer = styled.div`
  max-width: 1072px; // 1040px + 2*16px
  width: 100%;
  margin: 25px auto;
  padding: 0 16px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 80px;
  gap: 8px 24px;
`

const JobLabel = styled(Link)`
  width: 100%;
  height: 80px;
  padding: 30px;
  border-radius: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: ${COLOR_WHITE};
  font-size: 18px;
  font-weight: 700;
  text-align: start;

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

  return (
    <Container>
      <Title>
        {!!departement?.name
          ? `Les métiers avec le plus d'offres dans le département ${departement?.name}`
          : `Les métiers avec le plus d'offres à ${wordsCapitalize(city?.nom_comm)}`}
      </Title>

      <JobsContainer>
        {topJobs?.map((job) => (
          <JobLabel
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
    </Container>
  )
}

export default TopJobs
