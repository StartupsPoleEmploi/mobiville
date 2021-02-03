import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import { COLOR_PRIMARY, COLOR_TEXT_SECONDARY } from '../constants/colors'
import LOGO from '../assets/images/logo_MobiVille.svg'
import LOGO_AL from '../assets/images/logo-action-logement.png'
import LOGO_PE from '../assets/images/logo-pole-emploi.png'

const Wrapper = styled.div`
  position: fixed;
  height: 76px;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2);
  background: #FFFFFF;
`

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 76px;
`

const Item = styled(Link)`
  && {
    align-self: stretch;
    margin: 0 16px;
    min-width: 77px;
    text-decoration: none;
    position: relative;
    display: flex;
    flex-direction: column;
    align-item: center;
    justify-content: center;
    color: ${(props) => (props.selected ? COLOR_PRIMARY : COLOR_TEXT_SECONDARY)};

    &:before {
      content: ' ';
      background-color: ${COLOR_PRIMARY};
      position: absolute;
      bottom: 0;
      transform: translateX(-50%);
      left: 50%;
      translate
      right: 0;
      height: 4px;
      border-radius: 2px 2px 0px 0px;
      max-width: 74px;
      width: 100%;
      display: ${(props) => (props.selected ? 'block' : 'none')};
    }
  }
`

const Icon = styled.i`
  width: 20px;
  height: 20px;
  display: block;
  margin: 0 auto 6px auto;
  color: inherit;
`

const Text = styled(Typography)`
  && {
    font-weight: bold;
    font-size: 10px;
    text-align: center;
    color: inherit;
  }
`

const LogoImage = styled.img`
  height: 40px;
`

const LogoImagePartener = styled.img`
  height: 28px;
  margin-left: 16px;
`

const MENU_LINK = [{
  path: '/rechercher', icon: 'explore', label: 'Recherche', selected: false
}, {
  path: '/aides', icon: 'support', label: 'Aides', selected: false
}]

export const MenuDesktop = () => {
  const [menuLink, setMenuLink] = useState(MENU_LINK)
  const location = useLocation()

  useEffect(() => {
    setMenuLink(MENU_LINK.map((m) => ({ ...m, selected: m.path === location.pathname })))
  }, [location])

  return (
    <Wrapper>
      <MainWrapper className="wrapper">
        <Link to="/"><LogoImage src={LOGO} alt="logo" /></Link>
        <div className="flex-1" />
        {menuLink.map((m) => (
          <Item key={m.path} to={m.path} selected={m.selected}>
            <Icon className="material-icons">{m.icon}</Icon>
            <Text>{m.label}</Text>
          </Item>
        ))}
        <div className="flex-1" />
        <Text>Proposé par</Text>
        <LogoImagePartener src={LOGO_AL} alt="Action logement" />
        <LogoImagePartener src={LOGO_PE} alt="Pôle Emploi" />
        <Link to="/compte">
          <button className="btn primary" type="button" style={{ marginLeft: 16 }}>
            <Icon className="material-icons">account_circle</Icon>
            {' '}
            Mon compte
          </button>

        </Link>
      </MainWrapper>
    </Wrapper>
  )
}

MenuDesktop.propTypes = {
}

MenuDesktop.defaultProps = {
}
