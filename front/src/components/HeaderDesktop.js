import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'
import {
  COLOR_HEADER_BACKGROUND,
  COLOR_PRIMARY,
  COLOR_TEXT_SECONDARY,
  COLOR_WHITE,
} from '../constants/colors'
import LOGO_AL from '../assets/images/logo-action-logement.png'
import LOGO_PE from '../assets/images/logo-pole-emploi.png'
import LOGO from '../assets/images/logo-mobiville.svg'
import Image from './Image'

const Container = styled.header`
  height: 100px;
  width: 100%;
  padding: 14px 90px;
  z-index: 1001; //leaflet map est a 1000zindex

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: ${COLOR_WHITE};
  border-bottom: solid 2px ${COLOR_HEADER_BACKGROUND};
`

const HomeLink = styled(Link)`
  height: 100%;

  display: flex;
  align-items: center;
  gap: 12px;

  & > img,
  & > picture {
    height: 100%;
  }
`

// PARTNERS LOGOS
const PartnerText = styled(Typography)`
  padding-bottom: 8px;

  color: ${COLOR_TEXT_SECONDARY};

  && {
    font-weight: 500;
    font-size: 14px;
    color: inherit;
  }
`

const PartnersContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const PartnersLogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

const LogoImagePartner = styled.img`
  height: 28px;
`
const LogoMarianne = styled(Image)`
  img {
    max-height: 70px;
  }
`
// NAVIGATION
const NavContainer = styled.div`
  display: flex;
  gap: 32px;
`

const NavItem = styled(Link)`
  font-size: 16px;

  && {
    position: relative;

    display: flex;
    align-items: center;

    text-decoration: none;
    color: ${({ $isSelected }) =>
      $isSelected ? COLOR_PRIMARY : COLOR_TEXT_SECONDARY};
    font-weight: ${({ $isSelected }) => ($isSelected ? '900' : '400')};
  }

  &:hover {
    color: ${COLOR_PRIMARY};
  }
`

const HeaderDesktop = ({ displaySearch = true }) => {
  const location = useLocation()

  const searchSelected = location.pathname.includes('rechercher')
  const helpSelected = location.pathname.includes('aides')

  const isHome = location.pathname === '/'

  return (
    <Container>
      <HomeLink to="/" className="taille-fixe" title="Retour à l’accueil">
        <LogoMarianne
          src="marianne-logo"
          alt={`République Française - Liberté, Égalité, Fraternité${
            !isHome ? " - Retour à la page d'accueil" : ''
          }`}
        />

        <img
          src={LOGO}
          alt={`Mobiville Pôle emploi et Action logement${
            !isHome ? " - Retour à la page d'accueil" : ''
          }`}
        />
      </HomeLink>

      {displaySearch ? (
        <NavContainer>
          <NavItem to="/rechercher" $isSelected={searchSelected}>
            Rechercher une ville
          </NavItem>
          <NavItem to="/aides" $isSelected={helpSelected}>
            Rechercher des aides
          </NavItem>
        </NavContainer>
      ) : null}

      <PartnersContainer>
        <PartnerText>Proposé par</PartnerText>
        <PartnersLogoContainer>
          <a
            href="https://www.actionlogement.fr/"
            target="_blank"
            rel="noreferrer"
          >
            <LogoImagePartner src={LOGO_AL} alt="Action logement" />
          </a>
          <a
            href="https://www.pole-emploi.fr/"
            target="_blank"
            rel="noreferrer"
          >
            <LogoImagePartner src={LOGO_PE} alt="Pôle Emploi" />
          </a>
        </PartnersLogoContainer>
      </PartnersContainer>
    </Container>
  )
}

HeaderDesktop.propTypes = {
  displaySearch: PropTypes.bool,
}

export default HeaderDesktop
