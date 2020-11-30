import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import LOGO from '../assets/images/logo_MobiVille.svg'

const MainSpace = styled.div`
  height: 72px;
`

const MainWrapper = styled.div`
  height: 72px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2);
  background: #FFFFFF;
  display: flex;
  align-items: center;
  padding: 16px;
`

const LogoImage = styled.img`
  height: 40px;
`

export const Menu = ({ logo }) => (
  <MainSpace>
    <MainWrapper>
      {logo && <Link to="/"><LogoImage src={LOGO} alt="logo" /></Link>}
    </MainWrapper>
  </MainSpace>
)

Menu.propTypes = {
  logo: PropTypes.bool
}

Menu.defaultProps = {
  logo: true
}
