import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'

import { TextSearchInput } from '../../components'
import { useCities } from '../../common/contexts/citiesContext'
import { useLocation } from 'react-router-dom'

const JobSelect = ({ value, onSelect }) => {
  const { search, pathname } = useLocation()
  const {
    initializeJobsAutocomplete,
    jobsMatchingCriterions,
    onSearchJobLabels,
    criterions,
    // isLoadingJobsMatchingCriterion
  } = useCities()

  const [inputValue, setInputValue] = useState(null)
  const isCitiesPage = pathname === '/villes'

  useEffect(() => {
    if (!!search && !!criterions?.codeRomes && !value) {
      const entries = new URLSearchParams(search).entries()

      for (let entry of entries) {
        const [key, value] = entry

        if (key === 'codeRome') {
          const foundJob = criterions.codeRomes.find((job) => job.key === value)
          if (!!foundJob) {
            onSelect(foundJob)
          }
        }
      }
    }
  }, [search, criterions?.codeRomes])

  useEffect(() => {
    if (!!inputValue) {
      debounceOnSearchJobLabels(inputValue)
    }
  }, [inputValue])

  useEffect(() => {
    initializeJobsAutocomplete()
  }, [])

  const debounceOnSearchJobLabels = useMemo(
    () => debounce((inputValue) => onSearchJobLabels(inputValue), 250),
    []
  )

  // trigger when text input has been updated
  const onInputChange = (_, inputValue) => {
    if (!!inputValue) {
      setInputValue(inputValue)
    }
  }

  // trigger when an option is selected
  const onChange = (_, value) => {
    onSelect(value)
  }

  const onClickTag = () => {
    window.smartTagPiano({
      name: 'modification_metier',
      type: 'action',
      chapters: ['cities', 'recherche'],
    })
  }

  return (
    <TextSearchInput
      label="Votre métier"
      placeholder="Saisissez votre métier"
      value={value}
      groupLabel="Métiers"
      onClickTag={isCitiesPage ? onClickTag : undefined}
      options={jobsMatchingCriterions ?? []}
      isOptionEqualToValue={(option, value) =>
        option?.label === value?.label ||
        (!value?.label?.includes('(') && option?.key === value?.key)
      }
      // loading={isLoadingJobsMatchingCriterion}
      onInputChange={onInputChange}
      onChange={onChange}
      openThreshold={2}
      showEndAdornment={false}
    ></TextSearchInput>
  )
}

JobSelect.propTypes = {
  value: PropTypes.any,
  onSelect: PropTypes.func.isRequired,
}

export default JobSelect
