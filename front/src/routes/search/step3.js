import {
  Typography
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { Button } from '../../components/button'
import { useCities } from '../../common/contexts/citiesContext'
import { ucFirst } from '../../utils/utils'
import { Espace } from '../../components/espace'
import { NB_MAX_REGION } from '../../contants/search'

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

const Step3Component = ({ onNext, values }) => {
  const {
    criterions
  } = useCities()
  const [regions, setRegions] = useState([])

  const toggleRegion = (region) => {
    const findIndex = regions.findIndex((r) => r.id === region.id)
    const list = [...regions]
    if (findIndex === -1) {
      if (regions.length < NB_MAX_REGION) {
        list.push(region)
      } else {
        toast.warn(`Vous ne pouvez selectionner que ${NB_MAX_REGION} maximum !`, {
          autoClose: 5000
        })
      }
    } else {
      list.splice(findIndex, 1)
    }

    setRegions(list)
  }

  const getStyleOfButton = (r) => {
    const style = { marginBottom: 16 }

    if (r && regions.find((reg) => reg.id === r.id)) {
      style.backgroundColor = '#5EECE8'
    }

    return style
  }

  useEffect(() => {
    if (values.regions) {
      setRegions(values.regions)
    }
  }, [values])

  return (
    <Wrapper>
      <Title>Dans quelle région ?</Title>
      <Button
        light
        onClick={() => onNext({})}
        style={getStyleOfButton()}
      >
        Toutes les regions
      </Button>
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
      <FixBlock>
        <Button
          style={{
            backgroundColor: '#00B9B6', border: 'none', fontWeight: 'normal', margin: '16px 0', boxShadow: '0 4px 5px 0 rgba(0,0,0,0.2)'
          }}
          onClick={() => onNext({ regions })}
        >
          Suivant
          {' '}
          {regions.length >= 2 ? `(max ${NB_MAX_REGION})` : ''}
        </Button>
      </FixBlock>
    </Wrapper>
  )
}

Step3Component.propTypes = {
  onNext: PropTypes.func,
  values: PropTypes.object
}

Step3Component.defaultProps = {
  onNext: () => {},
  values: {}
}

export default Step3Component
