import { Button } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'

const Step5Component = ({ onNext }) => (
  <div>
    <p>Step 5</p>
    <Button onClick={() => onNext()}>Suivant</Button>
  </div>
)

Step5Component.propTypes = {
  onNext: PropTypes.func
}

Step5Component.defaultProps = {
  onNext: {}
}

export default Step5Component
