import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { MenuMobile } from './menu-mobile'
import { MenuDesktop } from './menu-desktop'
import { isMobileView } from '../constants/mobile'
import { useWindowSize } from '../common/hooks/window-size'

const Main = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Container = styled.div`
  display: inline-block;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const MainLayout = ({ children, menu }) => {
  const size = useWindowSize()

  return (
    <Main>
      {isMobileView(size) && <MenuMobile {...menu} />}
      {!isMobileView(size) && <MenuDesktop {...menu} />}
      <Container style={{
        paddingBottom: isMobileView(size) ? 60 : 0,
        paddingTop: isMobileView(size) ? 0 : 76
      }}
      >
        {children}
      </Container>
    </Main>
  )
}

MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  menu: PropTypes.oneOfType([
    PropTypes.object
  ])
}

MainLayout.defaultProps = {
  menu: {}
}
