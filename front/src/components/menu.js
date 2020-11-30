import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import LOGO from '../assets/images/logo_MobiVille.svg'

const MainSpace = styled.div`
`

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2);
`

const MainWrapper = styled.div`
  background: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  position: relative;
`

const SecondWrapper = styled.div`
  background: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LogoImage = styled.img`
  height: 40px;
`

const LogoBt = styled(Link)`
  && {
    position: absolute;
    left: 16px;
  }
`

const Title = styled(Typography)`
  && {
    font-weight: 500;
    font-size: 18px;
  }
`

const SecondTitle = styled(Typography)`
  && {
    font-size: 12px;
  }
`

const BackBt = styled(Link)`
  && {
    position: absolute;
    left: 16px;
  }
`

export const Menu = ({
  logo, mainStyle, mainHeight, title, secondWrapper, secondTitle, secondHeight, backButton
}) => (
  <MainSpace style={{ height: secondWrapper ? mainHeight + secondHeight : mainHeight }}>
    <Wrapper>
      <MainWrapper style={{ ...mainStyle, height: mainHeight }}>
        {backButton && <BackBt to={backButton}><i className="material-icons">arrow_back</i></BackBt>}
        {logo && <LogoBt to="/"><LogoImage src={LOGO} alt="logo" /></LogoBt>}
        {title && <Title>{title}</Title>}
      </MainWrapper>
      {secondWrapper && (
      <SecondWrapper style={{ height: secondHeight }}>
        {secondTitle && <SecondTitle>{secondTitle}</SecondTitle>}
      </SecondWrapper>
      )}
    </Wrapper>
  </MainSpace>
)

Menu.propTypes = {
  logo: PropTypes.bool,
  mainStyle: PropTypes.oneOfType([
    PropTypes.object
  ]),
  title: PropTypes.string,
  mainHeight: PropTypes.number,
  secondWrapper: PropTypes.bool,
  secondTitle: PropTypes.string,
  secondHeight: PropTypes.number,
  backButton: PropTypes.string
}

Menu.defaultProps = {
  logo: true,
  mainStyle: {},
  title: null,
  mainHeight: 72,
  secondWrapper: false,
  secondTitle: null,
  secondHeight: 46,
  backButton: null
}
