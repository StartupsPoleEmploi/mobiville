import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  MenuItem, Select, TextField, Typography
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useCities } from '../../common/contexts/citiesContext'
import { COLOR_BACKGROUND, COLOR_GRAY, COLOR_PRIMARY } from '../../constants/colors'
import { ucFirst } from '../../utils/utils'

const Wrapper = styled.div` 
  margin-bottom: 16px;
`

const Input = styled(TextField)`
  && {
    background-color: ${COLOR_GRAY};

    input {
      padding-left: 8px !important;
    }
  }
`

const SearchPanel = styled.div`
  margin-bottom: 36px; 
  background-color: white;
  padding: 32px 0;
`

const SearchBar = styled.div`
  height: 64px;
  background-color: ${COLOR_BACKGROUND};
  border-radius: 4px;
  display: flex;
  align-items: center;

  > *:not(button) {
    flex: 1;
  }
`

const SubInfo = styled.div`
  display: flex;
  max-width: 700px;
  margin: auto;

  p {
    font-weight: 500;
  }

  span {
    font-weight: 700;
  }
`

const SubmitButton = styled.button`
  height: 100%;
  background-color: ${COLOR_PRIMARY};
  color: white;
  padding: 0 34px;
  line-height: 64px;
  border: none;
  font-weight: 500;
  font-size: 18px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  cursor: pointer;
`

