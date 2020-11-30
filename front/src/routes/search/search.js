import React from 'react'
import { useCities } from '../../common/contexts/citiesContext'
import { MainLayout } from '../../components/main-layout'

const SearchPage = () => {
  const { criterions } = useCities()
  // const [stepIndex, setStepIndex] = useState(0)

  /* const onSubmit = (data) => {
    let params = {
      code_rome: CODE_ROMES
    }

    if (data.regions) {
      params = { ...params, code_region: [data.regions] }
    }
    if (data.environment) {
      const tab = (params.code_criterion || [])
      tab.push(data.environment)
      params = { ...params, code_criterion: tab }
    }
    if (data.city) {
      const tab = (params.code_criterion || [])
      tab.push(data.city)
      params = { ...params, code_criterion: tab }
    }

    setOnSearch(params)
  } */

  if (!criterions) {
    return <p>Loading...</p>
  }

  /* if (onSearch) {
    const params = []
    Object.entries(onSearch).forEach(([key, value]) => {
      params.push(`${key}:${value.join(',')}`)
    })

    return <Redirect to={`/cities?${params.join(';')}`} />
  } */

  // const environmentVars = (criterions.criterions || []).filter((e) => e.tag === 'environment')
  // const citiesVars = (criterions.criterions || []).filter((e) => e.tag === 'city')

  return (
    <MainLayout menu={{
      mainStyle: { backgroundColor: '#00B9B6' }, title: 'Ma recherche', logo: false, mainHeight: 56, secondWrapper: true, secondTitle: 'Etape XXX', backButton: '/'
    }}
    >
      Recherche
    </MainLayout>
  )
}

export default SearchPage
