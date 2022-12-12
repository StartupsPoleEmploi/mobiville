import { useCallback, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { useWindowSize } from '../common/hooks/window-size'
import { isMobileView } from '../constants/mobile'
import { CITY_TYPE } from '../constants/search'
import { isDirty } from '../utils/utils'

import { CitySelect, JobSelect, ActionButton, ResetButton } from './'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? `column` : `row`)};
  justify-items: ${({ $isMobile }) => ($isMobile ? `start` : `center`)};
  gap: 8px;
  display: ${({ $hidden }) => ($hidden ? 'none' : 'visible')};
`

const CityForm = ({
  hidden = false,
  isWelcomeCitySearch = false,
  onClick = () => {},
}) => {
  const isMobile = isMobileView(useWindowSize())
  const { search } = useLocation()

  const [jobSelected, setJobSelected] = useState('')
  const [citySelected, setCitySelected] = useState('')

  const computeSearchPath = useCallback(() => {
    if (!!jobSelected && !!citySelected && citySelected.type === CITY_TYPE) {
      // on va directement sur la page de la ville choisi
      return `/ville/${citySelected.id}-${citySelected.cityName}?codeRome=${jobSelected.key}`
    }

    const urlSearchParams = new URLSearchParams(search)

    urlSearchParams.delete('codeRome')
    urlSearchParams.delete('codeRegion')

    if (!!jobSelected?.key) urlSearchParams.set('codeRome', jobSelected.key)
    if (!!citySelected?.id) urlSearchParams.set('codeRegion', citySelected.id)

    return `/villes?${urlSearchParams.toString()}`
  }, [jobSelected, citySelected])

  const onReset = () => {
    setCitySelected(null)
    setJobSelected(null)
  }

  const showReset = useMemo(
    () =>
      isDirty({
        city: citySelected,
        job: jobSelected,
      }),
    [citySelected, jobSelected]
  )

  const handleClick = () => {
    if (citySelected) {
      window.smartTag({
        name: 'rechercher_ville',
        type: 'action',
        chapters: [`${isWelcomeCitySearch ? 'accueil' : 'rechercher'}`],
      })
    }
    onClick()
  }

  const isJobSelected = !!jobSelected && !!`${jobSelected}`.trim()
  const isCitySelected = !!citySelected && !!`${citySelected}`.trim()

  return (
    <Container $hidden={hidden} $isMobile={isMobile}>
      <JobSelect
        value={jobSelected}
        onSelect={(job) => setJobSelected(job)}
      ></JobSelect>

      <CitySelect
        value={citySelected}
        onSelect={(city) => setCitySelected(city)}
        codeRome={!!jobSelected ? jobSelected.key : null}
      />

      <ActionButton
        isWelcomeCitySearch={isWelcomeCitySearch}
        buttonProps={{
          onClick: handleClick,
        }}
        style={{
          height: 73,
          boxShadow: isMobile ? 'none' : '0px 5px 10px rgba(0, 0, 0, 0.3)',
          width: isMobile ? '100%' : 184,
        }}
        path={computeSearchPath()}
        isBlue
        disabled={!isJobSelected || !isCitySelected}
      />

      {isMobile && (
        <ResetButton
          show={showReset}
          style={{ margin: 'auto' }}
          onClick={onReset}
        />
      )}
    </Container>
  )
}

CityForm.propTypes = {
  hidden: PropTypes.bool,
  isWelcomeCitySearch: PropTypes.bool,
  onClick: PropTypes.func,
}

export default CityForm
