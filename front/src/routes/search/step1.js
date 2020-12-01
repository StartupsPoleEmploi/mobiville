import {
  CircularProgress,
  FormControl, TextField, Typography
} from '@material-ui/core'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from '../../components/button'
import { getPosition } from '../../utils/navigator'

const Wrapper = styled.div`
  margin: 0 16px;
`

const Title = styled(Typography)`
  && {
    font-size: 18px;
    font-weight: bold;
    margin: 0 0 32px 0;
  }
`

const FormLine = styled(FormControl)`
  && {
    margin-bottom: 16px;
  }
`

const Input = styled(TextField)`
  && {
    background-color: white;
  }
`

const GpsIcon = styled.i`
  margin-right: 8px;
  color: #00B9B6;
`

const Waiting = styled(CircularProgress)`
  && {
    margin-right: 8px;
    color: #00B9B6;
  }
`

const Step1Component = ({ onNext }) => {
  const [loadingLocalisation, setLoadingLocalisation] = useState(false)

  const locateMe = () => {
    setLoadingLocalisation(true)
    getPosition()
      .then(() => {
        setLoadingLocalisation(false)
        // console.log(coordinates)
      })
      .catch(() => {
        setLoadingLocalisation(false)
        // console.log(error)
      })
  }

  return (
    <Wrapper>
      <Title>Où habitez vous ?</Title>
      <FormLine fullWidth>
        <Input label="Ville" />
      </FormLine>
      <Button light onClick={locateMe}>
        {!loadingLocalisation && <GpsIcon className="material-icons">gps_fixed</GpsIcon>}
        {loadingLocalisation && <Waiting size={22} />}
        Me localiser
      </Button>
      <Button onClick={() => onNext()}>Suivant</Button>
    </Wrapper>
  )
}

Step1Component.propTypes = {
  onNext: PropTypes.func
}

Step1Component.defaultProps = {
  onNext: {}
}

export default Step1Component
