import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ReactComponent as RightChevronIcon } from '../../../assets/images/icons/right_chevron.svg'

import { COLOR_PRIMARY, COLOR_WHITE } from '../../../constants/colors'
import { formatCityUrl, wordsCapitalize } from '../../../utils/utils'

const Container = styled.div`
  color: ${COLOR_PRIMARY};'
`

const Title = styled.h2`
  margin: 16px 16px 0 16px;

  text-align: center;
  font-size: 24px;
  font-weight: 900;
`

const Item = styled.div`
  max-width: 1072px; // 1040px + 2*16px
  width: 100%;
  margin: 25px auto;
  padding: 0 16px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 80px;
  gap: 8px 24px;
`

const Label = styled(Link)`
  width: 100%;
  height: 80px;
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
  return (
    <Container>
      <Title>
        Découvrez les villes qui recrutent le plus dans le département
      </Title>

      <Item>
        {departement?.topCities?.map((city) => (
          <Label key={city.nom_comm} to={formatCityUrl(city)}>
            <span>{wordsCapitalize(city.nom_comm)}</span>
            <span style={{ whiteSpace: 'nowrap' }}>
              <RightChevronIcon style={{ margin: 16 }} />
            </span>
          </Label>
        ))}
      </Item>
    </Container>
  )
}

export default TopCities
