import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { MenuMobile } from './menu-mobile'
import { MenuDesktop } from './menu-desktop'
import { isMobileView } from '../constants/mobile'
import { useWindowSize } from '../common/hooks/window-size'
import { Footer } from './footer'
import { TopMobileMenu } from './top-mobile-menu'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  display: inline-block;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`

const GoToMainContent = styled.a`
  left: -999px;
  position: absolute;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  z-index: -999;

  &:focus,
  &:active {
    color: #fff;
    background-color: #000;
    left: auto;
    top: auto;
    width: 30%;
    height: auto;
    overflow: auto;
    margin: 10px 35%;
    padding: 5px;
    border-radius: 15px;
    border: 4px solid yellow;
    text-align: center;
    font-size: 1.2em;
    z-index: 999;
  }
`

export const MainLayout = ({ children, menu, footer, topMobileMenu }) => {
  const size = useWindowSize()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <Container>
      <GoToMainContent href="#main">Aller au contenu</GoToMainContent>
      {isMobileView(size) && topMobileMenu && <TopMobileMenu />}
      {isMobileView(size) && menu.visible && <MenuMobile {...menu} />}
      {!isMobileView(size) && menu.visible && <MenuDesktop {...menu} />}
      <Main
        id="main"
        tabIndex="-1"
        style={{
          paddingBottom: isMobileView(size) ? 60 : 0,
          paddingTop: isMobileView(size) ? 0 : 76,
        }}
      >
        {children}
      </Main>
      {footer && <Footer />}
    </Container>
  )
}

MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  menu: PropTypes.oneOfType([PropTypes.object]),
  footer: PropTypes.bool,
  topMobileMenu: PropTypes.bool,
}

MainLayout.defaultProps = {
  menu: {
    visible: true,
  },
  footer: false,
  topMobileMenu: false,
}
