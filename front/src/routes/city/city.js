import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useHistory, useParams } from 'react-router-dom'
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
  const tabList = [{ key: 'job', label: 'Emploi' }, { key: 'life', label: 'Cadre de vie' }, { key: 'tenement', label: 'Logement' }]
  const { onLoadCity, isLoadingCity, city } = useCities()
  const { insee, place } = useParams()
  const params = paramUrlToObject(search)
  const size = useWindowSize()
  const history = useHistory()

  useEffect(() => {
    const extract = insee.split('-')
    if (extract && extract.length) {
      onLoadCity(extract[0])
    }
  }, [])

  const setTagSelected = (tagIndex) => {
    const tag = tabList[tagIndex].key
    const tagPath = tag !== 'job' ? `/${tag}` : ''

    history.push({ pathname: `/city/${insee}${tagPath}`, search })
  }

  const tabKey = place || 'job'

  return (
    <MainLayout menu={{ visible: !isMobileView(size) }}>
      {isLoadingCity && (<p>Loading...</p>)}
      {!isLoadingCity && !city && (<p>Non trouvée</p>)}
      {!isLoadingCity && city && (
        <>
          <CityHeader
            tabList={tabList}
            tabSelected={tabKey}
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
              Choisir cette ville</HelpButton>
            </a> */}
            <a
              target="_blank"
              rel="noreferrer"
              href={'mailto:contact@mobiville.pole-emploi.fr?subject=Choisir cette ville&body=Quelle est la ville qui vous intéresse ?%0D%0A%0D%0A%0D%0A%0D%0AComment pouvons-nous vous aider ?%0D%0A%0D%0A%0D%0A%0D%0AQuel est votre nom et votre prénom ? (ça nous permettra de vous recontacter^^)%0D%0A%0D%0A%0D%0A%0D%0AVotre numéro de téléphone (optionnel mais c\'est mieux d\'échanger en direct )%0D%0A%0D%0A%0D%0A%0D%0ARecommanderiez-vous notre service à un ami ou un collègue ?%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A « Nous vous informons que les données personnelles que vous communiquez via ce questionnaire sont collectées par Pôle emploi à seule fin de vous proposer un service d’aide à votre projet de mobilité dans le cadre de votre recherche d’emploi. La base légale de ce traitement est l’exercice des missions de service public de Pôle emploi. Les destinataires de ces données sont l\'équipe projet dédiée. Les réponses apportées à ce questionnaire n’auront pas pour destination d’alimenter votre dossier de demandeur d’emploi. Conformément aux articles 12 à 23 du règlement général (UE) sur la protection des données n°2016/679 du 27 avril 2016 et à la loi Informatique et libertés n°78-17 du 6 janvier 1978 modifiée, vous bénéficiez notamment d’un droit d’accès, de rectification, de limitation du traitement, le droit de définir des directives sur le sort des données après votre mort. Pour exercer vos droits, vous pouvez contacter l’équipe dédiée par courriel à l’adresse suivante : mobiville@pole-emploi.fr. Vous pouvez également vous adresser au délégué à la protection des données de Pôle emploi par courrier postal (1 avenue du Docteur Gley, 75987 Paris cedex 20) ou par courriel (Courriers-cnil@pole-emploi.fr). Si vous estimez, après nous avoir contactés, que vos droits « Informatique et Libertés » ne sont pas respectés, vous avez la possibilité d’adresser une réclamation à la CNIL.»'}
              style={{ cursor: 'pointer' }}
            >
              <HelpButton className="btn primary" type="button" isMobile={isMobileView(size)}>
                Choisir cette ville
              </HelpButton>
            </a>
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
