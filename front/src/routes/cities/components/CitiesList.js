import styled from 'styled-components'
import PropTypes from 'prop-types'
import loadable from '@loadable/component'
import { useEffect, useState } from 'react'

import { CircularProgress } from '@mui/material'

import {
  COLOR_BUTTON_HOVER,
  COLOR_PRIMARY,
  COLOR_TEXT_SECONDARY,
  COLOR_WHITE,
} from '../../../constants/colors'
import { formatCityUrl } from '../../../utils/utils'
import { Image } from '../../../components'
import { useDevice, useCities, useProfessions } from '../../../common/contexts'

const CityItem = loadable(() => import('./CityItem'))
const Pagination = loadable(() => import('@mui/material/Pagination'))

const Container = styled.div`
  grid-area: citiesList;

  flex-grow: 1;
  max-width: ${({ isMobile }) => (isMobile ? '100%' : '620px')};
  padding: ${({ isMobile }) => (isMobile ? '16px' : '0 8px')};
`

const NotFoundContainer = styled.div`
  padding-top: 5rem;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  color: ${COLOR_TEXT_SECONDARY};
  text-align: center;
  font-size: 1.5rem;
  line-height: 1.5;
`

const CircularProgressContainer = styled.div`
  display: grid;
  place-items: center;
  min-height: 200px;
`

const PaginationContainer = styled.div`
  margin-top: 40px;

  nav ul {
    padding: 0px;
    max-width: 370px;
    margin: auto;
    justify-content: center;
  }

  nav ul li button {
    min-width: 24px;
    height: 32px;
    padding: 0px;
  }

  nav ul li button.Mui-selected {
    background-color: ${COLOR_PRIMARY};
    border-radius: 32px;
    color: ${COLOR_WHITE};
  }

  nav ul li:first-child button,
  nav ul li:last-child button {
    height: 32px;
    width: 32px;
    min-width: 32px;
    padding: 0px;

    background-color: #fff;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12),
      0px 1px 3px rgba(0, 0, 0, 0.2);
  }

  nav ul li:first-child button:hover,
  nav ul li:last-child button:hover {
    background-color: ${COLOR_BUTTON_HOVER};
    color: ${COLOR_WHITE};
  }
`

const CustomImage = styled(Image)`
  margin-bottom: 2rem;
`

const CitiesList = ({
  cities,
  codeRome,
  selectedCityId = null,
  setHoveredCityId = null,
  page = 1,
  onPageChange = () => {},
}) => {
  const { isMobile } = useDevice()
  const { totalCities, sortCriterions, isLoading } = useCities()
  const { isLoading: isLoadingProfessions, professionsCountList } =
    useProfessions()

  const [formattedCities, setFormattedCities] = useState([])

  const itemsPerPage = 10
  const [noOfPages, setNoOfPages] = useState(0)

  useEffect(() => {
    setNoOfPages(Math.ceil(totalCities / itemsPerPage))
  }, [totalCities])

  useEffect(() => {
    setFormattedCities(cities)
  }, [cities])

  useEffect(() => {
    if (selectedCityId) {
      const cityItem = document.getElementById(`city-item-${selectedCityId}`)
      window.scrollTo({
        top: cityItem?.offsetTop - 400,
        behavior: 'smooth',
      })
    }
  }, [selectedCityId])

  useEffect(() => {
    if (!professionsCountList) return
    let newFormattedCities = formattedCities
    professionsCountList.forEach((professionsCount) => {
      newFormattedCities = newFormattedCities.map((city) => {
        if (city.insee_com === professionsCount.insee[0].toString()) {
          return {
            ...city,
            totalOffres: professionsCount.total,
          }
        }
        return city
      })
    })

    setFormattedCities(newFormattedCities)
  }, [professionsCountList])

  return (
    <Container isMobile={isMobile} data-automation-id="cities-list">
      {formattedCities.map((city) => (
        <CityItem
          city={city}
          isMobile={isMobile}
          selected={selectedCityId === city.id}
          sortCriterions={sortCriterions}
          key={city.id}
          to={formatCityUrl(city, codeRome)}
          onClickTag={() =>
            window.smartTagPiano({
              name: 'acces_detail_ville',
              type: 'navigation',
              chapters: ['cities'],
            })
          }
          onMouseOver={() => setHoveredCityId(city.id)}
          onMouseLeave={() => setHoveredCityId(null)}
          isLoadingProfessions={isLoadingProfessions}
        />
      ))}
      {!isLoading && cities.length === 0 && (
        <NotFoundContainer>
          <CustomImage src="no-results" alt="" />
          Aucune ville correspondante
          <br />
          Modifiez vos critères
        </NotFoundContainer>
      )}
      {isLoading && (
        <CircularProgressContainer>
          <CircularProgress style={{ color: COLOR_PRIMARY }} size={40} />
        </CircularProgressContainer>
      )}
      <PaginationContainer>
        <Pagination
          count={noOfPages}
          defaultPage={0}
          page={page}
          siblingCount={2}
          boundaryCount={0}
          onChange={(_, value) => {
            onPageChange(value)
            window.smartTagPiano({
              name: 'pagination',
              type: 'navigation',
              chapters: ['cities'],
            })
          }}
        />
      </PaginationContainer>
    </Container>
  )
}

CitiesList.propTypes = {
  codeRome: PropTypes.string,
  cities: PropTypes.array.isRequired,
  selectedCityId: PropTypes.number,
  setHoveredCityId: PropTypes.func,
  onPageChange: PropTypes.func,
}

export default CitiesList
