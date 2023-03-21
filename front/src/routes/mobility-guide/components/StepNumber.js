import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import { COLOR_WHITE, COLOR_PRIMARY } from '../../../constants/colors'

const Container = styled.div`
  height: 44px;
  width: 44px;
  display: grid;
  place-content: center;

  border: 1px solid ${ COLOR_PRIMARY };
  border-radius: 50%;
  background-color: ${ COLOR_WHITE };

  color: ${ COLOR_PRIMARY };
  font-weight: bold;
  font-size: 36px;

  ${({ $inTracker }) =>
    $inTracker &&
    css`
      position: absolute;
      left: -22px;
      top: -2px;
    `}
`

const StepNumber = ({ number, inTracker = false }) => (
  <Container $inTracker={inTracker}>
    {number}
  </Container>
)

StepNumber.propTypes = {
  number: PropTypes.number.isRequired,
  inTracker: PropTypes.bool,
}

export default StepNumber
