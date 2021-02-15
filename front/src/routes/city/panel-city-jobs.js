import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useProfessions } from '../../common/contexts/professionsContext'
import { COLOR_GRAY, COLOR_TEXT_PRIMARY } from '../../constants/colors'
import { COLOR_TEXT_SECONDARY } from '../../contants/colors'
import { useCities } from '../../common/contexts/citiesContext'
import { thereAre } from '../../utils/utils'

const MainLayout = styled.div`

`

const JobLayout = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  margin: auto;
  width: 95%;
  max-width: 600px;
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
    professions
  } = useProfessions()
  const {
    criterions
  } = useCities()

  useEffect(() => {
    if (city && rome) {
      onSearchProfessions({ code_rome: rome, insee: [city.insee_com] })
    }
  }, [city])

  let romeLabel = ''
  if (criterions && criterions.codeRomes) {
    const finded = criterions.codeRomes.find((c) => c.key === rome[0])
    if (finded) {
      romeLabel = `pour ${finded.label.toLowerCase()}`
    }
  }

  return (
    <MainLayout>
      {rome && (
      <JobLayout>
        <JobTitleLayout>
          {professions.length}
          {' '}
          offre
          {professions.length > 1 ? 's' : ''}
          {' '}
          {romeLabel}
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
                  <p className="date">{thereAre(p.dateActualisation)}</p>
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
