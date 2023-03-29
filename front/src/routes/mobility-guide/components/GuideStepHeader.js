import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import {
  COLOR_WHITE,
  COLOR_PRIMARY,
  COLOR_OTHER_GREEN,
} from '../../../constants/colors'
import { Image } from '../../../components'
import BackButton from '../../../components/buttons/BackButton'
import { useDevice } from '../../../common/contexts'

const Container = styled.div`
  grid-area: header;
  padding: ${({ $isMobile }) => ($isMobile ? '24px 16px' : '24px 0')};
  background-color: ${COLOR_OTHER_GREEN};
`

const Wrapper = styled.div`
  max-width: 1040px;
  width: 100%;
  margin: auto;

  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
`

const TitleContainer = styled.div`
  flex: 1;
`

const Step = styled.span`
  padding: 8px;
  background-color: ${COLOR_WHITE};

  color: ${COLOR_PRIMARY};
  font-size: 24px;
  font-weight: 900;
  line-height: 36px;
`

const Title = styled.h1`
  padding: 8px;
  margin: 0;

  background-color: ${COLOR_WHITE};

  color: ${COLOR_PRIMARY};
  font-size: 36px;
  font-weight: 900;
  line-height: 44px;
`

const ImageContainer = styled.div`
  flex: 1;

  display: grid;
  place-content: center;

  ${({ $isMobile }) => $isMobile && css`
    padding-top: 32px;
  `}
`

const GuideStepHeader = ({ number, title, CTA, imageSrc }) => {
  const { isMobile } = useDevice()

  return (
    <Container $isMobile={isMobile}>
      <Wrapper $isMobile={isMobile}>
        <TitleContainer>
          {isMobile ? null : (
            <BackButton
              backLink="/conseils-et-astuces"
              white
              style={{ marginBottom: 36 }}
            />
          )}
          <Step>Etape {number}</Step>
          <Title>{title}</Title>
          { CTA ?
            (<div style={{ width: 'fit-content', marginTop: 8 }}>
              {CTA}
            </div>) : null }
        </TitleContainer>
        <ImageContainer $isMobile={isMobile}>
          <Image src={imageSrc} />
        </ImageContainer>
      </Wrapper>
    </Container>
  )
}

GuideStepHeader.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  CTA: PropTypes.node,
  imageSrc: PropTypes.string.isRequired,
}

export default GuideStepHeader
