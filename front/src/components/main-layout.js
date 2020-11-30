import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Menu } from './menu'

const Main = styled.div`
  height: 100%;
`

const Container = styled.div`
  display: inline-block;
  width: 100%;
`

export const MainLayout = ({ children, menu }) => (
  <Main>
    <Menu {...menu} />
    <Container>
      {children}
    </Container>
  </Main>
)

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
