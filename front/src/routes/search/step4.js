import { Button } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'

const Step4Component = ({ onNext }) => (
  <div>
    <p>Step 4</p>
    <Button onClick={() => onNext()}>Suivant</Button>
  </div>
)

Step4Component.propTypes = {
  onNext: PropTypes.func
}

Step4Component.defaultProps = {
  onNext: {}
}

export default Step4Component
