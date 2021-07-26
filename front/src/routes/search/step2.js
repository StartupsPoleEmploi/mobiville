import {
  TextField
} from '@material-ui/core'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { useCities } from '../../common/contexts/citiesContext'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Title = styled.h1`
  && {
    font-size: 18px;
    font-weight: bold;
    margin: 0 0 32px 0;
  }
`

const JobTextField = styled(TextField)`
  && {
    input {
      padding-left: 8px !important;
    }
  }
`

// impossible separator to find in a job name, used to detect a user has selected on autocomplete
const SEPARATOR = '||=|=||'

// Small tweak to allow matching on both "aide-soignant" and "aide soignant"
const filterOptions = createFilterOptions({
  stringify: (option) => option.label.concat(option.label.replace(/-/g, ' '))
})

const Step2Component = ({ onNext }) => {
  const size = useWindowSize()
  const {
    isLoading,
    jobsMatchingCriterions,
    onSearchJobLabels
  } = useCities()

  const [searchedLabel, setSearchedLabel] = useState('')
  const [isAutocompleteFocused, setIsAutocompleteFocused] = useState(false)

  useEffect(() => {
    onSearchJobLabels(searchedLabel)
  }, [searchedLabel])

  const isMobile = isMobileView(size)

  return (
    <Wrapper>
      <Title isMobile={isMobile}>Quel métier ou compétences recherchez-vous ?</Title>
      <p>
        Pour le moment, le service est disponible uniquement pour
        {' '}
        <Link
          to="/ogr-list"
          title="Accéder à la liste des métiers Mobiville"
        >
          certains métiers.
        </Link>
      </p>

      <div>
        <Autocomplete
          onInputChange={(event, newValue) => {
            if (!event) return

            if (newValue.includes(SEPARATOR)) {
              const [key] = newValue.split(SEPARATOR)
              const job = jobsMatchingCriterions.find((c) => c.key === key)

              if (!job) return

              onNext({ rome: key })
            }

            setSearchedLabel(newValue)
          }}
          inputValue={searchedLabel}
          options={jobsMatchingCriterions}
          getOptionLabel={({ key, label }) => `${key}${SEPARATOR}${label}`}
          renderOption={({ label }) => label}
          renderInput={
            (inputParams) => (
              <JobTextField
                {...inputParams}
                label="Rechercher un type de métier"
                variant="filled"
                openOnFocus
              />
            )
          }
          noOptionsText="Pas de résultat"
          loading={isLoading}
          loadingText="Chargement…"
          filterOptions={filterOptions}
          style={{
            position: isMobile && isAutocompleteFocused ? 'fixed' : 'static',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 10,
            backgroundColor: '#f9f9f9'
          }}
          onFocus={(() => setIsAutocompleteFocused(true))}
          onBlur={(() => setIsAutocompleteFocused(false))}
        />
      </div>
    </Wrapper>
  )
}

Step2Component.propTypes = {
  onNext: PropTypes.func,
  values: PropTypes.object
}

Step2Component.defaultProps = {
  onNext: () => {},
  values: {}
}

export default Step2Component
