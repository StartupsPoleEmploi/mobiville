import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import MenuMobile from './MenuMobile'
import HeaderMobile from './HeaderMobile'
import HeaderDesktop from './HeaderDesktop'
import { isMobileView } from '../constants/mobile'
import { useWindowSize } from '../common/hooks/window-size'
import { Footer } from './footer'

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

export const MainLayout = ({
  children,
  menu,
  footer,
  topMobileMenu,
  style = {},
}) => {
  const size = useWindowSize()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <Container>
      <GoToMainContent href="#main">Aller au contenu</GoToMainContent>
      {isMobileView(size) && topMobileMenu && <HeaderMobile />}
      {isMobileView(size) && menu.visible && <MenuMobile {...menu} />}
      {!isMobileView(size) && menu.visible && <HeaderDesktop {...menu} />}
      <Main
        id="main"
        tabIndex="-1"
        style={{
          paddingBottom: isMobileView(size) ? 60 : 0,
          paddingTop: isMobileView(size) ? 0 : 102,
          ...style,
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
  style: PropTypes.object,
}

MainLayout.defaultProps = {
  menu: {
    visible: true,
  },
  footer: false,
  topMobileMenu: false,
  style: {},
}
