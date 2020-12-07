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

const IconBlock = styled.i`
  color: #00B9B6;
  display: block;
  margin: 0 auto 12px auto;
`

const GroupBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
`

const Step5Component = ({ onNext }) => {
  const { criterions } = useCities()

  const Icon = (props) => <IconBlock className="material-icons" {...props} />
  const buttonStyle = {
    width: 'calc(50% - 15px)', height: 80, marginRight: 15, marginBottom: 15
  }

  return (
    <Wrapper>
      <Title>Quelle taille de ville ?</Title>
      <GroupBlock>
        {criterions.criterions.filter((f) => f.tag === 'city').map((c) => (
          <Button
            key={c.key}
            light
            column
            onClick={() => onNext({ city: [c.key] })}
            style={buttonStyle}
          >
            <Icon>{c.icon}</Icon>
            {c.label}
          </Button>
        ))}
      </GroupBlock>
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
