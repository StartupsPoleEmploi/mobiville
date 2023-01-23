import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import Image from './Image'

const Header = styled.header`
  height: 102px;
  padding: 0 16px;

  display: flex;
  align-items: center;

  background-color: #fff;
`

const LogoMarianne = styled(Image)`
  height: 70px;
  margin-right: 16px;
`

const LogoMobiville = styled(Image)`
  width: 100%;
  max-height: 100%;
  object-fit: cover;
`

const HeaderMobile = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <Header>
      <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
        <LogoMarianne
          src="marianne-logo"
          alt={`République Française - Liberté, Égalité, Fraternité${
            !isHome ? " - Retour à la page d'accueil" : ''
          }`}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LogoMobiville
            src="logo-mobiville"
            alt={`Mobiville Pôle emploi et Action logement${
              !isHome ? " - Retour à la page d'accueil" : ''
            }`}
          />
        </div>
      </Link>
    </Header>
  )
}

export default HeaderMobile
