import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Main = styled.div`
  width: 280px;
  background-color: white;
`

const Item = styled.div`
 
`

export const ConnectedMenu = () => (
  <Main>
    <Item><Link to="/dashboard">Dashboard</Link></Item>
    <Item><Link to="/calendar">Calendar</Link></Item>
    <Item><Link to="/account">Account</Link></Item>
    <Item>Logout</Item>
  </Main>
)
