import {
  Typography
} from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from '../../components/button'
import { useCities } from '../../common/contexts/citiesContext'
import { COLOR_PRIMARY, COLOR_TEXT_SECONDARY } from '../../constants/colors'

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

const IconBlock = styled.i`
  color: ${COLOR_PRIMARY};
  display: block;
  margin: 0 auto 8px auto;
`

const GroupBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  width: 100%;
`

const SubLabel = styled(Typography)`
  && {
    color: ${COLOR_TEXT_SECONDARY};
    font-size: 12px;
    margin-top: 4px;
  }
`

const Step4Component = ({ onNext, values }) => {
  const { criterions } = useCities()

  const Icon = (props) => <IconBlock className="material-icons" {...props} />

  const getStyleOfButton = (r, index = 0) => {
    const style = {
      width: 'calc(50% - 7.5px)', height: 98, marginRight: index === 0 ? 15 : 0, marginBottom: 15, border: 'none'
    }

    if (r && values && values.city && values.city === r.key) {
      style.border = `2px solid ${COLOR_PRIMARY}`
    }

    if (r.available === false) {
      style.opacity = 0.5
      style.cursor = 'default'
    }

    return style
  }

  return (
    <Wrapper>
      <Title>Je souhaite éviter de travailler dans :</Title>
      <GroupBlock>
        {criterions.criterions
          .filter((f) => f.tag === 'city')
          .map((c) => {
            let available = true
            if (values.regions && values.regions.length) {
              const reg = criterions.regions.find((r) => r.id === values.regions[0])
              if (reg) {
                const allCrit = reg.criterions[values.rome] || []
                if (allCrit.indexOf(c.key) === -1) {
                  available = false
                }
              }
            }

            return ({ ...c, available })
          })
          .map((c, index) => (
            <Button
              key={c.key}
              light
              column
              onClick={() => (c.available ? onNext({ envircityonment: c.key }) : '')}
              style={getStyleOfButton(c, index)}
            >
              <Icon>{c.icon}</Icon>
              {c.label}
              <SubLabel>{c.subLabel}</SubLabel>
            </Button>
          ))}
        <Button
          light
          column
          onClick={() => onNext()}
          style={{ height: 48, border: 'none' }}
        >
          Peu importe
        </Button>
      </GroupBlock>
    </Wrapper>
  )
}

Step4Component.propTypes = {
  onNext: PropTypes.func,
  values: PropTypes.object
}

Step4Component.defaultProps = {
  onNext: () => {},
  values: {}
}

export default Step4Component
