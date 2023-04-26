import { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Euro from '@mui/icons-material/Euro'

import { COLOR_OTHER_GREEN, COLOR_PRIMARY } from '../../../../constants/colors'
import { TextInput } from '../../../../components'
import { formatNumber } from '../../../../utils/utils'
import { useDevice } from '../../../../common/contexts'

const Container = styled.div`
  padding: ${({ $isMobile }) => ($isMobile ? '24px 0px' : '50px 0px')};
  border-radius: 4px;

  overflow-x: hidden;
  max-width: 90vw;

  width: ${({ $isMobile, $is2Forms }) =>
    $isMobile ? '100%' : $is2Forms ? 'auto' : '50%'};
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
  padding-left: ${({ $isMobile }) => ($isMobile ? 'unset' : '30px')};
  width: ${({ $isMobile }) => ($isMobile ? '100%' : 'calc(50% - 30px)')};

  display: flex;
  flex-direction: column;
  align-items: ${({ $isMobile }) => ($isMobile ? 'center' : 'start')};
`

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const InputLabel = styled.p`
  margin: 8px 0;
  margin-left: ${({ $isMobile }) => ($isMobile ? '-100px' : 'unset')};
  font-size: 18px;
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

const HR = styled.div`
  border-left: ${({ $isMobile }) =>
    $isMobile ? 'unset' : `2px solid ${COLOR_PRIMARY}`};
  border-bottom: ${({ $isMobile }) =>
    $isMobile ? `2px solid ${COLOR_PRIMARY}` : 'unset'};
  width: ${({ $isMobile }) => ($isMobile ? '70%' : '0px')};
  height: ${({ $isMobile }) => ($isMobile ? '0px' : '120px')};
  margin: ${({ $isMobile }) => ($isMobile ? '40px auto' : 'auto')};
`

const HousingSimulator = ({ city }) => {
  const { isMobile } = useDevice()

  const [rentBudget, setRentBudget] = useState('')
  const [buyBudget, setBuyBudget] = useState('')

  const rentSquareMeters = useMemo(
    () =>
      parseInt(rentBudget.replace(/ /g, ''), 10) /
      (!!city?.rent_m2 ? city?.rent_m2 : city?.departement?.rent_m2),
    [rentBudget]
  )
  const buySquareMeters = useMemo(
    () =>
      parseInt(buyBudget.replace(/ /g, ''), 10) /
      (!!city?.buy_m2 ? city?.buy_m2 : city?.departement?.buy_m2),
    [buyBudget]
  )

  return (
    <>
      {(!!city?.rent_m2 ||
        !!city?.departement?.rent_m2 ||
        !!city?.buy_m2 ||
        !!city?.departement?.buy_m2) && (
        <Container
          $isMobile={isMobile}
          $is2Forms={
            (!!city?.rent_m2 || !!city?.departement?.rent_m2) &&
            (!!city?.buy_m2 || !!city?.departement?.buy_m2)
          }
        >
          {(!!city?.rent_m2 || !!city?.departement?.rent_m2) && (
            <FormContainer $isMobile={isMobile}>
              <InputLabel $isMobile={isMobile}>
                Pour un loyer en location
              </InputLabel>
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
                  onChange={(event) => setRentBudget(event.target.value)}
                ></TextInput>
                <Euro fontSize="large" />
              </InputGroup>
              <ResultContainer $isVisible={!!rentSquareMeters}>
                <ResultText $isVisible={!!rentSquareMeters}>
                  Vous pouvez occuper un logement de{' '}
                  {rentSquareMeters ? (
                    <Result $isMobile={isMobile}>
                      <span data-automation-id="housing-square-meters">
                        {formatNumber(rentSquareMeters)}
                      </span>
                      m2
                    </Result>
                  ) : null}
                </ResultText>
              </ResultContainer>
            </FormContainer>
          )}

          {(!!city?.buy_m2 || !!city?.departement?.buy_m2) && (
            <>
              <HR $isMobile={isMobile} />
              <FormContainer $isMobile={isMobile}>
                <InputLabel $isMobile={isMobile}>
                  Pour un achat de logement
                </InputLabel>

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
                    onChange={(event) => setBuyBudget(event.target.value)}
                  ></TextInput>
                  <Euro fontSize="large" />
                </InputGroup>
                <ResultContainer $isVisible={!!buySquareMeters}>
                  <ResultText $isVisible={!!buySquareMeters}>
                    Vous pouvez occuper un logement de{' '}
                    {buySquareMeters ? (
                      <Result $isMobile={isMobile}>
                        <span data-automation-id="housing-square-meters">
                          {formatNumber(buySquareMeters)}
                        </span>
                        m2
                      </Result>
                    ) : null}
                  </ResultText>
                </ResultContainer>
              </FormContainer>
            </>
          )}
        </Container>
      )}
    </>
  )
}

HousingSimulator.propTypes = {
  city: PropTypes.object.isRequired,
}

export default HousingSimulator
