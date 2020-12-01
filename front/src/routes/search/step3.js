import { Button } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'

const Step3Component = ({ onNext }) => (
  <div>
    <p>Step 3</p>
    <Button onClick={() => onNext()}>Suivant</Button>
  </div>
)

Step3Component.propTypes = {
  onNext: PropTypes.func
}

Step3Component.defaultProps = {
  onNext: {}
}

export default Step3Component
