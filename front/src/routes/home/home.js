import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { MainLayout } from '../../components/main-layout'
import { COLOR_TEXT_PRIMARY, COLOR_PRIMARY } from '../../constants/colors'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'

import heroHomepagePic from '../../assets/images/00-Hero-Homepage.png'
import { ReactComponent as MagnifyingGlassIcon } from '../../assets/images/magnifying-glass.svg'
import { ReactComponent as SuperheroIcon } from '../../assets/images/superhero.svg'
import { ReactComponent as MapPointerIcon } from '../../assets/images/map-pointer.svg'
import { ReactComponent as PrizeIcon } from '../../assets/images/prize.svg'
import { ReactComponent as MoneyClockIcon } from '../../assets/images/money-clock.svg'

const H1 = styled.h1`
  font-size: 36px;
`

const TopBlockContainer = styled.div`
  background: linear-gradient(180deg, #ddddea 0%, #c3e9e9 100%);
`

const BlocksContainer = styled.div`
  background-color: #fff;
  padding-top: 64px;
`

const Block = styled.div`
  width: 100%;
  max-width: 1040px;
  margin: auto;
  padding: 8px 16px;
`

const AdvantageBlocksContainer = styled.div`
  display: flex;
  margin: 0 auto 32px;
`

const AdvantageBlock = styled.div`
  background: #f6f7fb;
  border-radius: 8px;
  display: flex;
  max-width: 336px;
  width: 100%;
  overflow: hidden;
  padding: 16px;

  &:not(:first-child) {
    margin-left: 16px;
  }
`

const AdvantageIconContainer = styled.div`
  flex-shrink: 0;
  margin-right: 16px;
`

const AdvantageTextH3 = styled.h3`
  margin-top: 0;
`

const AdvantageTextP = styled.p`
  margin: 0;
`

const MainNavButtons = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border: 1px solid ${COLOR_PRIMARY};
  box-shadow: 6px 6px 0px #37b4b4;
  border-radius: 16px;
  color: ${COLOR_PRIMARY};
  font-weight: 500;
  font-size: 18px;
  padding: 16px;
  max-width: 424px;
  width: 100%;

  &:first-of-type {
    margin-right: 16px;
  }
`

const actionButtonStyle = `
  text-decoration: none;
  background-color: ${COLOR_PRIMARY};
  height: 48px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 205px;
`

const ActionButton = styled(Link)`
  &,&: hover {
    color: #fff;
  }

  ${actionButtonStyle}
`

const ActionButtonSecondary = styled.a`
  ${actionButtonStyle}
  background-color: #fff;
  color: ${COLOR_PRIMARY};
  margin: auto;
`

const MobilityGuideBlock = styled(Block)`
  padding: 0 64px;
  background: #c3e9e9;
  border-radius: 16px;
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SurveyBlock = styled(Block)`
  padding: 32px;
  text-align: center;
  color: white;
  background: #191970;
  border-radius: 16px;
  margin-bottom: 32px;
`

const HomePage = () => {
  return (
    <MainLayout footer topMobileMenu>
      <Helmet>
        <title>Mobiville - La Mobilité Facile en France</title>
        <meta
          name="description"
          content="Mobiville est un service vous permettant de trouver la ville qui correspond à votre besoin ainsi que les aides financières à la mobilité."
        />
      </Helmet>

      <TopBlockContainer>
        <Block style={{ textAlign: 'center', padding: 64 }}>
          <H1>Trouver l’emploi, et la ville qui va avec !</H1>
          <div
            style={{ display: 'flex', justifyContent: 'center', padding: 32 }}
          >
            <MainNavButtons to="/rechercher">
              <MagnifyingGlassIcon />
              <span>Rechercher ou découvrir une ville</span>
            </MainNavButtons>
            <MainNavButtons to="/helps">
              <SuperheroIcon />
              <span>Les aides pour mon projet</span>
            </MainNavButtons>
          </div>
          <p style={{ fontWeight: 500, fontSize: 18, margin: 0 }}>
            Mobiville vous aide à identifier les territoires dans lesquels il y
            a de l’emploi et peu de concurrence afin d’accélérer votre retour à
            l’emploi
          </p>
        </Block>
      </TopBlockContainer>

      <BlocksContainer>
        <Block style={{ padding: 0 }}>
          <h2 style={{ margin: '0 auto 32px', textAlign: 'center' }}>
            Les avantages de votre service Mobiville
          </h2>
          <AdvantageBlocksContainer>
            <AdvantageBlock>
              <AdvantageIconContainer>
                <MapPointerIcon />
              </AdvantageIconContainer>
              <div>
                <AdvantageTextH3>
                  Identifiez la meilleure destination
                </AdvantageTextH3>
                <AdvantageTextP>
                  Mobiville vous donne une visibilité sur le marché de l’emploi,
                  de l’immobilier et le cadre de vie afin de choisir une ville
                  qui correspond à votre profil.
                </AdvantageTextP>
              </div>
            </AdvantageBlock>
            <AdvantageBlock>
              <AdvantageIconContainer>
                <PrizeIcon />
              </AdvantageIconContainer>
              <div>
                <AdvantageTextH3>Évitez la concurrence</AdvantageTextH3>
                <AdvantageTextP>
                  Notre service vous propose en priorité les villes avec peu de
                  candidats sur le territoire afin d’optimiser votre recherche
                  d’emploi.
                </AdvantageTextP>
              </div>
            </AdvantageBlock>
            <AdvantageBlock>
              <AdvantageIconContainer>
                <MoneyClockIcon />
              </AdvantageIconContainer>
              <div>
                <AdvantageTextH3>
                  Gagnez du temps et de l’argent
                </AdvantageTextH3>
                <AdvantageTextP>
                  Découvrez des conseils et des aides financières,
                  administratives ou humaines que vous pouvez mobiliser dans
                  votre projet.
                </AdvantageTextP>
              </div>
            </AdvantageBlock>
          </AdvantageBlocksContainer>
        </Block>

        <MobilityGuideBlock>
          <div>
            <h2>Par où commencer ?... Où aller ?... Comment faire ?...</h2>
            <h3>Les réponses se trouvent dans notre guide à la mobilité</h3>
            <ActionButton to="/mobility-guide">Accéder au guide</ActionButton>
          </div>
          <img src={heroHomepagePic} alt="" />
        </MobilityGuideBlock>

        <SurveyBlock>
          <h2>Mobiville a besoin de votre aide pour s’améliorer</h2>
          <h3>Aidez nous en répondant à notre enquête de satisfaction</h3>
          <ActionButtonSecondary
            href="https://startupsbeta.typeform.com/to/kPDt1Rfk"
            target="_blank"
            rel="noreferrer noopener"
          >
            Répondre à l’enquête
          </ActionButtonSecondary>
        </SurveyBlock>
      </BlocksContainer>
    </MainLayout>
  )
}

export default HomePage
