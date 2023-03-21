import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { COLOR_PRIMARY, COLOR_TEXT_PRIMARY, COLOR_WHITE } from '../../constants/colors'
import { isMobileView } from '../../constants/mobile'
import { useWindowSize } from '../../common/hooks/window-size'
import ActionButton from './ActionButton'

const BackContainer = styled.div`
  width: 100%;
  max-width: 1040px;
  max-height: 60px;
  padding: 16px 0 0 0;
  margin: auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  order: 2;
`

const HeaderArrowLink = styled(Link)`
  padding: ${({ $isMobile }) => ($isMobile ? '14px' : '6px 0 2px 0')};
  margin-left: -4px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  &, &:hover {
    color: ${COLOR_TEXT_PRIMARY};
  }

  ${({ $isWhite }) => $isWhite && css`
    height: 32px;
    padding: 8px;

    background-color: ${ COLOR_WHITE };
    border-radius: 100px;
  `}
`

const BackText = styled.p`
  font-weight: ${({ $isMobile }) => ($isMobile ? '400' : '500')};
  font-size: ${({ $isMobile }) => ($isMobile ? '16px' : '12px')};
  line-height: ${({ $isMobile }) => ($isMobile ? '24px' : '14px')};
  color: ${COLOR_PRIMARY};
  padding-top: 2px;
`

const ActionButtonContainer = styled.div`
  align-self: start;
  margin-top: 16px;
`

const BackButton = ({
  libelle = 'Retour',
  backLink = '/',
  showAdvicesButton = false,
  style = {},
  white = false,
}) => {
  const isMobile = isMobileView(useWindowSize())

  return (
    <BackContainer style={{ ...style }}>
      <HeaderArrowLink to={backLink} title={libelle} $isMobile={isMobile} $isWhite={white}>
        <ArrowBackIcon color="primary" />
        <BackText $isMobile={isMobile}>{libelle}</BackText>
      </HeaderArrowLink>
      
      {showAdvicesButton
        ? <ActionButtonContainer>
        <ActionButton
          libelle={'Démarrez votre projet ? Consultez nos conseils'}
          path="/conseils-et-astuces"
          isWhite
          isBlue={false}
        />
      </ActionButtonContainer> : null}
    </BackContainer>
  )
}

BackButton.props = {
  libelle: PropTypes.string,
  backLink: PropTypes.string,
  showAdvicesButton: PropTypes.bool,
  style: PropTypes.object,
  white: PropTypes.boolean
}

export default BackButton
