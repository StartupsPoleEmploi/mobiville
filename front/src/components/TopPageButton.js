import React from 'react'
import styled from 'styled-components'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

import { COLOR_OTHER_GREEN, COLOR_PRIMARY } from '../constants/colors'
import { useDevice } from '../common/contexts'

const Container = styled.a`
  margin: auto;
  z-index: 11;
  cursor: pointer;
  position: absolute;
  right: max(32px, calc(((100vw - min(1040px, 100%)) / 4) - 50px));
  bottom: 32px;
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
  const { isMobile } = useDevice()

  return (
    <Container onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <ArrowContainer>
        <ArrowUpwardIcon fontSize="large" />
      </ArrowContainer>
      { isMobile ? null : <Text>Haut de page</Text> }
    </Container>
  )
}

TopPageButton.props = {}

export default TopPageButton
