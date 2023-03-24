import React, { useEffect } from 'react'
import styled from 'styled-components'
import loadable from '@loadable/component'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

import { useDevice } from '../common/contexts'

const HeaderMobile = loadable(() => import('./HeaderMobile'))
const HeaderDesktop = loadable(() => import('./HeaderDesktop'))
const MenuMobile = loadable(() => import('./MenuMobile'))
const Footer = loadable(() => import('./Footer'))

const Container = styled.div`
  height: 100%;
`

const Main = styled.main`
  position: relative;
  width: 100%;
  min-height: 80vh;
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

const MainLayout = ({
  children,
  menu = {
    visible: true,
    menuMobileVisible: true,
  },
  topMobileMenu = false,
  style = {},
  displaySearch = true,
}) => {
  const { isMobile } = useDevice()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <Container>
      <GoToMainContent href="#main">Aller au contenu</GoToMainContent>
      {isMobile && topMobileMenu && <HeaderMobile />}
      {isMobile && menu.visible && menu.menuMobileVisible && (
        <MenuMobile {...menu} />
      )}
      {!isMobile && menu.visible && (
        <HeaderDesktop displaySearch={displaySearch} {...menu} />
      )}
      <Main
        id="main"
        tabIndex="-1"
        style={{
          paddingBottom: isMobile ? 30 : 60,
          ...style,
        }}
      >
        {children}
      </Main>
      <Footer />
    </Container>
  )
}

MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  menu: PropTypes.oneOfType([PropTypes.object]),
  topMobileMenu: PropTypes.bool,
  style: PropTypes.object,
  displaySearch: PropTypes.bool,
}

export default MainLayout
