import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { useHelps } from '../../common/contexts/helpsContext'
import { useWindowSize } from '../../common/hooks/window-size'
import { MainLayout } from '../../components/main-layout'
import {
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_TEXT_PRIMARY,
  COLOR_TEXT_SECONDARY,
} from '../../constants/colors'
import { isMobileView } from '../../constants/mobile'
import { ucFirstOnly } from '../../utils/utils'

const DesktopHeaderLink = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  max-width: 1100px;
  width: 100%;
  margin: auto;
  padding: 16px;
  color: ${COLOR_TEXT_PRIMARY};
`

const DesktopHeaderContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  background-color: white;
  top: 76;
  height: 112px;
  width: 100%;
  display: flex;
  align-items: center;
  width: 100%;
`

const DesktopHeaderArrowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${COLOR_GRAY};
`

const DesktopHeaderTextContainer = styled.div`
  margin-left: 40px;
`

const MobileHeaderLink = styled(Link)`
  left: 16px;
  top: 16px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 76;
  color: ${COLOR_PRIMARY};
  padding: 8px 16px 8px 8px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12),
    0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 100px;
`

const MobileHeaderText = styled.div`
  margin-left: 8px;
  font-size: 12px;
  font-weight: 500;
`

const H1 = styled.h1`
  text-align: center;
  font-weight: 500;
  font-size: ${({ isMobile }) => (isMobile ? '18px' : '24px')};
  margin: auto;
  color: ${COLOR_TEXT_PRIMARY};
  width: 80%;
`

const Container = styled.div`
  display: ${({ isMobile }) => (isMobile ? 'block' : 'flex')};
  max-width: ${({ isMobile }) => (isMobile ? 'inherit' : '1100px')};
  margin: auto;
  margin-top: ${({ isMobile }) => (isMobile ? '0' : '108px')};
  align-items: flex-start;
  padding: ${({ isMobile }) => (isMobile ? '0' : '0 16px')};
`

const TitleContainer = styled.div`
  margin-right: ${({ isMobile }) => (isMobile ? '0' : '16px')};
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  border: ${({ isMobile }) => (isMobile ? 'none' : `1px solid ${COLOR_GRAY}`)};
`

const TitleImgContainer = styled.div`
  background-color: ${COLOR_GRAY};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`

const TitleTextContainer = styled.div`
  padding: 16px;
`

const Panel = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 16px 16px 8px;
  width: 100%;
  margin-bottom: ${({ isMobile }) => (isMobile ? '8px' : `16px`)};
  border: ${({ isMobile }) => (isMobile ? 'none' : `1px solid ${COLOR_GRAY}`)};
`

const PanelTitle = styled.h2`
  font-weight: bold;
  font-size: 16px;
  margin: 0 0 16px;
`

const DoublePanelsContainer = styled.div`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};

  & > *:first-child {
    margin-right: 16px;
  }
`
const PanelsContainer = styled.div`
  max-width: ${({ isMobile }) => (isMobile ? 'inherit' : '688px')};
  width: 100%;
`

const Description = styled.p`
  font-size: 14px;
`
const HelpLink = styled.a`
  display: flex;
  height: 48px;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  background: ${COLOR_PRIMARY};
  border-radius: 37px;
  padding: 8 32px;
  width: 214px;
  margin: auto;

  &,
  &:hover {
    color: #fff;
  }
`

const HelpDetailsPage = () => {
  const { slug } = useParams()
  const { help, onLoadPreview } = useHelps()
  const size = useWindowSize()

  useEffect(() => {
    if (slug) {
      onLoadPreview(slug)
    }
  }, [slug])

  const isMobile = isMobileView(size)

  if (!help) {
    return <MainLayout>Chargement…</MainLayout>
  }

  return (
    <MainLayout>
      <Helmet>
        <title>{help.title} - Mobiville</title>
        <meta
          name="description"
          content="Cette aide va vous permettre d'aborder votre projet de mobilité plus sereinement"
        />
      </Helmet>
      {isMobile ? (
        <MobileHeaderLink to="/aides">
          <ArrowBackIcon color="primary" />
          <MobileHeaderText>Retour</MobileHeaderText>
        </MobileHeaderLink>
      ) : (
        <DesktopHeaderContainer>
          <DesktopHeaderLink to="/aides">
            <DesktopHeaderArrowContainer>
              <ArrowBackIcon color="primary" />
            </DesktopHeaderArrowContainer>
            <DesktopHeaderTextContainer>
              Retour à la liste d’aides
            </DesktopHeaderTextContainer>
          </DesktopHeaderLink>
        </DesktopHeaderContainer>
      )}
      <Container isMobile={isMobile}>
        <TitleContainer isMobile={isMobile}>
          <TitleImgContainer>
            <img
              src={`/help-logos/${help.logo}`}
              alt=""
              style={{
                width: 96,
                height: 'auto',
              }}
            />
          </TitleImgContainer>
          <TitleTextContainer>
            <H1 isMobile={isMobile}>{help.title}</H1>

            <Description style={{ textAlign: 'center' }}>
              {help.goal}
            </Description>

            <Description
              style={{ textAlign: 'center', color: COLOR_TEXT_SECONDARY }}
            >
              Aide proposée par {help.partner}
            </Description>

            {!isMobile && (
              <div style={{ margin: 'auto' }}>
                <HelpLink
                  target="_blank"
                  href={help.link}
                  tag-exit={`faire-ma-demande/${help.title}`}
                  isMobile={isMobile}
                >
                  Faire ma demande
                </HelpLink>
              </div>
            )}
          </TitleTextContainer>
        </TitleContainer>

        <PanelsContainer isMobile={isMobile}>
          <Panel isMobile={isMobile}>
            <PanelTitle>
              Descriptif de l{"'"}
              aide
            </PanelTitle>
            <Description
              dangerouslySetInnerHTML={{
                __html: help.description,
              }}
            />
          </Panel>
          <Panel isMobile={isMobile}>
            <PanelTitle>Quand faire la demande ?</PanelTitle>
            <Description
              dangerouslySetInnerHTML={{
                __html: help.when,
              }}
            />
          </Panel>
          <Panel isMobile={isMobile}>
            <PanelTitle>Quelles conditions ?</PanelTitle>
            <Description
              dangerouslySetInnerHTML={{
                __html: help.conditions,
              }}
            />
          </Panel>

          <DoublePanelsContainer isMobile={isMobile}>
            <Panel isMobile={isMobile}>
              <PanelTitle>Est-elle cumulable ?</PanelTitle>
              <Description
                dangerouslySetInnerHTML={{
                  __html: help.cumulable,
                }}
              />
            </Panel>
            <Panel isMobile={isMobile}>
              <PanelTitle>Public concerné</PanelTitle>
              {help.who
                .split(',')
                .map((t) => ucFirstOnly(t))
                .join(' · ')}
            </Panel>
          </DoublePanelsContainer>
        </PanelsContainer>

        {isMobile && (
          <a
            target="_blank"
            href={help.link}
            style={{ cursor: 'pointer' }}
            tag-exit={`faire-ma-demande/${help.title}`}
          >
            <HelpLink
              target="_blank"
              href={help.link}
              tag-exit={`faire-ma-demande/${help.title}`}
              isMobile={isMobile}
            >
              Faire ma demande
            </HelpLink>
          </a>
        )}
        <div />
      </Container>
    </MainLayout>
  )
}

export default HelpDetailsPage
