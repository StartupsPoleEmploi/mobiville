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
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'

const ContentBlock = styled.div`
  margin: ${(props) => (props.isMobile ? '0' : '32px 0')};
  padding-bottom: 64px;
`

const HelpButton = styled.button`
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  height: 48px !important;
  align-items: center;
  justify-content: center;
  font-size: 16px !important;
  cursor: pointer;
  width: ${(props) => (props.isMobile ? 'calc(100% - 32px)' : '')};
  padding: ${(props) => (props.isMobile ? '0 12px' : '0 48px')} !important;
`

const CityPage = ({ location: { search } }) => {
  const [tabList, setTabList] = useState([{ key: 'life', label: 'Cadre de vie' }, { key: 'tenement', label: 'Logement' }])
  const [tabSelected, setTagSelected] = useState(0)
  const { onLoadCity, isLoadingCity, city } = useCities()
  const { insee } = useParams()
  const params = paramUrlToObject(search)
  const size = useWindowSize()

  useEffect(() => {
    const extract = insee.split('-')
    if (extract && extract.length) {
      onLoadCity(extract[0])
    }
  }, [])

  useEffect(() => {
    if (city && params && params.code_rome) {
      if (tabList.findIndex((t) => t.key === 'job') === -1) {
        tabList.splice(0, 0, { key: 'job', label: 'Emploi' })
        setTabList(tabList)
      }
    }
  }, [city])

  const tabKey = tabList[tabSelected].key

  return (
    <MainLayout menu={{ visible: !isMobileView(size) }}>
      {isLoadingCity && (<p>Loading...</p>)}
      {!isLoadingCity && !city && (<p>Non trouvée</p>)}
      {!isLoadingCity && city && (
        <>
          <CityHeader
            tabList={tabList}
            tabSelectedIndex={tabSelected}
            onSelectTab={setTagSelected}
          />
          <ContentBlock isMobile={isMobileView(size)}>
            {tabKey === 'job' && <PanelCityJobs city={city} rome={params && params.code_rome ? params.code_rome : null} />}
            {tabKey === 'life' && <PanelCityLife city={city} />}
            {tabKey === 'tenement' && <PanelCityLogement city={city} />}

            {/* <a
              target="_blank"
              rel="noreferrer"
href="https://forms.office.com/Pages/ResponsePage.aspx?id=D2CoVeZOtUuPFFNYlTa23928sWFHLoxJm4ig5MoGaWlUNEI4MU9GMEI3QUswNlpDSkZGTjZSSE5CNy4u"
              style={{ cursor: 'pointer' }}
            >
              <HelpButton className="btn primary" type="button" isMobile={isMobileView(size)}>
              Être accompagné pour mon projet</HelpButton>
            </a> */}
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