const DesktopCriterionsPanel = ({ criterions, total }) => {
  const {
    criterions: allCriterions, searchCities, isLoadingLocation, onSearchByName
  } = useCities()
  const [onSearch, setOnSearch] = useState(null)
  const [tempForm, setTempForm] = useState({})

  const formatedCity = (c) => {
    const nc = c
    if (nc) {
      return ucFirst(nc.nom_comm ? nc.nom_comm.toLowerCase() : nc.toLowerCase())
    }

    return ''
  }

  const searchNewCities = (event) => onSearchByName({ name: event.target.value })

  const updateValue = (type, value) => {
    setTempForm({ ...tempForm, [type]: value })
  }

  const onSubmit = () => {
    let params = { }
    if (tempForm.rome) {
      params = { ...params, code_rome: [tempForm.rome] }
    }

    if (tempForm.city) {
      const tab = (params.code_criterion || [])
      tab.push(tempForm.city)
      params = { ...params, code_criterion: tab }
    }

    if (tempForm.environment) {
      const tab = (params.code_criterion || [])
      tab.push(tempForm.environment)
      params = { ...params, code_criterion: tab }
    }

    if (tempForm.region) {
      params = { ...params, code_region: tempForm.region }
    }

    if (tempForm.from) {
      params = { ...params, from: [tempForm.from.id] }
    }

    setOnSearch(params)
  }

  useEffect(() => {
    if (isLoadingLocation === false && tempForm.from == null
      && criterions && criterions.from && criterions.from.length
      && (searchCities.length === 0 || searchCities
        .find((c) => c.id === +criterions.from[0] || c.id === null) == null
      )) {
      onSearchByName({ id: criterions.from[0] })
    }

    updateValue('rome', criterions && criterions.code_rome && criterions.code_rome.length ? criterions.code_rome[0] : '')
    updateValue('region', criterions && criterions.code_region && criterions.code_region.length ? criterions.code_region[0] : '')
    updateValue('rome', criterions && criterions.code_rome && criterions.code_rome.length ? criterions.code_rome[0] : '')
  }, [criterions])

  useEffect(() => {
    if (searchCities && searchCities.length === 1 && searchCities[0].id === +criterions.from[0]) {
      updateValue('from', searchCities[0])
    }
  }, [searchCities])

  if (allCriterions.criterions && criterions && criterions.code_criterion) {
    if (tempForm.environment == null && criterions) {
      const envFinded = allCriterions.criterions.filter((c) => c.tag === 'environment').find((c) => criterions.code_criterion.indexOf(c.key) !== -1)
      if (envFinded) {
        updateValue('environment', envFinded.key)
      }
    }

    if (tempForm.city == null) {
      const cityFinded = allCriterions.criterions.filter((c) => c.tag === 'city').find((c) => criterions.code_criterion.indexOf(c.key) !== -1)
      if (cityFinded) {
        updateValue('city', cityFinded.key)
      }
    }
  }

  if (onSearch) {
    const params = []
    Object.entries(onSearch).forEach(([key, value]) => {
      params.push(`${key}:${value.join(',')}`)
    })

    window.location.href = `/cities?${params.join(';')}`
  }

  return (
    <Wrapper>
      <SearchPanel>
        <SearchBar className="wrapper">
          <Autocomplete
            inputValue={tempForm.from ? tempForm.from.nom_comm : ''}
            options={searchCities.filter((s) => s.id !== null)}
            getOptionLabel={formatedCity}
            getOptionSelected={(option, value) => option.nom_comm === value}
            onChange={(e, data) => updateValue('from', data)}
            loading={isLoadingLocation}
            renderInput={(params) => <Input {...params} onKeyUp={searchNewCities} label="Villes" />}
            style={{ marginLeft: 9 }}
          />
          <Select
            style={{ marginLeft: 16 }}
            value={tempForm.rome || allCriterions.codeRomes[0].key}
            onChange={(event) => { updateValue('rome', event.target.value) }}
          >
            {allCriterions && allCriterions.codeRomes
                    && allCriterions.codeRomes.map((rome) => (
                      <MenuItem key={rome.key} value={rome.key}>
                        {rome.label}
                      </MenuItem>
                    ))}
          </Select>
          <Select
            style={{ marginLeft: 16 }}
            value={tempForm.environment || ''}
            displayEmpty
            onChange={(event) => { updateValue('environment', event.target.value) }}
          >
            <MenuItem selected value="">
              Peu importe
            </MenuItem>
            {allCriterions && allCriterions.criterions
                    && allCriterions.criterions.filter((c) => c.tag === 'environment').map((rome) => (
                      <MenuItem key={rome.key} value={rome.key}>
                        {rome.label}
                      </MenuItem>
                    ))}
          </Select>
          <Select
            style={{ marginLeft: 16 }}
            value={tempForm.city || ''}
            displayEmpty
            onChange={(event) => { updateValue('city', event.target.value) }}
          >
            <MenuItem selected value="">
              Peu importe
            </MenuItem>
            {allCriterions && allCriterions.criterions
                    && allCriterions.criterions.filter((c) => c.tag === 'city').map((rome) => (
                      <MenuItem key={rome.key} value={rome.key}>
                        N
                        {'\''}
                        est pas une
                        {' '}
                        {rome.label}
                      </MenuItem>
                    ))}
          </Select>
          <Select
            style={{ marginLeft: 16, marginRight: 16 }}
            value={tempForm.region || ''}
            displayEmpty
            onChange={(event) => { updateValue('region', event.target.value) }}
          >
            <MenuItem selected value="">
              Toutes les regions
            </MenuItem>
            {allCriterions && allCriterions.regions
                    && allCriterions.regions.map((rome) => (
                      <MenuItem key={rome.id} value={rome.id}>
                        {rome.label}
                      </MenuItem>
                    ))}
          </Select>
          <SubmitButton onClick={onSubmit}>Rechercher</SubmitButton>
        </SearchBar>
      </SearchPanel>
      <SubInfo>
        <Typography>
          <span>{total}</span>
          {' '}
          {total > 1 ? 'villes correspondantes' : 'ville correspondant'}
        </Typography>
      </SubInfo>
    </Wrapper>
  )
}

DesktopCriterionsPanel.propTypes = {
  criterions: PropTypes.object,
  total: PropTypes.number
}

DesktopCriterionsPanel.defaultProps = {
  criterions: [],
  total: 0
}

export default DesktopCriterionsPanel
