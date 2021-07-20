import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Button } from '../../components/button'
import { useCities } from '../../common/contexts/citiesContext'

const H1 = styled.h1`
  && {
    font-size: 18px;
    font-weight: bold;
    margin: 0 0 32px 0;
  }
`

const RomeList = ({ onNext }) => {
  const { criterions: { codeRomes } } = useCities()

  return (
    <div>
      <H1>
        Liste des métiers Mobiville
      </H1>
      {codeRomes.map((rome) => (
        <Button
          light
          key={rome.key}
          onClick={() => onNext({ rome: rome.key })}
          style={{
            marginBottom: 16,
            border: 'none',
            height: 'auto',
            minHeight: 48
          }}
        >
          {rome.label}
        </Button>
      )) }
    </div>
  )
}

RomeList.propTypes = {
  onNext: PropTypes.func.isRequired
}

export default RomeList
