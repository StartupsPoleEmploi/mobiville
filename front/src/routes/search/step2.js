import { Button } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'

const Step2Component = ({ onNext }) => (
  <div>
    <p>Step 2</p>
    <Button onClick={() => onNext()}>Suivant</Button>
  </div>
)

Step2Component.propTypes = {
  onNext: PropTypes.func
}

Step2Component.defaultProps = {
  onNext: {}
}

export default Step2Component
