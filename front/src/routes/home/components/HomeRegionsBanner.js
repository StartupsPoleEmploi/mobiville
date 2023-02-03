
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ReactComponent as RightChevronIcon } from '../../../assets/images/icons/right_chevron.svg'

import { COLOR_PRIMARY, COLOR_WHITE } from '../../../constants/colors'
import { useRegions } from '../../../common/contexts/regionsContext'
import { alphabetOrder, splitSort } from '../../../utils/utils'

const Container = styled.div`
  color: ${COLOR_PRIMARY};'
`

const Title = styled.h2`
  margin: 16px 16px 0 16px;

  text-align: center;
  font-size: 24px;
  font-weight: 900;
`

const RegionsContainer = styled.div`
  max-width: 1072px; // 1040px + 2*16px
  width: 100%;
  margin: 25px auto;
  padding: 0 16px;
  overflow: scroll;
  display: grid;
  grid-template-columns: repeat(3, minmax(max-content, 1fr));
  grid-auto-rows: 80px;
  gap: 8px 24px;
`

const RegionLabel = styled(Link)`
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
    background: ${COLOR_PRIMARY};
    color: ${COLOR_WHITE};
  }
`

const HomeRegionsBanner = () => {
  const { regionsDROMIncluded, formatUrl } = useRegions()

  return (
    <Container>
      <Title>Découvrez les opportunités métiers par région</Title>

      <RegionsContainer>
        {splitSort(regionsDROMIncluded.sort(alphabetOrder('name')), 3).map((region) => (
          <RegionLabel key={region.name} to={formatUrl(region)}>
            <span>{region.name}</span>
            <RightChevronIcon />
          </RegionLabel>
        ))}
      </RegionsContainer>
    </Container>
  )
}

export default HomeRegionsBanner
