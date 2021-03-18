import React, { /* useEffect, */ useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  MenuItem, Select, Typography
} from '@material-ui/core'
import { useCities } from '../../common/contexts/citiesContext'
import { COLOR_BACKGROUND, COLOR_PRIMARY } from '../../constants/colors'
import CitiesFilterList from './cities-filter-list'

const EmptySpace = styled.div`
  height: 244px;
`

const Wrapper = styled.div`
  position: fixed;
  top: 76px;
  left: 0;
  right: 0;
  background-color: ${COLOR_BACKGROUND};
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
    flex: 1;
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
    criterions: allCriterions
  } = useCities()
  // const [onSearch, setOnSearch] = useState(null)
  const [tempForm, setTempForm] = useState({})

  if (allCriterions == null || allCriterions.criterions === undefined) {
    return <div />
  }

  const updateValue = (type, value) => {
    setTempForm({ ...tempForm, [type]: value })
  }

  const onSubmit = () => {
    let params = { }
    if (tempForm.rome) {
      params = { ...params, code_rome: [tempForm.rome] }
    } else if (allCriterions.codeRomes && allCriterions.codeRomes.length) {
      params = { ...params, code_rome: [allCriterions.codeRomes[0].key] }
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
      params = { ...params, code_region: [tempForm.region] }
    }

    if (tempForm.from) {
      params = { ...params, from: [tempForm.from.id] }
    }

    // setOnSearch(params)
  }
  onSubmit()

  /* useEffect(() => {
    setTempForm({
      ...tempForm,
      rome: criterions && criterions.code_rome
      && criterions.code_rome.length ? criterions.code_rome[0] : '',
      region: criterions && criterions.code_region
      && criterions.code_region.length ? criterions.code_region[0] : ''
    })
  }, [criterions]) */

  if (allCriterions.criterions && criterions && criterions.code_criterion) {
    if (tempForm.environment == null && criterions) {
      const envFinded = allCriterions.criterions
        .filter((c) => c.tag === 'environment')
        .find((c) => criterions.code_criterion.indexOf(c.key) !== -1)
      if (envFinded) {
        updateValue('environment', envFinded.key)
      }
    }

    if (tempForm.city == null) {
      const cityFinded = allCriterions.criterions
        .filter((c) => c.tag === 'city').find((c) => criterions.code_criterion.indexOf(c.key) !== -1)
      if (cityFinded) {
        updateValue('city', cityFinded.key)
      }
    }
  }

  /* if (onSearch) {
    const params = []
    Object.entries(onSearch).forEach(([key, value]) => {
      params.push(`${key}=${value.join(',')}`)
    })

    window.location.href = `/cities?${params.join('&')}`
  } */

  return (
    <EmptySpace>
      <Wrapper>
        <SearchPanel>
          <SearchBar className="wrapper">
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
                    && allCriterions.criterions
                      .filter((c) => c.tag === 'environment').map((rome) => (
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
          <CitiesFilterList />
        </SubInfo>
      </Wrapper>
    </EmptySpace>
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

export default React.memo(DesktopCriterionsPanel)
