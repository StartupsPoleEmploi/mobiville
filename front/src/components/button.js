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

export const Button = ({
  children, style, light, onClick
}) => {
  const lightStyle = {
    backgroundColor: '#E4E9ED', borderColor: '#00B9B6', borderRadius: '8px', fontWeight: 'normal', fontSize: 14
  }
  let newStyle = style
  if (light) {
    newStyle = { ...lightStyle, ...newStyle }
  }

  return (
    <Bt style={newStyle} onClick={onClick}>
      {children}
    </Bt>
  )
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number
  ]),
  light: PropTypes.bool,
  onClick: PropTypes.func
}

Button.defaultProps = {
  style: {},
  light: false,
  onClick: () => {}
}
