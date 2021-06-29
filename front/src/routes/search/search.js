import React, {
  lazy, memo
} from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { useCities } from '../../common/contexts/citiesContext'
import { MainLayout } from '../../components/main-layout'
import { COLOR_PRIMARY } from '../../constants/colors'
import { isMobileView } from '../../constants/mobile'
import { useWindowSize } from '../../common/hooks/window-size'
import { paramUrlToObject } from '../../utils/url'

const StepBlock = styled(Typography)`
  && {
    margin: ${(props) => (props.isMobile ? '8px 0' : '28px 0 48px 0')};
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

const ALL_STEPS = [/* {
  key: 'depuis',
  components: lazy(() => import('./step1'))
}, */ {
    key: 'rome',
    components: lazy(() => import('./step2'))
  }, {
    key: 'region',
    components: lazy(() => import('./step3'))
  }, {
    key: 'cadre',
    components: lazy(() => import('./step4'))
  }, {
    key: 'environement',
    components: lazy(() => import('./step5'))
  }]

const SearchPage = () => {
  const { criterions } = useCities()
  const size = useWindowSize()
  const { stepName } = useParams()
  const index = ALL_STEPS.findIndex((f) => f.key === stepName)
  const history = useHistory()
  const location = useLocation()
  const values = paramUrlToObject(location.search)
  const isMobile = isMobileView(size)

  if (!criterions) {
    return <p>Chargement...</p>
  }

  const onNavigate = (increase, search = '') => {
    const x = index + increase

    if (x === -1) {
      history.push('/')
    } else if (x >= ALL_STEPS.length) {
      history.push({ pathname: '/cities', search })
    } else {
      history.push({ pathname: `/rechercher/${ALL_STEPS[x].key}`, search })
    }
  }

  const onNextStep = (newValues = {}, increase = 1) => {
    let val = {}

    if (newValues.rome) {
      val = { ...values, code_rome: [newValues.rome] }
    } else if (newValues.regions) {
      val = { ...values, code_region: newValues.regions }
    } else if (newValues.from) {
      val = { ...values, from: [newValues.from.id] }
    } else if (newValues.city) {
      val = { ...values, code_city: [newValues.city] }
    } else if (newValues.environment) {
      val = { ...values, code_environment: [newValues.environment] }
    } else {
      val = { ...values, ...newValues }
    }

    val = { ...val, code_criterion: (val.code_city || []).concat(val.code_environment || []) }

    const params = []
    Object.entries(val).forEach(([key, value]) => {
      params.push(`${key}=${value.join(',')}`)
    })

    onNavigate(increase, `?${params.join('&')}`)
  }

  if (index === -1) {
    return <div />
  }

  const Component = ALL_STEPS[index].components

  return (
    <MainLayout>
      <ProgressBar style={{ width: `${((index + 1) * 100) / ALL_STEPS.length}%` }} />
      <LimitedWrapper isMobile={isMobile}>
        <BackWrapper isMobile={isMobile}>
          <Icon className="material-icons" onClick={() => onNextStep({}, -1)}>keyboard_backspace</Icon>
        </BackWrapper>
        <StepBlock isMobile={isMobile}>
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
