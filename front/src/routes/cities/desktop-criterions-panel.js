import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  FormControl,
  MenuItem, Select, Typography
} from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'
import { useCities } from '../../common/contexts/citiesContext'
import { COLOR_BACKGROUND, COLOR_PRIMARY } from '../../constants/colors'
import CitiesFilterList from './cities-filter-list'

const EmptySpace = styled.div`
  height: 40px;
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

  > *:not(input) {
    flex: 1;
  }
`

const SubInfo = styled.div`
  display: flex;
  max-width: 700px;
  align-items: center;
  margin: auto;

  p {
    font-weight: 500;
    flex: 1;
  }

  span {
    font-weight: 700;
  }
`

const SubmitButton = styled.input`
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
  const [onSearch, setOnSearch] = useState(null)
  const {
    control, handleSubmit, setValue, getValues
  } = useForm()

  if (allCriterions == null || allCriterions.criterions === undefined) {
    return <div />
  }

  const updateValue = (type, value) => {
    setValue(type, value)
  }

  const onSubmit = (data) => {
    let params = { }
    if (data.rome) {
      params = { ...params, code_rome: [data.rome] }
    } else if (allCriterions.codeRomes && allCriterions.codeRomes.length) {
      params = { ...params, code_rome: [allCriterions.codeRomes[0].key] }
    }

    if (data.city) {
      const tab = (params.code_criterion || [])
      tab.push(data.city)
      params = { ...params, code_criterion: tab }
    }

    if (data.environment) {
      const tab = (params.code_criterion || [])
      tab.push(data.environment)
      params = { ...params, code_criterion: tab }
    }

    if (data.region) {
      params = { ...params, code_region: [data.region] }
    }

    if (data.from) {
      params = { ...params, from: [data.from.id] }
    }

    setOnSearch(params)
  }

  useEffect(() => {
    if (criterions) {
      const rome = criterions && criterions.code_rome
    && criterions.code_rome.length ? criterions.code_rome[0] : ''
      const region = criterions && criterions.code_region
    && criterions.code_region.length ? criterions.code_region[0] : ''

      updateValue('rome', rome)
      updateValue('region', region)

      const values = getValues()

      if (allCriterions.criterions && criterions && criterions.code_criterion) {
        if (!values.environment) {
          const envFinded = allCriterions.criterions
            .filter((c) => c.tag === 'environment')
            .find((c) => criterions.code_criterion.indexOf(c.key) !== -1)
          if (envFinded) {
            updateValue('environment', envFinded.key)
          }
        }

        if (!values.city) {
          const cityFinded = allCriterions.criterions
            .filter((c) => c.tag === 'city').find((c) => criterions.code_criterion.indexOf(c.key) !== -1)
          if (cityFinded) {
            updateValue('city', cityFinded.key)
          }
        }
      }
    }
  }, [criterions])

  if (onSearch) {
    const params = []
    Object.entries(onSearch).forEach(([key, value]) => {
      params.push(`${key}=${value.join(',')}`)
    })

    window.location.href = `/cities?${params.join('&')}`
  }

  return (
    <EmptySpace>
      <Wrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SearchPanel>
            <SearchBar className="wrapper">

              <FormControl>
                <Controller
                  control={control}
                  name="rome"
                  defaultValue=""
                  as={(
                    <Select
                      style={{ marginLeft: 16 }}
                    >
                      {allCriterions && allCriterions.codeRomes
            && allCriterions.codeRomes.map((rome) => (
              <MenuItem key={rome.key} value={rome.key}>
                {rome.label}
              </MenuItem>
            ))}
                    </Select>
    )}
                />
              </FormControl>

              <FormControl>
                <Controller
                  control={control}
                  name="environment"
                  defaultValue=""
                  as={(
                    <Select
                      style={{ marginLeft: 16 }}
                      displayEmpty
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
                  )}
                />
              </FormControl>

              <FormControl>
                <Controller
                  control={control}
                  name="city"
                  defaultValue=""
                  as={(
                    <Select
                      style={{ marginLeft: 16 }}
                      displayEmpty
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
                  )}
                />
              </FormControl>

              <FormControl>
                <Controller
                  control={control}
                  name="region"
                  defaultValue=""
                  as={(
                    <Select
                      style={{ marginLeft: 16, marginRight: 16 }}
                      displayEmpty
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
                  )}
                />
              </FormControl>
              <SubmitButton type="submit" value="Rechercher" />
            </SearchBar>
          </SearchPanel>
        </form>
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
