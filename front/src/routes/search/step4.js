import {
  Typography
} from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from '../../components/button'

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

const Step4Component = ({ onNext }) => (
  <Wrapper>
    <Title>Quelle taille de ville ?</Title>
    <Button
      light
      onClick={() => onNext({ })}
    >
      Peu importe
    </Button>
  </Wrapper>
)

Step4Component.propTypes = {
  onNext: PropTypes.func
}

Step4Component.defaultProps = {
  onNext: {}
}

export default Step4Component
