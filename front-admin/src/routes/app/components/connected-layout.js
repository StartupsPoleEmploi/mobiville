import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { ConnectedMenu } from './connected-menu'

const Main = styled.div`
  display: flex;
  height: 100%;
`

const Content = styled.div`
  flex: 1;
  overflow: auto;
`

export const ConnectedLayout = ({ children }) => (
  <Main>
    <ConnectedMenu />
    <Content>{children}</Content>
  </Main>
)

ConnectedLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}
