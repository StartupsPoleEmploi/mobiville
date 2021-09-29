import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import queryString from 'query-string'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useCities } from '../../common/contexts/citiesContext'
import { MainLayout } from '../../components/main-layout'
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

const CityPage = ({ location: { pathname, search } }) => {
  const tabList = [
    { key: 'job', label: 'Emploi' },
    { key: 'life', label: 'Cadre de vie' },
    { key: 'tenement', label: 'Logement' },
  ]
  const { onLoadCity, isLoadingCity, city } = useCities()
  const { insee, place } = useParams()
  const params = queryString.parse(search)
  const size = useWindowSize()
  const history = useHistory()

  const [jobSearchValue, setJobSearchValue] = useState(
    decodeURIComponent(params.jobSearch || '')
  )

  useEffect(() => {
    const extract = insee.split('-')
    if (extract && extract.length) {
      onLoadCity(extract[0])
    }
  }, [])

  useEffect(() => {
    if (!jobSearchValue) return
    if (jobSearchValue === decodeURIComponent(params.jobSearch)) return

    history.replace({
      pathname,
      search: queryString.stringify({ ...params, jobSearch: jobSearchValue }),
    })
  }, [history, jobSearchValue, params, pathname])

  const setTagSelected = (tagIndex) => {
    const tag = tabList[tagIndex].key
    const tagPath = tag !== 'job' ? `/${tag}` : ''

    history.push({ pathname: `/city/${insee}${tagPath}`, search })
  }

  const tabKey = place || 'job'

  return (
    <MainLayout menu={{ visible: !isMobileView(size) }}>
      {isLoadingCity && <p>Loading...</p>}
      {!isLoadingCity && !city && <p>Non trouvée</p>}
      {!isLoadingCity && city && (
        <>
          <CityHeader
            tabList={tabList}
            tabSelected={tabKey}
            onSelectTab={setTagSelected}
          />
          <ContentBlock isMobile={isMobileView(size)}>
            {tabKey === 'job' && (
              <PanelCityJobs
                city={city}
                rome={params && params.codeRome ? params.codeRome : null}
                searchValue={jobSearchValue}
                setSearchValue={setJobSearchValue}
              />
            )}
            {tabKey === 'life' && <PanelCityLife city={city} />}
            {tabKey === 'tenement' && <PanelCityLogement city={city} />}
            <Link to="/mobility-guide" style={{ cursor: 'pointer' }}>
              <HelpButton
                className="btn primary"
                type="button"
                isMobile={isMobileView(size)}
              >
                Choisir cette ville
              </HelpButton>
            </Link>
          </ContentBlock>
        </>
      )}
    </MainLayout>
  )
}

CityPage.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }),
}

CityPage.defaultProps = {
  location: {
    search: '',
  },
}

export default CityPage
