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

    &.column {
      height: auto;
      line-height: inherit;

      span.MuiButton-label {
        display: flex;
        flex-direction: column;
      }
    }
  }
`

export const Button = ({
  children, style, light, onClick, column
}) => {
  const lightStyle = {
    backgroundColor: '#E4E9ED', borderColor: '#00B9B6', borderRadius: '8px', fontWeight: 'normal', fontSize: 14
  }
  let newStyle = style
  if (light) {
    newStyle = { ...lightStyle, ...newStyle }
  }

  return (
    <Bt style={newStyle} onClick={onClick} className={column ? 'column' : ''}>
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
  onClick: PropTypes.func,
  column: PropTypes.bool
}

Button.defaultProps = {
  style: {},
  light: false,
  onClick: () => {},
  column: false
}
