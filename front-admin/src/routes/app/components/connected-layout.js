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
  padding: 16px 32px;
`

export const ConnectedLayout = ({ children, title }) => (
  <Main>
    <ConnectedMenu />
    <Content>
      <h2>{title}</h2>
      {children}
    </Content>
  </Main>
)

ConnectedLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  title: PropTypes.string
}

ConnectedLayout.defaultProps = {
  title: ''
}
