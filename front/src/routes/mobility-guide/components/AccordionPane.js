import styled, { css } from 'styled-components'

import { ReactComponent as RightChevronIcon } from '../../../assets/images/icons/right_chevron.svg'
import { COLOR_PRIMARY, COLOR_WHITE } from '../../../constants/colors'

const Container = styled.div`
  overflow: hidden;
`

const TitleContainer = styled.div`
  position: relative;
  z-index: 100;

  padding: 12px 24px 12px 16px;
  border-radius: 4px;
  background: ${COLOR_WHITE};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
  color: ${COLOR_PRIMARY};
  font-size: 18px;
  font-weight: 700;
`

const Title = styled.p`
  margin: 0;
`

const ChevronIcon = styled(RightChevronIcon)`
  transform: ${({ $isOpened }) =>
    $isOpened ? 'rotate(-90deg)' : 'rotate(90deg)'};
`

const Content = styled.div`
  transition: max-height 0.2s ease-in-out;
  height: auto;
  max-height: 200vh;

  ${({ $isOpened }) =>
    !$isOpened &&
    css`
      max-height: 0px;
    `}
`

const AccordionPane = ({ title, children, isOpened = false, onClick }) => (
  <Container>
    <TitleContainer onClick={onClick}>
      <Title>{title}</Title>
      <ChevronIcon $isOpened={isOpened} />
    </TitleContainer>

    <Content
      $isOpened={isOpened}
      $nbChildren={children.length ?? 1}
    >
      {children}
    </Content>
  </Container>
)

export default AccordionPane
