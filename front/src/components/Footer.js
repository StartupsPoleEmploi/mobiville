import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { COLOR_VERT_MOBIVILLE } from '../constants/colors'
import { MOBILE_WIDTH } from '../constants/mobile'
import LOGO from '../assets/images/logo-mobiville.svg'
import Image from './Image'
import { useNomPage } from '../common/contexts'

const MainSpace = styled.div`
  background: white;
  border-top: 1px solid #e4e9ed;

  .footer {
    margin: auto;
    display: flex;
    width: 98%;
    max-width: 1040px;
    overflow: hidden;

    padding-bottom: 42px;
    padding-top: 42px;
    @media (max-width: ${MOBILE_WIDTH}px) {
      padding-top: 20px;
      flex-wrap: wrap;
      justify-content: start;
    }
  }
`

const Wrapper = styled.div`
  max-width: 700px;
  margin-top: 0px;

  @media (max-width: ${MOBILE_WIDTH}px) {
    &.descriptif {
      display: none;
    }
  }
  &.descriptif p {
    width: 336px;
    margin-block-start: unset;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #000000;
  }
`

const WrapperLinks = styled.div`
  max-width: 700px;
  border-left: 2px solid ${COLOR_VERT_MOBIVILLE};
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px auto auto 0px;
  @media (max-width: ${MOBILE_WIDTH}px) {
    border-left: unset;
    margin-left: 20px;
    flex: 1 0 100%;
  }
`

const Item = styled.div`
  margin: 0px auto 15px 42px;
  &:last-child {
    margin-bottom: 0px;
  }
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  @media (max-width: ${MOBILE_WIDTH}px) {
    margin: 0px 0px 24px 0px;
  }

  > a {
    color: black;
    &:hover {
      text-decoration: underline;
    }
  }
`

const WrapperLogos = styled(Wrapper)`
  div.logos {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: 1fr auto;
    grid-gap: 10px 26px;
    width: 354px;
  }
  @media (max-width: ${MOBILE_WIDTH}px) {
    margin-left: 20px;
    margin-top: 32px;
    margin-bottom: 20px;
  }

  .logo-al {
    img {
      width: 170px;
    }
  }
  .logo-pe {
    width: 65px;
  }
  .logo-fse {
    img {
      width: 75px;
    }
  }
  .europe {
    display: flex;
    img {
      width: 65px;
      height: 50px;
    }
    span {
      font-style: normal;
      font-size: 9px;
      line-height: 11px;
      color: #1b2b67;
    }
  }
`
const CopyRight = styled.p`
  color: black;
  margin-top: 15px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
`

const Footer = () => {
  const { nomPage } = useNomPage()
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <MainSpace>
      <div className="footer">
        <Wrapper className="descriptif">
          <p>
            Mobiville est un service vous permettant de trouver la ville qui
            correspond à votre besoin ainsi que les aides financières à la
            mobilité.
          </p>
          <img
            style={{ height: '85px' }}
            src={LOGO}
            loading="lazy"
            alt={`Mobiville Pôle emploi et Action logement${
              !isHome ? " - Retour à la page d'accueil" : ''
            }`}
          />
        </Wrapper>
        <WrapperLinks>
          <Item>
            <Link to="/faq">Questions fréquentes</Link>
          </Item>
          <Item>
            <Link to="/mentions-legales">Mentions légales</Link>
          </Item>
          <Item>
            <Link to="/accessibilite">Accessibilité : non conforme</Link>
          </Item>
          <Item>
            <a
              href="https://nextcloud.beta.pole-emploi.fr/s/stats-mobiville"
              target="_blank"
              rel="noreferrer"
            >
              Statistiques
            </a>
          </Item>
          <Item>
            <a href="mailto:contact@mobiville.pole-emploi.fr">
              contact@mobiville.pole-emploi.fr
            </a>
          </Item>
        </WrapperLinks>
        <WrapperLogos>
          <div className="logos">
            <a
              href="https://www.pole-emploi.fr/"
              target="_blank"
              rel="noreferrer"
              style={{ justifySelf: 'center', lineHeight: 0 }}
              tag-exit={`${nomPage}/footer/liens-pole-emploi`}
            >
              <img
                className="logo-pe"
                src="/logos/logo_pe.svg"
                alt="pole emploi"
                loading="lazy"
              />
            </a>
            <a
              href="https://www.actionlogement.fr/"
              target="_blank"
              rel="noreferrer"
              tag-exit={`${nomPage}/footer/liens-actionlogement`}
            >
              <Image
                className="logo-al"
                src="logos/logo_action-logement_small"
                alt="action logement"
              />
            </a>
            <a
              href="http://www.fse.gouv.fr/"
              tag-exit={`${nomPage}/footer/liens-fse`}
              target="_blank"
              rel="noreferrer"
            >
              <Image
                className="logo-fse"
                src="logos/logo_fonds_social_eu"
                alt="fond social européen"
              />
            </a>
            <a
              className="europe"
              href="http://www.fse.gouv.fr/"
              target="_blank"
              rel="noreferrer"
              tag-exit={`${nomPage}/footer/liens-fse`}
            >
              <img
                src="/logos/logo-ue.svg"
                alt="fond social européen"
                loading="lazy"
              />
              <span>
                Ce dispositif est cofinancé par le Fonds Social Européen dans le
                cadre du Programme opérationnel national "Emploi et inclusion"
                2014-2020
              </span>
            </a>
          </div>
          <CopyRight>
            Un site créé par Pole Emploi 2020-2022 -tous droits réservés
          </CopyRight>
        </WrapperLogos>
      </div>
    </MainSpace>
  )
}

export default Footer
