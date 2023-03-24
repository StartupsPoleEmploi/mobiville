import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import { useDevice } from '../common/contexts'

const Container = styled.div`
  max-width: 1040px;
  margin: ${({ $isMobile }) => ($isMobile ? '16px 0' : '16px auto')};

  display: flex;
  flex-direction: column;
  overflow-x: scroll;

  /* disable horizontal scroll bar */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`

const ScrollingWrapper = styled.div`
  min-width: 100%;
  margin: auto;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  gap: 16px;

  ${({ $isMobile }) =>
    $isMobile &&
    css`
      padding: 0 16px;
    `}
`

const HorizontalScrollableSection = ({ children }) => {
  const { isMobile } = useDevice()

  return (
    <Container $isMobile={isMobile}>
      <ScrollingWrapper $isMobile={isMobile}>
        {children}
      </ScrollingWrapper>
    </Container>
  )
}

HorizontalScrollableSection.props = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default HorizontalScrollableSection
