import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import LOGO from '../assets/images/LogoMobiville_gros.svg'

const MainSpace = styled.div``

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(0, 0, 0, 0.12),
    0px 1px 5px rgba(0, 0, 0, 0.2);
  z-index: 1;
`

const MainWrapper = styled.div`
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  position: relative;
`

const SecondWrapper = styled.div`
  background: #ffffff;
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

const BackBtLink = styled(Link)`
  && {
    position: absolute;
    left: 16px;
  }
`

const BackBt = styled.div`
  && {
    position: absolute;
    left: 16px;
  }
`

export const Menu = ({
  logo,
  mainStyle,
  mainHeight,
  title,
  visible,
  secondWrapper,
  secondTitle,
  secondHeight,
  backButton,
}) => {
  let totalHeight = 0
  if (visible) {
    totalHeight += mainHeight
  }
  if (secondWrapper) {
    totalHeight += secondHeight
  }

  return (
    <MainSpace style={{ height: totalHeight, minHeight: totalHeight }}>
      <Wrapper>
        {visible && (
          <MainWrapper style={{ ...mainStyle, height: mainHeight }}>
            {backButton && (
              <>
                {typeof backButton === 'string' && (
                  <BackBtLink to={backButton}>
                    <i className="material-icons">arrow_back</i>
                  </BackBtLink>
                )}
                {typeof backButton !== 'string' && (
                  <BackBt onClick={backButton}>
                    <i className="material-icons">arrow_back</i>
                  </BackBt>
                )}
              </>
            )}
            {logo && (
              <LogoBt to="/">
                <LogoImage src={LOGO} alt="logo" />
              </LogoBt>
            )}
            {title && <Title>{title}</Title>}
          </MainWrapper>
        )}
        {secondWrapper && (
          <SecondWrapper style={{ height: secondHeight }}>
            {secondTitle && <SecondTitle>{secondTitle}</SecondTitle>}
          </SecondWrapper>
        )}
      </Wrapper>
    </MainSpace>
  )
}

Menu.propTypes = {
  logo: PropTypes.bool,
  mainStyle: PropTypes.oneOfType([PropTypes.object]),
  title: PropTypes.string,
  mainHeight: PropTypes.number,
  secondWrapper: PropTypes.bool,
  secondTitle: PropTypes.string,
  secondHeight: PropTypes.number,
  backButton: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  visible: PropTypes.bool,
}

Menu.defaultProps = {
  logo: true,
  mainStyle: {},
  title: null,
  mainHeight: 72,
  secondWrapper: false,
  secondTitle: null,
  secondHeight: 46,
  backButton: null,
  visible: true,
}
