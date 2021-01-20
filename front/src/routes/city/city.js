import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useCities } from '../../common/contexts/citiesContext'
import { MainLayout } from '../../components/main-layout'
import { paramUrlToObject } from '../../utils/url'
import { CityHeader } from './city-header'
import PanelCityJobs from './panel-city-jobs'
import PanelCityLife from './panel-city-life'
import PanelCityLogement from './panel-city-logement'

const ContentBlock = styled.div`
  margin: 32px 0;
`

const CityPage = ({ location: { search } }) => {
  const [tabList, setTabList] = useState([{ key: 'life', label: 'Cadre de vie' }, { key: 'tenement', label: 'Logement' }])
  const [tabSelected, setTagSelected] = useState(0)
  const { onLoadCity, isLoadingCity, city } = useCities()
  const { insee } = useParams()
  const params = paramUrlToObject(search)

  useEffect(() => {
    const extract = insee.split('-')
    if (extract && extract.length) {
      onLoadCity(extract[0])
    }
  }, [])

  useEffect(() => {
    if (city && params && params.code_rome) {
      if (tabList.findIndex((t) => t.key === 'job') === -1) {
        tabList.splice(0, 0, { key: 'job', label: 'Emplois' })
        setTabList(tabList)
      }
    }
  }, [city])

  const tabKey = tabList[tabSelected].key

  return (
    <MainLayout menu={{ visible: false }}>
      {isLoadingCity && (<p>Loading...</p>)}
      {!isLoadingCity && !city && (<p>Non trouvée</p>)}
      {!isLoadingCity && city && (
        <>
          <CityHeader
            tabList={tabList}
            tabSelectedIndex={tabSelected}
            onSelectTab={setTagSelected}
          />
          <ContentBlock>
            {tabKey === 'job' && <PanelCityJobs city={city} rome={params && params.code_rome ? params.code_rome : null} />}
            {tabKey === 'life' && <PanelCityLife city={city} />}
            {tabKey === 'tenement' && <PanelCityLogement city={city} />}
          </ContentBlock>
        </>
      )}
    </MainLayout>
  )
}

CityPage.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  })
}

CityPage.defaultProps = {
  location: {
    search: ''
  }
}

export default CityPage
