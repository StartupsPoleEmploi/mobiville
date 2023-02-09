import { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { COLOR_OTHER_GREEN, COLOR_PRIMARY } from '../../../constants/colors'

import Euro from '@mui/icons-material/Euro'
import { TextInput } from '../../../components'
import { formatNumber } from '../../../utils/utils'
import { isMobileView } from '../../../constants/mobile'
import { useWindowSize } from '../../../common/hooks/window-size'

const Container = styled.div`
  padding: 50px 0px;
  border-radius: 4px;
  flex: 1 1 100%;
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: flex-start;

  background: ${COLOR_OTHER_GREEN};
  color: ${COLOR_PRIMARY};
`

const FormContainer = styled.div`
  flex: 1 0 auto;
  padding-left: 30px;
  width: calc(50% - 30px);
  display: flex;
  flex-direction: column;
`

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const InputLabel = styled.p`
  margin: 8px 0;

  font-size: 18px;
  font-weight: bold;
`

const InputAdornment = styled.p`
  font-size: 24px;
  font-weight: bold;
`

const ResultContainer = styled.div`
  min-height: 1px;

  margin: ${({ $isVisible }) => ($isVisible ? '16px 0 0 0' : '0 0 8px 0')};
  line-height: ${({ $isVisible }) => ($isVisible ? '36px' : '0')};
`

const ResultText = styled.div`
  margin: 0;

  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};

  font-size: 18px;
  font-weight: 700;
`

const Result = styled.span`
  margin: 0;

  font-size: ${({ $isMobile }) => ($isMobile ? '26px' : '28px')};
  font-weight: 900;
`

const HR = styled.hr`
  height: 100%;
  border: 1px solid ${COLOR_PRIMARY};
  margin: unset;
  width: 0px;
`

const HousingSimulator = ({ city }) => {
  const isMobile = isMobileView(useWindowSize())
  const [squareMeters, setSquareMeters] = useState(0)
  const [housingCost, setHousingCost] = useState(0)

  const calculateSquareMeters = (value) => {
    if (!!city?.average_houserent) {
      const result = parseInt(value, 10) / city.average_houserent
      setSquareMeters(Number.isNaN(result) ? null : result.toFixed())
    }
    // else retour utilisateur : information indisponible dans la ville / disabled
  }

  const calculateHousingCost = (value) => {
    if (!!city?.average_houseselled) {
      const result =
        parseInt(value.replace(/ /g, ''), 10) * city.average_houseselled
      setHousingCost(Number.isNaN(result) ? null : result.toFixed())
    }
    // else retour utilisateur : information indisponible dans la ville / disabled
  }

  return (
    <>
      {(!!city?.average_houserent || !!city?.average_houseselled) && (
        <Container>
          {/* <FormContainer style={{ width: '100%' }}>
            <Title>Simulateur de logement</Title>
            <SubTitle $isMobile={isMobile}>
              Calculer votre budget pour un achat ou une location
            </SubTitle>
          </FormContainer> */}
          {/* <div> */}
          {!!city?.average_houserent && (
            <FormContainer>
              <InputLabel>Pour un loyer en location</InputLabel>
              <InputGroup
                onClick={() => {
                  window.smartTagPiano({
                    name: 'utilisation',
                    type: 'action',
                    chapters: ['city', 'simulateur'],
                  })
                }}
              >
                <TextInput
                  placeholder="Renseigner un budget"
                  type="number"
                  onChange={(event) =>
                    calculateSquareMeters(event.target.value)
                  }
                ></TextInput>
                <Euro fontSize="large" />
              </InputGroup>
              <ResultContainer $isVisible={!!squareMeters}>
                <ResultText $isVisible={!!squareMeters}>
                  Vous pouvez occuper un logement de{' '}
                  {squareMeters ? (
                    <Result $isMobile={isMobile}>
                      <span data-automation-id="housing-square-meters">
                        {formatNumber(squareMeters)}
                      </span>
                      m2
                    </Result>
                  ) : null}
                </ResultText>
              </ResultContainer>
            </FormContainer>
          )}

          {!!city?.average_houserent && !!city?.average_houseselled && <HR />}

          {!!city?.average_houseselled && (
            <FormContainer>
              <InputLabel>Pour un achat de logement</InputLabel>
              <InputGroup
                onClick={() => {
                  window.smartTagPiano({
                    name: 'utilisation',
                    type: 'action',
                    chapters: ['city', 'simulateur'],
                  })
                }}
              >
                <TextInput
                  placeholder="Renseigner la surface"
                  type="number"
                  onChange={(event) => calculateHousingCost(event.target.value)}
                ></TextInput>
                <InputAdornment>m2</InputAdornment>
              </InputGroup>
              <ResultContainer $isVisible={!!housingCost}>
                <ResultText $isVisible={!!housingCost}>
                  Votre logement va vous coûter{' '}
                  {housingCost ? (
                    <Result $isMobile={isMobile}>
                      <span data-automation-id="housing-cost">
                        {formatNumber(housingCost)}
                      </span>
                      <Euro fontSize="large" />
                    </Result>
                  ) : null}
                </ResultText>
              </ResultContainer>
            </FormContainer>
          )}
          {/* </div> */}
        </Container>
      )}
    </>
  )
}

HousingSimulator.propTypes = {
  city: PropTypes.object.isRequired,
}

export default HousingSimulator
