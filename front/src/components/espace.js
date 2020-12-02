import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrap = styled.div`
  flex: 1;
`

export const Espace = (params) => (
  <Wrap {...params} />
)

Espace.propTypes = {
  params: PropTypes.oneOfType([
    PropTypes.any
  ])
}

Espace.defaultProps = {
  params: {}
}
