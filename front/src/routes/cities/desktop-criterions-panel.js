import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  FormControl,
  MenuItem, InputLabel, Select, Typography
} from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'
import { useCities } from '../../common/contexts/citiesContext'
import { COLOR_BACKGROUND, COLOR_PRIMARY, COLOR_GRAY } from '../../constants/colors'
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
  z-index: 1;
`

const SearchPanel = styled.div`
  margin-bottom: 36px;
  background-color: white;
  padding: 32px 0;
`

const SearchBar = styled.div`
  height: 64px;
  border-radius: 4px;
  display: flex;
  align-items: center;

  > *:not(input) {
    flex: 1;
  }
`

const SearchFormControl = styled(FormControl)`
  margin-right: 16px !important;
`

const Infopanel = styled.div`
  display: flex;
  background: ${COLOR_GRAY};
  align-items: space-between;
  justify-content: space-between;
  width: 100%;
  max-width: 700px;
  margin: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 12px;
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

const DesktopCriterionsPanel = ({ paramsUrl, total, redirectTo }) => {
  const {
    criterions
  } = useCities()
  const {
    control, handleSubmit, setValue
  } = useForm({
    defaultValues: {
      rome: '',
      region: '',
      environment: '',
      city: ''
    }
  })

  const onSubmit = (data) => {
    let params = { }
    if (data.rome) {
      params = { ...params, code_rome: [data.rome] }
    } else if (criterions.codeRomes && criterions.codeRomes.length) {
      params = { ...params, code_rome: [criterions.codeRomes[0].key] }
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

    const pushParams = []
    Object.entries(params).forEach(([key, value]) => {
      pushParams.push(`${key}=${value.join(',')}`)
    })

    redirectTo(pushParams.join('&'))
  }

  useEffect(() => {
    if (criterions == null || criterions.criterions === undefined) {
      return
    }

    if (paramsUrl) {
      const rome = paramsUrl && paramsUrl.code_rome
    && paramsUrl.code_rome.length ? paramsUrl.code_rome[0] : ''
      const region = paramsUrl && paramsUrl.code_region
    && paramsUrl.code_region.length ? paramsUrl.code_region[0] : ''

      const values = []
      values.push({ name: 'rome', value: rome })
      values.push({ name: 'region', value: region })

      if (criterions.criterions && paramsUrl && paramsUrl.code_criterion) {
        const envFinded = criterions.criterions
          .filter((c) => c.tag === 'environment')
          .find((c) => paramsUrl.code_criterion.indexOf(c.key) !== -1)
        if (envFinded) {
          values.push({ name: 'environment', value: envFinded.key })
        }

        const cityFinded = criterions.criterions
          .filter((c) => c.tag === 'city')
          .find((c) => paramsUrl.code_criterion.indexOf(c.key) !== -1)
        if (cityFinded) {
          values.push({ name: 'city', value: cityFinded.key })
        }
      }

      values.forEach(({ name, value }) => setValue(name, value, { shouldDirty: true }))
    }
  }, [paramsUrl, criterions])

  if (criterions == null || criterions.criterions === undefined) {
    return <div />
  }

  return (
    <EmptySpace>
      <Wrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SearchPanel>
            <SearchBar className="wrapper">
              <SearchFormControl variant="filled">
                <InputLabel htmlFor="panel-select-environment" shrink>Environnement</InputLabel>
                <Controller
                  control={control}
                  name="environment"
                  defaultValue=""
                  as={(
                    <Select
                      displayEmpty
                      inputProps={{
                        id: 'panel-select-environment'
                      }}
                    >
                      <MenuItem value="">
                        Peu importe
                      </MenuItem>
                      {criterions
                      && criterions.criterions
                        ? criterions.criterions
                          .filter((c) => c.tag === 'environment').map((rome) => (
                            <MenuItem
                              key={rome.key}
                              value={rome.key}
                            >
                              {rome.label}
                            </MenuItem>
                          )) : null}
                    </Select>
                  )}
                />
              </SearchFormControl>

              <SearchFormControl variant="filled">
                <InputLabel htmlFor="panel-select-city-size" shrink>Taille de ville</InputLabel>
                <Controller
                  control={control}
                  name="city"
                  defaultValue=""
                  as={(
                    <Select
                      displayEmpty
                      inputProps={{
                        id: 'panel-select-city-size'
                      }}
                    >
                      <MenuItem selected value="">
                        Peu importe
                      </MenuItem>
                      {criterions && criterions.criterions
                        ? criterions.criterions.filter((c) => c.tag === 'city').map((rome) => (
                          <MenuItem key={rome.key} value={rome.key}>
                            {rome.label}
                          </MenuItem>
                        )) : null}
                    </Select>
                  )}
                />
              </SearchFormControl>

              <SearchFormControl variant="filled">
                <InputLabel htmlFor="panel-select-region" shrink>Région</InputLabel>
                <Controller
                  control={control}
                  name="region"
                  defaultValue=""
                  as={(
                    <Select
                      displayEmpty
                      inputProps={{
                        id: 'panel-select-city-size'
                      }}
                    >
                      <MenuItem selected value="">
                        Toutes les regions
                      </MenuItem>
                      {criterions && criterions.regions
                    && criterions.regions.map((rome) => (
                      <MenuItem key={rome.id} value={rome.id}>
                        {rome.label}
                      </MenuItem>
                    ))}
                    </Select>
                  )}
                />
              </SearchFormControl>
              <SubmitButton type="submit" value="Rechercher" />
            </SearchBar>
          </SearchPanel>
        </form>
        <Infopanel>
          <p>
            Les villes qui vous sont proposées sont les villes où il y a des offres et peu de
            concurrence, afin d’accélérer votre recherche d’emploi.
          </p>
        </Infopanel>
        <SubInfo>
          <Typography>
            <span>{total}</span>
            {' '}
            {total > 1 ? 'villes correspondantes' : 'ville correspondante'}
          </Typography>
          <CitiesFilterList />
        </SubInfo>
      </Wrapper>
    </EmptySpace>
  )
}

DesktopCriterionsPanel.propTypes = {
  paramsUrl: PropTypes.object,
  total: PropTypes.number,
  redirectTo: PropTypes.func
}

DesktopCriterionsPanel.defaultProps = {
  paramsUrl: [],
  total: 0,
  redirectTo: () => {}
}

export default React.memo(DesktopCriterionsPanel)
