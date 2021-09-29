import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from '../../components/button'
import { useCities } from '../../common/contexts/citiesContext'
import { ucFirst } from '../../utils/utils'
import { NB_MAX_REGION } from '../../constants/search'

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Title = styled.h1`
  && {
    font-size: 18px;
    font-weight: bold;
    margin: 0 0 8px 0;
  }
`

const InfoText = styled(Typography)`
  && {
    padding: 8px 0 16px 0;
  }
`

const Step3Component = ({ onNext, values }) => {
  const { criterions } = useCities()
  const [regions, setRegions] = useState([])
  const [list, setList] = useState([])

  const toggleRegion = (event) => {
    const region = event.target.value
    setRegions([region])
  }

  useEffect(() => {
    if (values && values.codeRegion && values.codeRegion.length) {
      setRegions([values.codeRegion])
    }

    if (values.codeRome) {
      setList(
        criterions.regions.filter(
          (r) => r.criterions && r.criterions[values.codeRome]
        )
      )
    } else {
      setList([...criterions.regions])
    }
  }, [values])

  return (
    <Wrapper>
      <Title>Quelle région vous intéresse ?</Title>

      <InfoText>
        Seules les régions avec des fortes probabilités d’embauche s’affichent.
      </InfoText>

      <FormControl variant="filled">
        <InputLabel shrink htmlFor="step-region-select-label">
          Région
        </InputLabel>
        <Select
          value={regions?.[0] || ''}
          displayEmpty
          onChange={toggleRegion}
          inputProps={{
            id: 'step-region-select-label',
          }}
        >
          <MenuItem value="">Toutes les regions</MenuItem>
          {list.map((r) => (
            <MenuItem key={r.id} value={r.id}>
              {ucFirst(r.label.toLowerCase())}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        style={{
          fontWeight: 'normal',
          margin: '32px 0',
          boxShadow: '0 4px 5px 0 rgba(0,0,0,0.2)',
        }}
        onClick={() => onNext({ regions })}
      >
        Suivant {regions.length > NB_MAX_REGION ? `(max ${NB_MAX_REGION})` : ''}
      </Button>
    </Wrapper>
  )
}

Step3Component.propTypes = {
  onNext: PropTypes.func,
  values: PropTypes.object,
}

Step3Component.defaultProps = {
  onNext: () => {},
  values: {},
}

export default Step3Component
