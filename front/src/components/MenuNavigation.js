import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

import { COLOR_OTHER_GREEN, COLOR_PRIMARY } from '../constants/colors'

const Nav = styled.nav`
  background: ${COLOR_OTHER_GREEN};
  position: absolute;
  height: 50px;
  left: 0;
  right: 0;
  z-index: 100;
`
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;
  gap: 8px;
`
const MenuItem = styled(Link)`
font-family: 'Roboto';
font-style: normal;
font-weight: ${({ $selected }) => $selected ? 700 : 400 };
font-size: 14px;
line-height: 24px;
color: ${({ $disabled }) => $disabled ? 'grey' : COLOR_PRIMARY };
margin-right: 30px;
pointer-events: ${({ $disabled }) => $disabled ? 'none' : 'inherit' };        
`

const MenuNavigation = () => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)

  const codeRome = params.get("codeRome")
  const insee = location.pathname.split("/")[2]

  const MENU_LINK = [
    {
      path: `/city/${insee}?codeRome=${codeRome}`,
      label: 'Présentation',
      selected: !location.pathname.includes('job') && !location.pathname.includes('life'),
      disabled: false
    },
    {
      path: `/city/${insee}/job?codeRome=${codeRome}`,
      label: 'Offres d’emploi',
      selected: location.pathname.includes('job'),
      disabled: false
    },
    {
      path: `/city/${insee}/life?codeRome=${codeRome}`,
      label: 'Services de la ville',
      selected: location.pathname.includes('life'),
      disabled: false
    },
    {
      path: '/city',
      label: 'Villes similaires ou à proximité',
      selected: false,
      disabled: true
    },
  ]

  return (
    <Nav>
        <Container>
        {
            MENU_LINK.map((menu, key) =>
              <MenuItem $disabled={menu.disabled} $selected={menu.selected} key={key} to={menu.path}>{menu.label}</MenuItem>
            )  
        }
        </Container>
    </Nav>
  )
}

MenuNavigation.propTypes = {}

MenuNavigation.defaultProps = {}

export default MenuNavigation
