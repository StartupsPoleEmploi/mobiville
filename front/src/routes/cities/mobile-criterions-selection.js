import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  FormControl, InputLabel, MenuItem, Select
} from '@material-ui/core'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined'

import { Button } from '../../components/button'

import { COLOR_PRIMARY, COLOR_TEXT_SECONDARY } from '../../constants/colors'
import { useCities } from '../../common/contexts/citiesContext'
import { ucFirst } from '../../utils/utils'

// TODO use svg components
const IconBlock = styled.i`
  color: ${COLOR_PRIMARY};
  display: block;
  margin: 0 auto 8px auto;
`

const BackButton = styled.button.attrs({
  type: 'button'
})`
  cursor: pointer;
  border: none;
  background: #fff;
`

const ButtonContentWrapper = styled.div`
  display: flex;
  align-items: center;
`

const H1 = styled.h1`
  font-size: 18px;
`

const CUSTOM_SUB_LABELS = {
  'small-city': '- 20 000 habitants',
  'medium-city': '- 50 000 habitants',
  'big-city': '- 200 000 habitants',
  'extra-big-city': '+ 200 000 habitants'
}

const getButtonStyle = (isSelected) => ({
  width: 'auto',
  height: 40,
  display: 'inline',
  border: !isSelected ? 'none' : `1px solid ${COLOR_PRIMARY}`,
  borderRadius: '44px',
  marginLeft: 8,
  marginBottom: 8,
  lineHeight: 1
})

// These icons need to be refactored to correctly use Material UI icon component
const Icon = (props) => (
  <IconBlock
    className="material-icons"
    style={{
      marginRight: 8,
      marginBottom: 0
    }}
    {...props}
  />
)

const MobileCriterionsSelection = ({
  paramsUrl,
  onSubmit,
  showMobileCriterionsSelection
}) => {
  const {
    environmentCriterions,
    cityCriterions,
    regionCriterions
  } = useCities()

  const [selectedRegion, setSelectedRegion] = useState(paramsUrl.code_region)
  const [selectedCitySize, setSelectedCitySize] = useState(
    cityCriterions.find(
      ({ key }) => (paramsUrl.code_criterion || []).includes(key)
    )?.key || ''
  )
  const [selectedEnvironment, setSelectedEnvironment] = useState(
    environmentCriterions.find(
      ({ key }) => (paramsUrl.code_criterion || []).includes(key)
    )?.key || ''
  )

  const onValidate = () => {
    onSubmit({
      city: selectedCitySize,
      environment: selectedEnvironment,
      region: selectedRegion
    })
    showMobileCriterionsSelection(false)
  }

  return (
    <div style={{ padding: 16 }}>
      <BackButton onClick={() => showMobileCriterionsSelection(false)}>
        <ArrowBackOutlinedIcon />
      </BackButton>
      <H1>Ajuster mes critères</H1>
      <div>
        <p id="mobile-citerions-selection-env">
          <b>Quel environnement recherchez-vous ?</b>
        </p>
        <div
          role="radiogroup"
          aria-labelledby="mobile-citerions-selection-env"
        >
          {environmentCriterions.map(
            (criterion) => {
              const isSelected = criterion.key === selectedEnvironment
              return (
                <Button
                  onClick={() => setSelectedEnvironment(criterion.key)}
                  light
                  column
                  style={getButtonStyle(isSelected)}
                  role="radio"
                  aria-checked={isSelected}
                >
                  <ButtonContentWrapper>
                    <Icon>{criterion.icon}</Icon>
                    {criterion.label}
                  </ButtonContentWrapper>
                </Button>
              )
            }
          )}
          <Button
            onClick={() => setSelectedEnvironment('')}
            light
            column
            style={getButtonStyle(selectedEnvironment === '')}
            role="radio"
            aria-checked={selectedEnvironment === ''}
          >
            Tous les environnements
          </Button>
        </div>
      </div>

      <div>
        <p id="mobile-citerions-selection-city"><b>Lieu de travail ?</b></p>
        <div
          role="radiogroup"
          aria-labelledby="mobile-citerions-selection-city"
        >
          {cityCriterions.map((criterion) => {
            const isSelected = criterion.key === selectedCitySize
            return (
              <Button
                onClick={() => setSelectedCitySize(criterion.key)}
                light
                column
                style={{
                  ...getButtonStyle(isSelected),
                  height: 46
                }}
                role="radio"
                aria-checked={isSelected}
              >
                <ButtonContentWrapper>
                  <Icon>{criterion.icon}</Icon>
                  <div>
                    {criterion.label}
                    <br />
                    <span style={{ fontSize: 10, color: COLOR_TEXT_SECONDARY }}>
                      {CUSTOM_SUB_LABELS[criterion.key]}
                    </span>
                  </div>
                </ButtonContentWrapper>
              </Button>
            )
          })}
          <Button
            onClick={() => setSelectedCitySize('')}
            light
            column
            style={{
              ...getButtonStyle(selectedCitySize === ''),
              height: 46
            }}
            role="radio"
            aria-checked={selectedCitySize === ''}
          >
            Toutes les tailles
          </Button>
        </div>
      </div>

      <div>
        <p id="mobile-citerions-selection-city"><b>Dans quelle région ?</b></p>

        <FormControl fullWidth variant="filled">
          <InputLabel shrink htmlFor="criterion-region-select-label">Région</InputLabel>
          <Select
            value={selectedRegion || ''}
            displayEmpty
            onChange={(event) => setSelectedRegion(event.target.value)}
            inputProps={{
              id: 'criterion-region-select-label'
            }}
          >
            <MenuItem value="">
              Toutes les regions
            </MenuItem>
            {regionCriterions.map((criterion) => (
              <MenuItem key={criterion.key} value={criterion.key}>
                {ucFirst(criterion.label.toLowerCase())}
              </MenuItem>
            ))}

          </Select>
        </FormControl>
      </div>

      <div
        style={{
          position: 'fixed',
          bottom: '32px',
          width: 'calc(100% - 32px)'
        }}
      >
        <Button onClick={onValidate}>
          Afficher les résultats
        </Button>
      </div>
    </div>
  )
}

MobileCriterionsSelection.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  paramsUrl: PropTypes.object.isRequired,
  showMobileCriterionsSelection: PropTypes.func.isRequired
}

export default MobileCriterionsSelection
