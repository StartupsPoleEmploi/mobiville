import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import styled, { css } from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import { useWindowSize } from '../../../common/hooks/window-size'
import { isMobileView } from '../../../constants/mobile'
import { COLOR_PRIMARY, COLOR_TEXT_PRIMARY } from '../../../constants/colors'
import { MainLayout, Select } from '../../../components'
import GuideStepHeader from '../components/GuideStepHeader'
import BackButton from '../../../components/buttons/BackButton'
import { capitalize } from '../../../utils/utils'

const Container = styled.div`
  display: grid;
  grid-template: ${({ $isMobile }) => $isMobile ?
      `'nav'
    'header'
    'content'` :
    `'header header header'
    '. nav content'`
  };
  grid-template-columns: ${({ $isMobile }) => $isMobile ? '1fr' : 'calc((100vw - 1040px) / 2) 320px auto'};
  grid-auto-rows: auto;
  grid-row-gap: ${({ $isMobile }) => $isMobile ? '18px' : '36px'};
`

const GuideStepNav = styled.div`
  grid-area: nav;
`

const GuideStepNavItem = styled(Link)`
  display: block;
  margin: 12px 0;

  font-size: 16px;
  color: ${COLOR_TEXT_PRIMARY};

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      font-weight: 700;
      color: ${COLOR_PRIMARY};
    `}
`

const Content = styled.div`
  grid-area: content;
  max-width: ${({ $isMobile, $fullWidth }) => !$fullWidth ? ($isMobile ? '900px' : '720px') : 'auto'};
  padding: ${({ $isMobile }) => $isMobile ? '0 16px' : '0 32px 0 0'};
`

const SelectWrapper = styled.div`
  margin: 0 16px;
`

const GuideStepLayout = ({
  stepNumber,
  stepTitle,
  stepCTA,
  headerImageSrc,
  fullWidth = false,
  children,
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const isMobile = isMobileView(useWindowSize())

  const [ value, setValue ] = useState(null)
  const [ stepSelected, setStepSelected ] = useState(null)

  useEffect(() => {
    setStepSelected(location.pathname.match(/etape-./g)[0])
  }, [])

  useEffect(() => {
    if (!stepSelected) return

    const selectOption = SELECT_OPTIONS.find(e => e.key === stepSelected)
    setValue(selectOption.option)
  }, [ stepSelected ])

  const SELECT_OPTIONS = [
    {
      key: 'etape-1',
      option: "J'identifie une ville et un emploi",
    },
    {
      key: 'etape-2',
      option: "Je postule",
    },
    {
      key: 'etape-3',
      option: "Je recherche un logement",
    },
    {
      key: 'etape-4',
      option: "Je prépare mon déménagement",
    },
    {
      key: 'etape-5',
      option: "Après mon déménagement",
    }
  ]

  const handleChange = (val) => {
    const selectOption = SELECT_OPTIONS.find(e => e.option === val)
    navigate(`/conseils-et-astuces/${selectOption.key}`)
  }

  return (
    <MainLayout topMobileMenu>
      <Container $isMobile={isMobile}>
        <GuideStepHeader
          number={stepNumber}
          title={stepTitle}
          CTA={stepCTA}
          imageSrc={headerImageSrc}
        />

        <GuideStepNav>

          {isMobile ? (<>
            <BackButton backLink="/conseils-et-astuces" />
            <SelectWrapper>
              <Select
                light
                value={value}
                label={capitalize(stepSelected.replace('-', ' '))}
                options={SELECT_OPTIONS}
                onChange={handleChange} />
            </SelectWrapper>
          </>) : (<>
            <GuideStepNavItem
              to="/conseils-et-astuces/etape-1"
              $isSelected={stepSelected === 'etape-1'}
            >
              J'identifie une ville et un emploi
            </GuideStepNavItem>
            <GuideStepNavItem
              to="/conseils-et-astuces/etape-2"
              $isSelected={stepSelected === 'etape-2'}
            >
              Je postule
            </GuideStepNavItem>
            <GuideStepNavItem
              to="/conseils-et-astuces/etape-3"
              $isSelected={stepSelected === 'etape-3'}
            >
              Je recherche un logement
            </GuideStepNavItem>
            <GuideStepNavItem
              to="/conseils-et-astuces/etape-4"
              $isSelected={stepSelected === 'etape-4'}
            >
              Je prépare mon déménagement
            </GuideStepNavItem>
            <GuideStepNavItem
              to="/conseils-et-astuces/etape-5"
              $isSelected={stepSelected === 'etape-5'}
            >
              Après mon déménagement
            </GuideStepNavItem>
          </>)}
          
        </GuideStepNav>

        <Content $isMobile={isMobile} $fullWidth={fullWidth}>{children}</Content>
      </Container>
    </MainLayout>
  )
}

GuideStepLayout.propTypes = {
  stepNumber: PropTypes.number.isRequired,
  stepTitle: PropTypes.string.isRequired,
  stepCTA: PropTypes.node,
  headerImageSrc: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default GuideStepLayout
