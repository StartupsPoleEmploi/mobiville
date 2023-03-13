import styled, { css } from 'styled-components'
import { useWindowSize } from '../common/hooks/window-size'
import { COLOR_PRIMARY } from '../constants/colors'
import { isMobileView } from '../constants/mobile'

const Container = styled.div`
  margin: ${({ $isMobile }) => ($isMobile ? '20px auto 0 auto' : 'auto')};
  width: 100%;
  max-width: 1040px;

  color: ${COLOR_PRIMARY};

  ${({ $centerOnMobile }) =>
    $centerOnMobile &&
    css`
      text-align: center;
    `}
`

const Wrapper = styled.div`
  margin: ${({ $isMobile, $margin }) =>
    $isMobile ? '0 25px' : $margin ? '48px 0 0 0' : '0'};
`

const Title = styled.h2`
  margin: 8px 10px;
  font-weight: 900;
  font-size: 24px;
  line-height: 28px;
`
const SubTitle = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 24px;
`

const SectionHeader = ({
  title,
  subTitle,
  margin = true,
  centerOnMobile = false,
}) => {
  const isMobile = isMobileView(useWindowSize())
  const _title = title.split(' ')
  return (
    <Container $isMobile={isMobile} $centerOnMobile={centerOnMobile}>
      <Wrapper $isMobile={isMobile} $margin={margin}>
        <Title>
          {_title.slice(0, _title.length - 1).join(' ')}{' '}
          <span style={{ whiteSpace: 'nowrap' }}>
            {_title[_title.length - 1]}
          </span>
        </Title>
        <SubTitle>{subTitle}</SubTitle>
      </Wrapper>
    </Container>
  )
}

export default SectionHeader
