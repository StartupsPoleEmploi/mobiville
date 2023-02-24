import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import { useHelps } from '../common/contexts/helpsContext'
import { ActionButton, Tag } from '.'
import { COLOR_PRIMARY } from '../constants/colors'
import { formatHelpUrl } from '../utils/utils'
import { isMobileView } from '../constants/mobile'
import { useWindowSize } from '../common/hooks/window-size'

const Container = styled.div`
  max-width: 1040px;
  width: 100%;
  margin: 0 auto;
  color: ${COLOR_PRIMARY};
`

const Card = styled(Link)`
  min-width: 315px;
  padding: 20px;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: white;

  ${({ $isMobile }) =>
    !$isMobile &&
    css`
      &:hover {
        box-shadow: inset 0px 0px 0px 1px ${COLOR_PRIMARY};
        -webkit-box-shadow: inset 0px 0px 0px 1px ${COLOR_PRIMARY};
        -moz-box-shadow: inset 0px 0px 0px 1px ${COLOR_PRIMARY};
      }
    `}
`

const TopHelpsContainer = styled.div`
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
const TopHelpsScrollingWrapper = styled.div`
  min-width: 100%;
  margin: auto;

  display: grid;
  grid-template-columns: ${({ $isMobile }) =>
    $isMobile ? '1fr' : 'repeat(3, 1fr)'};
  grid-auto-rows: 1fr;
  gap: 16px;

  ${({ $isMobile }) =>
    $isMobile &&
    css`
      padding: 0 16px;
    `}
`
const Content = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

const Left = styled.div``

const CardTitle = styled.p`
  margin: 6px 0;

  font-size: 18px;
  font-weight: 700;
`

const Logo = styled.img`
  max-width: 76px;
  max-height: 100px;
`

const Discover = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 6px;
`

const DiscoverText = styled.p`
  margin: 0;
  font-weight: 700;
`

const HelpsStandOut = ({ buttonLibelle = 'Voir toutes les aides' }) => {
  const isMobile = isMobileView(useWindowSize())
  const { previews, onLoadPreviews } = useHelps()

  useEffect(() => {
    onLoadPreviews()
  }, [])

  const HelpCard = ({ help, isMobile }) => (
    <Card to={formatHelpUrl(help)} $isMobile={isMobile}>
      <Content>
        <Left>
          <Tag green bold>
            {help.icon}
            {help.type}
          </Tag>
          <CardTitle>{help.title}</CardTitle>
        </Left>
        <Logo src={`/help-logos/${help.logo}`} />
      </Content>
      <Discover>
        <DiscoverText>Découvrir l'aide </DiscoverText>
        <ArrowForwardIcon style={{ verticalAlign: 'text-bottom', width: 16 }} />
      </Discover>
    </Card>
  )

  return (
    <Container>
      <TopHelpsContainer $isMobile={isMobile}>
        <TopHelpsScrollingWrapper $isMobile={isMobile}>
          {previews
            .sort((a, b) =>
              !b?.visibility_boost
                ? -1
                : b?.visibility_boost - a?.visibility_boost
            )
            .slice(0, 3)
            .map((help) => (
              <HelpCard key={help.id} help={help} isMobile={isMobile} />
            ))}
        </TopHelpsScrollingWrapper>
      </TopHelpsContainer>

      <ActionButton
        path="/aides"
        libelle={buttonLibelle}
        style={{ width: 'fit-content', margin: '0 auto 32px auto' }}
        isWhite
        isBlue={false}
      />
    </Container>
  )
}

HelpsStandOut.propTypes = {
  buttonLibelle: PropTypes.string,
}

export default HelpsStandOut
