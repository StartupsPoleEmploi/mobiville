import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { COLOR_PRIMARY } from '../constants/colors'
import { useDevice } from '../common/contexts'

const AppCarouselDot = styled.li`
  display: inline-block;
  padding: 8px;
  cursor: pointer;
  height: 10px;
  width: 10px;

  margin-bottom: ${({ isMobile }) => (isMobile ? '70px' : '')};

  ::after {
    content: '';
    display: block;
    height: 10px;
    width: 10px;
    margin: -5px;
    border-radius: 50%;
    background: ${({ isSelected }) => (isSelected ? COLOR_PRIMARY : '#D9D9D9')};
  }
`

const CustomCarousel = styled(Carousel)`
  width: 100%;
`

const renderCarouselIndicator = (clickHandler, isSelected, index, label, isMobile) => {
  return (
    <AppCarouselDot
      isMobile={isMobile}
      isSelected={isSelected}
      onClick={clickHandler}
      value={index}
      key={index}
      role="button"
      tabIndex={0}
    ></AppCarouselDot>
  )
}

const AppCarousel = ({
  children,
  showArrows = false,
  showStatus = false,
  showThumbs = false,
  interval = 6000,
  swipeScrollTolerance = 40,
  ...props
}) => {
  const { isMobile } = useDevice()

  return (
    <CustomCarousel
      showArrows={showArrows}
      showStatus={showStatus}
      showThumbs={showThumbs}
      renderIndicator={(clickHandler, isSelected, index, label) => renderCarouselIndicator(clickHandler, isSelected, index, label, isMobile)}
      selectedItem={Math.floor(Math.random() * (children.length))}
      autoPlay
      infiniteLoop
      interval={interval}

      swipeScrollTolerance={swipeScrollTolerance}
      preventMovementUntilSwipeScrollTolerance={true}
      stopOnHover={true}
    >
      {children}
    </CustomCarousel>
  )
}

AppCarousel.props = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  showArrows: PropTypes.bool,
  showStatus: PropTypes.bool,
  showThumbs: PropTypes.bool,
}

export default AppCarousel
