import React from 'react'
import styled from 'styled-components'
import { COLOR_OTHER_GREEN, COLOR_PRIMARY } from '../constants/colors'
import { useWindowSize } from '../common/hooks/window-size'
import { isMobileView } from '../constants/mobile'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

const Container = styled.a`
  margin: auto;
  z-index: 11;

  position: absolute;
  right: max(32px, calc(((100vw - min(1040px, 100%)) / 4) - 50px));
  bottom: 64px;
`

const ArrowContainer = styled.div`
  margin: auto;
  display: grid;
  place-content: center;

  border-radius: 100%;
  width: 48px;
  height: 48px;

  background-color: ${COLOR_OTHER_GREEN};
  size: 26px;
`

const Text = styled.p`
  margin: 8px;
  color: ${COLOR_PRIMARY};

  size: 16px;
`

const TopPageButton = () => {
  const isMobile = isMobileView(useWindowSize())

  if (isMobile) return null

  return (
    <Container onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <ArrowContainer>
        <ArrowUpwardIcon fontSize="large" />
      </ArrowContainer>
      <Text>Haut de page</Text>
    </Container>
  )
}

TopPageButton.props = {}

export default TopPageButton
