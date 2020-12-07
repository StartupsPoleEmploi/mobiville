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

const ButtonCrit = styled(Button)`
  && {
    width: 50%;
  }
`

const Step4Component = ({ onNext }) => {
  const { criterions } = useCities()

  const Icon = (props) => <i className="material-icons" {...props} />

  return (
    <Wrapper>
      <Title>Quel environnement recherchez-vous ?</Title>
      {criterions.criterions.filter((f) => f.tag === 'environment').map((c) => (
        <ButtonCrit key={c.key} light onClick={() => onNext({ environment: [c.key] })}>
          <Icon>{c.icon}</Icon>
          {c.label}
        </ButtonCrit>
      ))}
      <ButtonCrit
        light
        onClick={() => onNext()}
      >
        Peu importe
      </ButtonCrit>
    </Wrapper>
  )
}

Step4Component.propTypes = {
  onNext: PropTypes.func
}

Step4Component.defaultProps = {
  onNext: {}
}

export default Step4Component
