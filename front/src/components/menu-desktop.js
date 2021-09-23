import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import { COLOR_PRIMARY, COLOR_TEXT_SECONDARY } from '../constants/colors'
import LOGO from '../assets/images/LogoMobiville_gros.svg'
import LOGO_AL from '../assets/images/logo-action-logement.png'
import LOGO_PE from '../assets/images/logo-pole-emploi.png'

const Header = styled.header`
  position: fixed;
  height: 76px;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(0, 0, 0, 0.12),
    0px 1px 5px rgba(0, 0, 0, 0.2);
  background: #ffffff;
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
    margin: 0 0 0 69px;
    text-decoration: none;
    position: relative;
    display: flex;
    align-item: center;
    color: ${(props) =>
      props.selected ? COLOR_PRIMARY : COLOR_TEXT_SECONDARY};
  }
`

const Icon = styled.i`
  color: inherit;
  position: relative;
  top: -1px;
`

const Text = styled(Typography)`
  && {
    font-weight: 500;
    font-size: 14px;
    color: inherit;
    margin-left: 10px;
  }
`

const LogoImage = styled.img`
  height: 40px;
`

const LogoImagePartener = styled.img`
  height: 28px;
  margin-left: 16px;
`

const MENU_LINK = [
  {
    path: '/',
    icon: 'home',
    label: 'Accueil',
    selected: false,
  },
  {
    path: '/rechercher',
    icon: 'explore',
    label: 'Recherche',
    selected: false,
  },
  {
    path: '/aides',
    icon: 'map',
    label: 'Les aides',
    selected: false,
  },
]

export const MenuDesktop = () => {
  const [menuLink, setMenuLink] = useState(MENU_LINK)
  const location = useLocation()

  useEffect(() => {
    setMenuLink(
      MENU_LINK.map((m) => ({ ...m, selected: m.path === location.pathname }))
    )
  }, [location])

  return (
    <Header>
      <MainWrapper className="wrapper">
        <Link to="/">
          <LogoImage src={LOGO} alt="logo" />
        </Link>
        {menuLink.map((m) => (
          <Item key={m.path} to={m.path} selected={m.selected}>
            <Icon className="material-icons">{m.icon}</Icon>
            <Text>{m.label}</Text>
          </Item>
        ))}
        <div className="flex-1" />
        <Text>Proposé par</Text>
        <a
          href="https://www.actionlogement.fr/"
          target="_blank"
          rel="noreferrer"
        >
          <LogoImagePartener src={LOGO_AL} alt="Action logement" />
        </a>
        <a href="https://www.pole-emploi.fr/" target="_blank" rel="noreferrer">
          <LogoImagePartener src={LOGO_PE} alt="Pôle Emploi" />
        </a>
      </MainWrapper>
    </Header>
  )
}

MenuDesktop.propTypes = {}

MenuDesktop.defaultProps = {}
