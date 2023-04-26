import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import { ReactComponent as RightChevronIcon } from '../../../assets/images/icons/right_chevron.svg'

import { COLOR_PRIMARY, COLOR_WHITE } from '../../../constants/colors'
import LinkCTA from './LinkCTA'
import { useDevice } from '../../../common/contexts'

const Container = styled.div`
  margin: 16px 0;
  padding: 16px;
  border-radius: 4px;

  ${({ $light }) =>
    $light
      ? css`
          box-shadow: inset 0px 0px 0px 1px ${COLOR_PRIMARY};
          -webkit-box-shadow: inset 0px 0px 0px 1px ${COLOR_PRIMARY};
          -moz-box-shadow: inset 0px 0px 0px 1px ${COLOR_PRIMARY};
        `
      : css`
          background: ${COLOR_WHITE};
        `}
`

const IconContainer = styled.span`
  & svg {
    vertical-align: sub;
    margin-right: 8px;
  }
`

const Title = styled.p`
  margin: ${({ $light, $isExpanded }) =>
    !$isExpanded ? '0' : $light ? '0 0 8px 0' : '0 0 16px 0'};

  color: ${COLOR_PRIMARY};
  font-size: 18px;
  font-weight: 700;
`

const Content = styled.div`
  padding: ${({ $isMobile }) => ($isMobile ? '8px 0' : '0')};

  display: flex;
  flex-direction: ${({ $isMobile, $mobileReverse }) =>
    $isMobile ? ($mobileReverse ? 'column-reverse' : 'column') : 'row'};
  justify-content: space-between;
  align-items: ${({ $isMobile }) => ($isMobile ? 'center' : 'start')};
  gap: ${({ $isMobile }) => ($isMobile ? '8px' : '32px')};

  transition: max-height 0.2s ease-in-out, padding 0.2s ease-in-out;
  max-height: 200vh;
  overflow: hidden;

  & p {
    margin: 0 0 8px 0;
  }

  ${({ $light }) =>
    $light &&
    css`
      color: ${COLOR_PRIMARY};
    `};

  ${({ $isExpanded }) =>
    !$isExpanded &&
    css`
      max-height: 0px;
      padding: 0;
    `}
`

const ChevronIcon = styled(RightChevronIcon)`
  float: right;
  margin-top: 8px;
  
  transform: ${({ $isExpanded }) =>
    $isExpanded ? 'rotate(-90deg)' : 'rotate(90deg)'};
`

const GuideStepCard = ({
  title,
  icon,
  CTAtitle,
  CTAhref,
  light = false,
  mobileReverse = false,
  mobileFoldable = false,
  isExpanded = false,
  onClick,
  children,
}) => {
  const { isMobile } = useDevice()

  return (
    <Container $light={light}>
      <Title
        onClick={onClick}
        $light={light}
        $isExpanded={!mobileFoldable || !isMobile || isExpanded}
      >
        <IconContainer>{icon}</IconContainer>
        {title}
        {mobileFoldable && isMobile && <ChevronIcon $isExpanded={isExpanded} />}
      </Title>
      <Content
        $light={light}
        $mobileReverse={mobileReverse}
        $isMobile={isMobile}
        $isExpanded={!mobileFoldable || !isMobile || isExpanded}
      >
        {children}
      </Content>
      {CTAtitle ? (
        <LinkCTA href={CTAhref} $light={light}>
          {CTAtitle}
        </LinkCTA>
      ) : null}
    </Container>
  )
}

GuideStepCard.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.node,
  CTAtitle: PropTypes.string,
  CTAhref: PropTypes.string,
  light: PropTypes.bool,
  mobileReverse: PropTypes.bool,
  mobileFoldable: PropTypes.bool,
  isExpanded: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default GuideStepCard
