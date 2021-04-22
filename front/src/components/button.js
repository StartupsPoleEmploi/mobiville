import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Button as ButtonUI } from '@material-ui/core'
import { COLOR_GRAY, COLOR_PRIMARY, COLOR_TEXT_PRIMARY } from '../constants/colors'

const Bt = styled(ButtonUI)`
  && {
    height: 48px;
    line-height: 48px;
    border: 1px solid ${COLOR_PRIMARY};
    background-color: ${COLOR_PRIMARY};
    border-radius: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: none;
    width: 100%;
    font-weight: bold;
    font-size: 18px;
    color: white;

    &:hover {
      opacity: 0.8;
      background-color: ${COLOR_PRIMARY};
    }

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
    backgroundColor: COLOR_GRAY, color: COLOR_TEXT_PRIMARY, borderColor: COLOR_PRIMARY, borderRadius: '8px', fontWeight: 'normal', fontSize: 14
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
