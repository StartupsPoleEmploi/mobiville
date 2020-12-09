import React, { lazy, memo, useState } from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import { useCities } from '../../common/contexts/citiesContext'
import { MainLayout } from '../../components/main-layout'

const StepBlock = styled(Typography)`
  && {
    margin: 28px 16px 48px 16px;
    font-size: 12px;
    font-weight: bold;
  }
`

const ProgressBar = styled.div`
  background-color: #00A4E8;
  position: absolute;
  height: 4px;
  left: 0;
`

const ALL_STEPS = [{
  components: lazy(() => import('./step1'))
}, {
  components: lazy(() => import('./step2'))
}, {
  components: lazy(() => import('./step3'))
}, {
  components: lazy(() => import('./step4'))
}, {
  components: lazy(() => import('./step5'))
}]

const SearchPage = () => {
  const { criterions } = useCities()
  const [index, setIndex] = useState(0)
  const [onSearch, setOnSearch] = useState(null)
  const [values, setValues] = useState({})

  if (!criterions) {
    return <p>Loading...</p>
  }

  const onNextStep = (val = {}) => {
    const newValues = { ...values, ...val }
    if (index + 1 >= ALL_STEPS.length) {
      let params = { }

      if (newValues.rome) {
        params = { ...params, code_rome: [newValues.rome] }
      }

      if (newValues.city) {
        const tab = (params.code_criterion || [])
        tab.push(newValues.city)
        params = { ...params, code_criterion: tab }
      }

      if (newValues.environment) {
        const tab = (params.code_criterion || [])
        tab.push(newValues.environment)
        params = { ...params, code_criterion: tab }
      }

      if (newValues.regions) {
        params = { ...params, code_region: newValues.regions.map((r) => (r.id)) }
      }

      if (newValues.from) {
        params = { ...params, from: [newValues.from.id] }
      }

      setOnSearch(params)
    } else {
      setValues(newValues)
      setIndex(index + 1)
    }
  }

  if (onSearch) {
    const params = []
    Object.entries(onSearch).forEach(([key, value]) => {
      params.push(`${key}:${value.join(',')}`)
    })

    return <Redirect to={`/cities?${params.join(';')}`} />
  }

  const onBack = () => {
    setIndex(index - 1)
  }

  const Component = ALL_STEPS[index].components

  return (
    <MainLayout menu={{
      title: 'Ma recherche', logo: false, mainHeight: 56, backButton: index === 0 ? '/' : onBack
    }}
    >
      <ProgressBar style={{ width: `${((index + 1) * 100) / ALL_STEPS.length}%` }} />
      <StepBlock>
        Etape
        {' '}
        {index + 1}
        /
        {ALL_STEPS.length}
      </StepBlock>
      <Component onNext={onNextStep} values={values} />
    </MainLayout>
  )
}

export default memo(SearchPage)
