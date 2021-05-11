import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined'
import { useHelps } from '../../common/contexts/helpsContext'
import { useWindowSize } from '../../common/hooks/window-size'
import { MainLayout } from '../../components/main-layout'
import {
  COLOR_TEXT_PRIMARY, COLOR_TEXT_SECONDARY
} from '../../constants/colors'
import { isMobileView } from '../../constants/mobile'
import { ucFirstOnly } from '../../utils/utils'

const Header = styled.div`
  position: fixed;
  top: 76px;
  left: 0;
  right: 0;
  background-color: white;
  height: 92px;
  display: flex;
  justify-content: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2);

  p {
    text-align: center;
    font-weight: 500;
    font-size: 24px;
    margin: auto;
    padding: 0;
    color: ${COLOR_TEXT_PRIMARY};
    max-width: 1041px;
    width: 80%;
    position: relative;
  }

  ${(props) => (props.isMobile ? `
    height: 76px;
    top: 0;

    p {
      font-size: 18px;
    }
  ` : '')}
`

const Container = styled.div`
  overflow: auto;
  height: 100%;
  margin-top: 108px;
  padding-bottom: 92px;

  ${(props) => (props.isMobile ? `
    margin-top: 76px;
  ` : '')}
`

const Tag = styled.div`
  background: #FFFFFF;
  border: 1px solid ${COLOR_TEXT_SECONDARY};
  color: ${COLOR_TEXT_PRIMARY};
  box-sizing: border-box;
  border-radius: 1000px;
  display: inline-block;
  margin-right: 8px;
  margin-bottom: 8px;
  padding: 4px 6px;
  font-size: 12px;
`

const Panel = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 16px;
  width: 100%;
  max-width: 512px;
  margin-bottom: 16px;
  margin-left: auto;
  margin-right: auto;

  ${(props) => (props.isMobile ? `
    max-width: auto;
    margin-bottom: 2px;
    margin-left: 0;
    margin-right: 0;
    box-shadow: none;
    border-radius: 0;
  ` : '')}
`

const Title = styled(Typography)`
  && {
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 16px;
  }
`

const Description = styled(Typography)`
  && {
    font-size: 14px;
    margin-bottom: 16px;
  }
`

const LinkBack = styled(Link)`
  position: absolute;
  left: -25px;
  top: 2px;
  cursor: pointer;
`

const ArrowBack = styled(ArrowBackOutlinedIcon)`
  color: ${COLOR_TEXT_PRIMARY};
`

const HelpButton = styled.button`
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  height: 48px !important;
  align-items: center;
  justify-content: center;
  font-size: 16px !important;
  cursor: pointer;
  width: ${(props) => (props.isMobile ? 'calc(100% - 32px)' : '')};
  padding: ${(props) => (props.isMobile ? '0 12px' : '0 48px')} !important;

  ${(props) => (props.isMobile ? `
    bottom: 70px;
  ` : '')}
`

const HelpDetailsPage = () => {
  const { id } = useParams()
  const { help, onLoadPreviewId } = useHelps()
  const size = useWindowSize()

  useEffect(() => {
    if (id) {
      const split = (id || '').split('-')
      onLoadPreviewId(split[0])
    }
  }, [id])

  return (
    <MainLayout>
      {help && (
      <>
        <Header isMobile={isMobileView(size)}>
          <p>
            <LinkBack to="/aides"><ArrowBack /></LinkBack>
            {help.title}
          </p>
        </Header>
        <Container isMobile={isMobileView(size)}>
          <Panel isMobile={isMobileView(size)}>
            <Title>Objectif de l’aide</Title>
            <Description>{help.goal}</Description>
          </Panel>
          <Panel isMobile={isMobileView(size)}>
            <Title>
              Descriptif de l
              {'\''}
              aide
            </Title>
            <Description dangerouslySetInnerHTML={{
              __html: help.description
            }}
            />
          </Panel>
          <Panel isMobile={isMobileView(size)}>
            <Title>Quand faire la demande ?</Title>
            <Description dangerouslySetInnerHTML={{
              __html: help.when
            }}
            />
          </Panel>
          <Panel isMobile={isMobileView(size)}>
            <Title>Quelles conditions ?</Title>
            <Description dangerouslySetInnerHTML={{
              __html: help.conditions
            }}
            />
          </Panel>
          <Panel isMobile={isMobileView(size)}>
            <Title>Est-elle cumulable ?</Title>
            <Description dangerouslySetInnerHTML={{
              __html: help.cumulable
            }}
            />
          </Panel>
          <Panel isMobile={isMobileView(size)}>
            <Title>Public concerné</Title>
            {help.who.split(',').map((t) => <Tag key={t}>{ucFirstOnly(t)}</Tag>)}
          </Panel>

          { /* eslint-disable-next-line */ }
          <a target="_blank" href={help.link} style={{ cursor: 'pointer' }} tag-exit={`faire-ma-demande/${help.title}`}>
            <HelpButton className="btn primary" type="button" isMobile={isMobileView(size)}>Faire ma demande</HelpButton>
          </a>

        </Container>
      </>
      )}
      {!help && (<p>Chargement...</p>)}
    </MainLayout>
  )
}

export default HelpDetailsPage
