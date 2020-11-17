import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Menu } from './menu'

const Main = styled.div`
`

export const MainLayout = ({ children }) => (
  <Main>
    <Menu />
    {children}
  </Main>
)

MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}
