import { Typography } from '@material-ui/core'
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

const IconBlock = styled.i`
  color: ${COLOR_PRIMARY};
  display: block;
  margin: 0 auto 12px auto;
`

const GroupBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
`

const BIG_CITY = 'big-city'
const MEDIUM_CITY = 'medium-city'
const CAMPAGNE = 'campagne'

const Step5Component = ({ onNext, values }) => {
  const { criterions } = useCities()

  const Icon = (props) => <IconBlock className="material-icons" {...props} />

  const getStyleOfButton = (r) => {
    const style = {
      width: 'calc(50% - 15px)',
      height: 80,
      marginRight: 15,
      marginBottom: 15,
      border: 'none',
    }

    if (
      r &&
      values &&
      values.code_criterion &&
      values.code_criterion.indexOf(r.key) !== -1
    ) {
      style.backgroundColor = '#5EECE8'
    }

    if (r && r.available === false) {
      style.opacity = 0.5
      style.cursor = 'default'
    }

    return style
  }

  return (
    <Wrapper>
      <Title>Quel environnement recherchez-vous ?</Title>
      <GroupBlock>
        {criterions.criterions
          .filter((f) => f.tag === 'environment')
          .map((c) => {
            let available = true
            const codeCity = values.code_city?.[0] || ''
            const isTooBigForCountrySide =
              codeCity.includes(BIG_CITY) || codeCity.includes(MEDIUM_CITY)

            if (isTooBigForCountrySide && c.key === CAMPAGNE) {
              // handles special case : a medium or big city isn’t a countryside city…
              available = false
            } else if (values.code_region && values.code_region.length) {
              const reg = criterions.regions.find(
                (r) => r.id === values.code_region[0]
              )
              if (reg) {
                const allCrit = reg.criterions[values.code_rome[0]] || []
                if (allCrit.indexOf(c.key) === -1) {
                  available = false
                }
              }
            }

            return { ...c, available }
          })
          .map((c) => (
            <Button
              key={c.key}
              light
              column
              onClick={() =>
                c.available ? onNext({ environment: c.key }) : ''
              }
              style={getStyleOfButton(c)}
            >
              <Icon>{c.icon}</Icon>
              {c.label}
            </Button>
          ))}
        <Button
          light
          column
          onClick={() => onNext()}
          style={getStyleOfButton(null)}
        >
          Peu importe
        </Button>
      </GroupBlock>
    </Wrapper>
  )
}

Step5Component.propTypes = {
  onNext: PropTypes.func,
  values: PropTypes.object,
}

Step5Component.defaultProps = {
  onNext: () => {},
  values: {},
}

export default Step5Component
