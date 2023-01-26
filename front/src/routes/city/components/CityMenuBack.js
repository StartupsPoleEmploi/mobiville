import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { COLOR_WHITE } from '../../../constants/colors'
import { BackButton, MenuNavigation } from '../../../components'

const MenuBackContainer = styled.div`
  background: ${({ background }) => background};
  width: 100%;

  display: flex;
  flex-direction: column;
`

const CityMenuBack = ({
  codeRome,
  backLink,
  isMobile,
  background = COLOR_WHITE,
  showAdvicesButton = false,
}) => (
  <MenuBackContainer background={background}>
    <BackButton
      libelle={!isMobile && !!codeRome ? 'Retour aux résultats' : 'Retour'}
      backLink={backLink}
      showAdvicesButton={showAdvicesButton}
    />
    <MenuNavigation isMobile={isMobile} />
  </MenuBackContainer>
)

CityMenuBack.props = {
  backLink: PropTypes.string,
  isMobile: PropTypes.bool,
  background: PropTypes.string,
  showAdvicesButton: PropTypes.bool,
}

export default CityMenuBack
