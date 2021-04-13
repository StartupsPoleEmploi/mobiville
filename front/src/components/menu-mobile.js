import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import { COLOR_PRIMARY, COLOR_TEXT_SECONDARY } from '../constants/colors'

const Wrapper = styled.div`
  position: fixed;
  height: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);
`

const MainWrapper = styled.div`
  background: #FFFFFF;
  height: 60px;
  display: flex;
  align-items: stretch;
  justify-content: center;
  padding: 0 16px;
  position: relative;
`

const Item = styled(Link)`
  && {
    flex: 1;
    text-decoration: none;
    position: relative;
    display: flex;
    flex-direction: column;
    align-item: center;
    justify-content: center;
    color: ${(props) => (props.selected ? COLOR_PRIMARY : COLOR_TEXT_SECONDARY)};

    &:before {
      content: ' ';
      background-color: ${COLOR_PRIMARY};
      position: absolute;
      top: 0;
      transform: translateX(-50%);
      left: 50%;
      translate
      right: 0;
      height: 4px;
      border-radius: 0px 0px 2px 2px;
      max-width: 74px;
      width: 100%;
      display: ${(props) => (props.selected ? 'block' : 'none')};
    }
  }
`

const Icon = styled.i`
  width: 20px;
  height: 20px;
  display: block;
  margin: 0 auto 6px auto;
  color: inherit;
`

const Text = styled(Typography)`
  && {
    font-weight: bold;
    font-size: 10px;
    text-align: center;
    color: inherit;
  }
`

const MENU_LINK = [{
  path: '/', icon: 'house', label: 'Accueil', selected: false
}, {
  path: '/rechercher', icon: 'explore', label: 'Recherche', selected: false
}, {
  path: '/aides', icon: 'support', label: 'Les aides', selected: false
}, {
  path: '/compte', icon: 'account_circle', label: 'Compte', selected: false
}]

export const MenuMobile = () => {
  const [menuLink, setMenuLink] = useState(MENU_LINK)
  const location = useLocation()

  useEffect(() => {
    setMenuLink(MENU_LINK.map((m) => ({ ...m, selected: m.path === location.pathname })))
  }, [location])

  return (
    <Wrapper>
      <MainWrapper>
        {menuLink.map((m) => (
          <Item key={m.path} to={m.path} selected={m.selected}>
            <Icon className="material-icons">{m.icon}</Icon>
            <Text>{m.label}</Text>
          </Item>
        ))}
      </MainWrapper>
    </Wrapper>
  )
}

MenuMobile.propTypes = {
}

MenuMobile.defaultProps = {
}
