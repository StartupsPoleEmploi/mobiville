import styled, { css } from 'styled-components'
import { useWindowSize } from '../common/hooks/window-size'
import { COLOR_PRIMARY } from '../constants/colors'
import { isMobileView } from '../constants/mobile'

const Container = styled.div`
  margin: ${({ $isMobile }) => ($isMobile ? '20px auto 0 auto' : 'auto')};
  width: 100%;
  max-width: 1040px;

  color: ${COLOR_PRIMARY};

  ${({ $centerOnMobile }) => $centerOnMobile && css`
    text-align: center;
  `}
`

const Wrapper = styled.div`
  margin: ${({ $isMobile, $margin }) => ($isMobile ? '0 21px' : ($margin ? '48px 0 0 0' : '0'))};
`

const Title = styled.h2`
  margin: 8px 0px;
  font-weight: 900;
  font-size: 24px;
  line-height: 28px;
`
const SubTitle = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 24px;
`

const SectionHeader = ({ title, subTitle, margin = true, centerOnMobile = false }) => {
  const isMobile = isMobileView(useWindowSize())

  return (
    <Container $isMobile={isMobile} $centerOnMobile={centerOnMobile}>
      <Wrapper $isMobile={isMobile} $margin={margin}>
        <Title>{title}</Title>
        <SubTitle>{subTitle}</SubTitle>
      </Wrapper>
    </Container>
  )
}

export default SectionHeader
