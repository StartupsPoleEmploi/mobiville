import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import ExploreIcon from '@mui/icons-material/Explore'
import MapIcon from '@mui/icons-material/Map'
import { COLOR_PRIMARY, COLOR_TEXT_SECONDARY } from '../constants/colors'
import LOGO from '../assets/images/LogoMobiville_gros.svg'
import LOGO_FR from '../assets/images/marianne-logo.png'
import LOGO_AL from '../assets/images/logo-action-logement.png'
import LOGO_PE from '../assets/images/logo-pole-emploi.png'

const Header = styled.header`
  position: fixed;
  height: 102px;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(0, 0, 0, 0.12),
    0px 1px 5px rgba(0, 0, 0, 0.2);
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 16px;
`

const Item = styled(Link)`
  && {
    margin-left: 70px;
    text-decoration: none;
    position: relative;
    display: flex;
    align-items: center;
    color: ${(props) =>
      props.selected ? COLOR_PRIMARY : COLOR_TEXT_SECONDARY};
  }
`

const IconsContainer = styled.div`
  display: flex;
`

const Text = styled(Typography)`
  && {
    font-weight: 500;
    font-size: 14px;
    color: inherit;
    margin-left: 10px;
  }
`

const LogoImagePartner = styled.img`
  height: 28px;
  margin-left: 16px;
`

export const MenuDesktop = () => {
  const location = useLocation()

  return (
    <Header>
      <Link to="/" style={{ flexShrink: 0 }}>
        <img src={LOGO_FR} alt="" style={{ height: 70, marginRight: 16 }} />
        <img src={LOGO} alt="" style={{ height: 48 }} />
      </Link>
      <IconsContainer style={{ flexGrow: 1 }}>
        <Item to="/" selected={location.pathname === '/'}>
          <HomeIcon />
          <Text>Accueil</Text>
        </Item>
        <Item
          to="/rechercher"
          selected={location.pathname.includes('rechercher')}
        >
          <ExploreIcon />
          <Text>Recherche</Text>
        </Item>
        <Item to="/aides" selected={location.pathname.includes('aides')}>
          <MapIcon />
          <Text>Aides</Text>
        </Item>
      </IconsContainer>
      <div style={{ flexShrink: 0 }}>
        <Text style={{ color: COLOR_TEXT_SECONDARY, paddingBottom: 8 }}>
          Proposé par
        </Text>
        <a
          href="https://www.actionlogement.fr/"
          target="_blank"
          rel="noreferrer"
        >
          <LogoImagePartner src={LOGO_AL} alt="Action logement" />
        </a>
        <a href="https://www.pole-emploi.fr/" target="_blank" rel="noreferrer">
          <LogoImagePartner src={LOGO_PE} alt="Pôle Emploi" />
        </a>
      </div>
    </Header>
  )
}

MenuDesktop.propTypes = {}

MenuDesktop.defaultProps = {}
