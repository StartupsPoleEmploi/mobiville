import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

import { ReactComponent as RightChevronIcon } from '../../../assets/images/icons/right_chevron.svg'
import { useWindowSize } from '../../../common/hooks/window-size'
import { SectionTitle } from '../../../components'

import { COLOR_PRIMARY, COLOR_WHITE } from '../../../constants/colors'
import { isMobileView } from '../../../constants/mobile'
import { formatCityUrl, wordsCapitalize } from '../../../utils/utils'

const Container = styled.div`
  color: ${COLOR_PRIMARY};
`

const ItemsContainer = styled.div`
  max-width: 1072px; // 1040px + 2*16px
  width: 100%;
  margin: 25px auto;
  padding: 1px 16px;
  overflow-x: ${({ $isMobile }) => ($isMobile ? 'scroll' : 'auto')};

  display: grid;
  grid-auto-rows: 80px;
  gap: 8px 24px;
  ${({ $isMobile }) => ($isMobile ? css`
    grid-template-columns: repeat(2, minmax(80vw, 1fr));
  ` : css`
    grid-template-columns: repeat(2, 1fr);
  `)}
`

const Item = styled(Link)`
  width: 100%;
  padding: 30px;
  border-radius: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: ${COLOR_WHITE};
  font-size: 18px;
  font-weight: 700;
  text-align: start;

  &&:hover {
    box-shadow: 0px 0px 0px 1px ${COLOR_PRIMARY};
    -webkit-box-shadow: 0px 0px 0px 1px ${COLOR_PRIMARY};
    -moz-box-shadow: 0px 0px 0px 1px ${COLOR_PRIMARY};
  }

  & .MuiChip-root {
    margin-right: 5px;
  }
`

const TopCities = ({ departement }) => {
  const isMobile = isMobileView(useWindowSize())

  return (
    <Container>
      <SectionTitle>
        Découvrez les villes qui recrutent le plus dans le département
      </SectionTitle>

      <ItemsContainer $isMobile={isMobile}>
        {departement?.topCities?.map((city) => (
          <Item key={city.nom_comm} to={formatCityUrl(city)}>
            <span>{wordsCapitalize(city.nom_comm)}</span>
            <span style={{ whiteSpace: 'nowrap' }}>
              <RightChevronIcon style={{ margin: 16 }} />
            </span>
          </Item>
        ))}
      </ItemsContainer>
    </Container>
  )
}

export default TopCities
