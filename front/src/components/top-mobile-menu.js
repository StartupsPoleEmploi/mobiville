import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import LOGO from '../assets/images/logo_MobiVille.svg'
import LOGO_AL from '../assets/images/logo-action-logement.png'
import LOGO_PE from '../assets/images/logo-pole-emploi.png'

const MainSpace = styled.div`
  height: 76px;
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

const Container = styled.div`
  background-color: white;
  height: 76px;
  top: 0;
  left: 0;
  right: 0;
  position: fixed;
  display: flex;
  padding: 0 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2);
  align-items: center;
`

export const TopMobileMenu = () => (
  <MainSpace>
    <Container>
      <Link to="/"><LogoImage src={LOGO} alt="logo" /></Link>
      <div className="flex-1" />
      <Text>Proposé par</Text>
      <a href="https://www.actionlogement.fr/" target="_blank" rel="noreferrer"><LogoImagePartener src={LOGO_AL} alt="Action logement" /></a>
      <a href="https://www.pole-emploi.fr/" target="_blank" rel="noreferrer"><LogoImagePartener src={LOGO_PE} alt="Pôle Emploi" /></a>
    </Container>
  </MainSpace>
)
