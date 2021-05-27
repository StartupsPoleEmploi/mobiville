import {
  Typography
} from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from '../../components/button'
import { useCities } from '../../common/contexts/citiesContext'
import { COLOR_PRIMARY } from '../../constants/colors'

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

const Step2Component = ({ onNext, values }) => {
  const {
    criterions
  } = useCities()

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
      <Title>Quel métier recherchez-vous ?</Title>
      {criterions.codeRomes.map((c) => (
        <Button
          light
          key={c.key}
          onClick={() => onNext({ rome: c.key })}
          style={getStyleOfButton(c)}
        >
          {c.label}
        </Button>
      )) }
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
