import {
  Typography
} from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from '../../components/button'
import { useCities } from '../../common/contexts/citiesContext'

const Wrapper = styled.div`
  margin: 0 16px;
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

const Step2Component = ({ onNext }) => {
  const {
    criterions
  } = useCities()

  return (
    <Wrapper>
      <Title>Quel métier recherchez-vous ?</Title>
      {criterions.codeRomes.map((c) => (
        <Button
          light
          key={c.key}
          onClick={() => onNext({ rome: c.key })}
          style={{ marginBottom: 16 }}
        >
          {c.label}
        </Button>
      )) }
    </Wrapper>
  )
}

Step2Component.propTypes = {
  onNext: PropTypes.func
}

Step2Component.defaultProps = {
  onNext: {}
}

export default Step2Component
