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

const Step5Component = ({ onNext }) => {
  const { criterions } = useCities()

  const Icon = (props) => <i className="material-icons" {...props} />

  return (
    <Wrapper>
      <Title>Quelle taille de ville ?</Title>
      {criterions.criterions.filter((f) => f.tag === 'city').map((c) => (
        <ButtonCrit key={c.key} light onClick={() => onNext({ city: [c.key] })}>
          <Icon>{c.icon}</Icon>
          {c.label}
        </ButtonCrit>
      ))}
    </Wrapper>
  )
}

Step5Component.propTypes = {
  onNext: PropTypes.func
}

Step5Component.defaultProps = {
  onNext: {}
}

export default Step5Component
