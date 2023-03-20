import { TextField } from '@mui/material'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import {
  COLOR_LIGHT_GREY,
  COLOR_PRIMARY,
  COLOR_TEXT_PRIMARY,
  COLOR_TEXT_SECONDARY,
  COLOR_WHITE,
} from '../../constants/colors'

const CustomTextFiled = styled(TextField)`
  width: 297px;
  background: ${COLOR_WHITE} !important;
  border-radius: 20px;
  border: 1px solid ${COLOR_LIGHT_GREY} !important;

  ${({ $isPlaceholderSelected }) =>
    !$isPlaceholderSelected &&
    css`
      color: ${COLOR_PRIMARY} !important;
      font-weight: 700 !important;
    `}

  & input.MuiInputBase-input {
    padding-top: 0 !important;
    padding-bottom: 0 !important;

    background: none;
    font-weight: 700;
    color: ${COLOR_PRIMARY} !important;
    font-size: 16px;
  }

  & .MuiInputBase-root {
    padding: 25px 0 25px 4px;
    border-radius: 20px;
    background: ${COLOR_WHITE} !important;
  }

  & label {
    padding: 9px 4px;

    font-size: 22px;
    font-weight: 700;
    background: none;

    color: ${({ disabled }) =>
      disabled
        ? `${COLOR_TEXT_SECONDARY}`
        : `${COLOR_TEXT_PRIMARY}`} !important;
  }

  & ::placeholder {
    opacity: 1 !important;
    font-size: 16px;
    font-weight: 400;
    color: ${COLOR_TEXT_PRIMARY};
  }

  /* REMOVE ARROWS ON INPUT NUMBER */
  /* Chrome, Safari, Edge, Opera */
  & input::-webkit-outer-spin-button,
  & input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  & input[type=number] {
    -moz-appearance: textfield;
  }
`

const TextInput = ({
  label,
  placeholder,
  required = false,
  type = 'text',
  onChange,
}) => {
  return (
    <CustomTextFiled
      label={label}
      placeholder={placeholder}
      onChange={onChange}
      variant="filled"
      type={type}
      InputLabelProps={{
        shrink: true,
        required: required,
      }}
      InputProps={{
        disableUnderline: true,
      }}
    />
  )
}

TextInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default TextInput
