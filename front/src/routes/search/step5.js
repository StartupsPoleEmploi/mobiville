import {
  Typography
} from '@material-ui/core'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from '../../components/button'
import { useCities } from '../../common/contexts/citiesContext'
import { ucFirst } from '../../utils/utils'
import { Espace } from '../../components/espace'

const Wrapper = styled.div`
  margin: 0 16px 80px 16px;
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

const FixBlock = styled.div`
  position: fixed;
  bottom: 0;
  left: 16px;
  right: 16px;
`

const Step5Component = ({ onNext }) => {
  const {
    criterions
  } = useCities()
  const [regions, setRegions] = useState([])

  const toggleRegion = (region) => {
    const findIndex = regions.findIndex((r) => r.id === region.id)
    const list = [...regions]
    if (findIndex === -1) {
      list.push(region)
    } else {
      list.splice(findIndex, 1)
    }

    setRegions(list)
  }

  const getStyleOfButton = (r) => {
    const style = { marginBottom: 16 }

    if (regions.find((reg) => reg.id === r.id)) {
      style.backgroundColor = '#5EECE8'
    }

    return style
  }

  return (
    <Wrapper>
      <Title>Dans quelle région ?</Title>
      {criterions.regions.map((r) => (
        <Button
          light
          key={r.id}
          onClick={() => toggleRegion(r)}
          style={getStyleOfButton(r)}
        >
          {ucFirst(r.label.toLowerCase())}
        </Button>
      )) }
      <Espace />
      {regions.length !== 0 && (
        <FixBlock>
          <Button
            style={{
              backgroundColor: '#00B9B6', border: 'none', fontWeight: 'normal', margin: '16px 0', boxShadow: '0 4px 5px 0 rgba(0,0,0,0.2)'
            }}
            onClick={() => onNext({ regions })}
          >
            Suivant
          </Button>
        </FixBlock>
      )}
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
