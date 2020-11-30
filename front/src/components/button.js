import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Button as ButtonUI } from '@material-ui/core'

const Bt = styled(ButtonUI)`
  && {
    height: 48px;
    line-height: 48px;
    border: 1px solid #23333E;
    border-radius: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: none;
    width: 100%;
    font-weight: bold;
    font-size: 18px;
  }
`

export const Button = ({ children, style }) => (
  <Bt style={style}>
    {children}
  </Bt>
)

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number
  ])
}

Button.defaultProps = {
  style: {}
}
