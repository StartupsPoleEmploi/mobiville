import React, { lazy, memo, useState } from 'react'
import styled from 'styled-components'
import { Link, Typography } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import { useCities } from '../../common/contexts/citiesContext'
import { MainLayout } from '../../components/main-layout'
import { COLOR_PRIMARY } from '../../constants/colors'
import { isMobileView } from '../../constants/mobile'
import { useWindowSize } from '../../common/hooks/window-size'

const StepBlock = styled(Typography)`
  && {
    margin: 28px 0 48px 0;
    font-size: 12px;
    font-weight: bold;
  }
`

const LimitedWrapper = styled.div`
  max-width: ${(props) => (props.isMobile ? 'auto' : '336px')};
  width: ${(props) => (props.isMobile ? 'auto' : '100%')};
  margin-left: ${(props) => (props.isMobile ? '16px' : 'auto')};
  margin-right: ${(props) => (props.isMobile ? '16px' : 'auto')};
`

const ProgressBar = styled.div`
  background-color: ${COLOR_PRIMARY};
  position: absolute;
  height: 4px;
  left: 0;
`

const Icon = styled.i`
  cursor: pointer;
  color: black;
`

const BackWrapper = styled.div`
  margin-top: ${(props) => (props.isMobile ? '24px' : '68px')};
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
  const size = useWindowSize()

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
        params = { ...params, code_region: newValues.regions }
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
      params.push(`${key}=${value.join(',')}`)
    })

    return <Redirect to={`/cities?${params.join('&')}`} />
  }

  const onBack = () => {
    setIndex(index - 1)
  }

  const Component = ALL_STEPS[index].components

  return (
    <MainLayout>
      <ProgressBar style={{ width: `${((index + 1) * 100) / ALL_STEPS.length}%` }} />
      <LimitedWrapper isMobile={isMobileView(size)}>
        <BackWrapper isMobile={isMobileView(size)}>
          {index === 0 && <Link to="/"><Icon className="material-icons">keyboard_backspace</Icon></Link>}
          {index !== 0 && <Icon className="material-icons" onClick={onBack}>keyboard_backspace</Icon>}
        </BackWrapper>
        <StepBlock>
          Etape
          {' '}
          {index + 1}
          /
          {ALL_STEPS.length}
        </StepBlock>
        <Component onNext={onNextStep} values={values} />
      </LimitedWrapper>
    </MainLayout>
  )
}

export default memo(SearchPage)
