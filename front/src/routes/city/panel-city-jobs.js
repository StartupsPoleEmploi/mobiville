import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useProfessions } from '../../common/contexts/professionsContext'
import { COLOR_GRAY, COLOR_TEXT_PRIMARY } from '../../constants/colors'
import { COLOR_TEXT_SECONDARY } from '../../contants/colors'
import { useCities } from '../../common/contexts/citiesContext'
import { thereAre } from '../../utils/utils'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'

const MainLayout = styled.div`
  display: flex;
  align-items: flex-start;
  margin: auto;
  max-width: 1024px;

  ${(props) => (props.isMobileView ? `
    flex-direction: column;

    > div {
      margin-right: 0;
      margin-bottom: 2px;
      box-shadow: none;
      border-radius: 0;  
      width: 100%;
    }
  ` : '')}
`

const StatistiqueLayout = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  width: 400px;
  padding: 16px;
  margin-right: 16px;
`

const StatistiqueTitleLayout = styled.p`
  font-weight: bold;
  margin-bottom: 32px;
  margin-top: 0;
`

const StatistiqueItem = styled.div`
  img {
    display: block;
    margin: auto;
  }

  p {
    margin: 2px 0 4px 0;
    text-align: center;
    font-weight: bold;
  }
`

const JobLayout = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  flex: 1;
  padding: 16px;
`

const JobContentLayout = styled.div`

`

const JobTitleLayout = styled.div`
  font-weight: bold;
  font-size: 14px;
  padding-bottom: 16px;
  border-bottom: 2px solid ${COLOR_GRAY};
`

const JobItem = styled.div`
  padding: 16px 0;
  border-bottom: 2px solid ${COLOR_GRAY};

  a {
    text-decoration: none;
    color: ${COLOR_TEXT_PRIMARY};

    .title {
      font-weight: bold;
      font-size: 14px;
      margin-bottom: 0;
    }

    .enterprise {
      text-transform: uppercase;
      color: ${COLOR_TEXT_SECONDARY};
      font-size: 12px;
      margin-bottom: 0;
    }

    .description {
      margin-top: 8px;
      margin-bottom: 16px;
      font-size: 12px;
      color: black;
      max-height: 98px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .actions {
      font-size: 12px;
      color: ${COLOR_TEXT_SECONDARY};
      font-weight: 500;
      display: flex;
      justify-content: space-between;
    }
  }
`

const PanelCityJobs = ({ city, rome }) => {
  const {
    isLoading: isLoadingProfessions,
    onSearch: onSearchProfessions,
    onSearchInfosTravail,
    professions
  } = useProfessions()
  const {
    criterions
  } = useCities()
  const size = useWindowSize()
  const [infosTravail, setInfosTravail] = useState(null)

  useEffect(() => {
    if (city && rome && rome.length) {
      onSearchProfessions({ code_rome: rome, insee: [city.insee_com] })
      onSearchInfosTravail({ code_rome: rome[0], insee: city.insee_com }).then(setInfosTravail)
    }
  }, [city])

  let romeLabel = ''
  if (criterions && criterions.codeRomes && rome && rome.length) {
    const finded = criterions.codeRomes.find((c) => c.key === rome[0])
    if (finded) {
      romeLabel = finded.label.toLowerCase()

      if (professions.length) {
        romeLabel = romeLabel.replace(/e\)/g, 'es)')
      }
    }
  }

  return (
    <MainLayout isMobileView={isMobileView(size)}>
      {rome && (
        <>
          <StatistiqueLayout>
            <StatistiqueTitleLayout>
              Statistique pour
              {' '}
              {romeLabel}
              {' '}
              à
              {' '}
              {city.nom_comm}
            </StatistiqueTitleLayout>
            <StatistiqueItem>
              <img src="/icons/euro.svg" alt="euro" />
              <p>Salaire brut</p>
              {infosTravail && infosTravail.min ? (
                <p>
                  {infosTravail.min}
                  € à
                  {' '}
                  {infosTravail.max}
                  €
                </p>
              ) : (<p>A venir</p>)}
            </StatistiqueItem>

          </StatistiqueLayout>
          <JobLayout>
            <JobTitleLayout>
              {professions.length}
              {' '}
              offre
              {professions.length > 1 ? 's' : ''}
              {' pour '}
              {romeLabel}
              {' '}
              dans un rayon de 30 km
            </JobTitleLayout>
            <JobContentLayout>
              {isLoadingProfessions && <p>Chargement des métiers</p>}
              {professions.filter((p) => p && p.id).map((p) => (
                <JobItem key={p.id}>
                  <a href={p.origineOffre.urlOrigine} target="_blank" rel="noreferrer">
                    <p className="title">{p.appellationlibelle}</p>
                    {p.entreprise && p.entreprise.nom && (<p className="enterprise">{p.entreprise.nom}</p>)}
                    <p className="description">{p.description}</p>
                    <div className="actions">
                      <p className="date">{thereAre(p.dateCreation)}</p>
                      <p className="type">
                        {p.typeContrat}
                        {' '}
                        -
                        {' '}
                        {p.dureeTravailLibelleConverti}
                      </p>
                    </div>
                  </a>
                </JobItem>
              ))}
            </JobContentLayout>
          </JobLayout>
        </>
      )}
    </MainLayout>
  )
}

PanelCityJobs.propTypes = {
  city: PropTypes.object.isRequired,
  rome: PropTypes.array.isRequired
}

PanelCityJobs.defaultProps = {
}

export default PanelCityJobs
