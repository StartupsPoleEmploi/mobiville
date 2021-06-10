import {
  TextField, Typography
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from '../../components/button'
import { useCities } from '../../common/contexts/citiesContext'
import { COLOR_GRAY, COLOR_PRIMARY } from '../../constants/colors'

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Title = styled(Typography)`
  && {
    font-size: 18px;
    font-weight: bold;
    margin: 0 0 32px 0;
  }
`

const Input = styled(TextField)`
  && {
    input {
      background-color: ${COLOR_GRAY};
      padding-left: 8px !important;
    }
  }
`

const Step2Component = ({ onNext, values }) => {
  const {
    jobsMatchingCriterions,
    onSearchJobLabels
  } = useCities()

  const [searchedLabel, setSearchedLabel] = useState('')

  useEffect(() => {
    onSearchJobLabels(searchedLabel)
  }, [searchedLabel])

  const getStyleOfButton = (r) => {
    const style = {
      marginBottom: 16,
      border: 'none',
      height: 'auto',
      minHeight: 48
    }

    if (values && values.code_rome && values.code_rome.length && values.code_rome[0] === r.key) {
      style.border = `2px solid ${COLOR_PRIMARY}`
    }

    return style
  }

  return (
    <Wrapper>
      <Title>Quel métier ou compétences recherchez-vous ?</Title>

      <Input
        label="Rechercher"
        onChange={(event) => {
          setSearchedLabel(event.target.value)
        }}
        value={searchedLabel}
        variant="filled"
      />
      <p>Pour le moment, le service est disponible uniquement pour certains métiers</p>
      <div>
        {jobsMatchingCriterions.map((c) => (
          <Button
            light
            key={c.key}
            onClick={() => onNext({ rome: c.key })}
            style={getStyleOfButton(c)}
          >
            {c.label}
          </Button>
        )) }
      </div>
    </Wrapper>
  )
}

Step2Component.propTypes = {
  onNext: PropTypes.func,
  values: PropTypes.object
}

Step2Component.defaultProps = {
  onNext: () => {},
  values: {}
}

export default Step2Component
