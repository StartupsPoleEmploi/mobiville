import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCities } from '../../common/contexts/citiesContext'
import { useProfessions } from '../../common/contexts/professionsContext'
import { MainLayout } from '../../components/main-layout'

const CityPage = () => {
  const { onLoadCity, isLoadingCity, city } = useCities()
  const {
    isLoading: isLoadingProfessions,
    onSearch: onSearchProfessions,
    professions
  } = useProfessions()
  const { insee } = useParams()

  useEffect(() => {
    const extract = insee.split('-')
    if (extract && extract.length) {
      onLoadCity(extract[0])
    }
  }, [])

  useEffect(() => {
    if (city) {
      onSearchProfessions({ code_rome: ['A1407'], insee: [city.insee_com] })
    }
  }, [city])

  return (
    <MainLayout>
      <p>Cities</p>
      {isLoadingCity && (<p>Loading...</p>)}
      {!isLoadingCity && !city && (<p>Non trouvée</p>)}
      {!isLoadingCity && city && (
        <>
          <ul>
            <li>
              code_arr:
              {city.code_arr}
            </li>
            <li>
              code_cant:
              {city.code_cant}
            </li>
            <li>
              code_comm:
              {city.code_comm}
            </li>
            <li>
              code_dept:
              {city.code_dept}
            </li>
            <li>
              code_reg:
              {city.code_reg}
            </li>
            <li>
              geo_point_2d_x:
              {city.geo_point_2d_x}
            </li>
            <li>
              geo_point_2d_y:
              {city.geo_point_2d_y}
            </li>
            <li>
              id:
              {city.id}
            </li>
            <li>
              id_geofla:
              {city.id_geofla}
            </li>
            <li>
              insee_com:
              {city.insee_com}
            </li>
            <li>
              nom_comm:
              {city.nom_comm}
            </li>
            <li>
              nom_dept:
              {city.nom_dept}
            </li>
            <li>
              nom_region:
              {city.nom_region}
            </li>
            <li>
              population:
              {city.population}
            </li>
            <li>
              postal_code:
              {city.postal_code}
            </li>
            <li>
              statut:
              {city.statut}
            </li>
            <li>
              superficie:
              {city.superficie}
            </li>
            <li>
              z_moyen:
              {city.z_moyen}
            </li>
          </ul>

          {isLoadingProfessions && <p>Loading jobs</p>}
          {!isLoadingProfessions && (
          <div>
            <h2>Jobs dans la ville (rayon de 10km autour de la ville)</h2>
            {professions.map((p) => (
              <div key={p.id}>
                <a href={p.origineOffre.urlOrigine} target="_blank" rel="noreferrer">
                  <ul>
                    {Object.entries(p).map(([key, value]) => (
                      <li key={key}>
                        {key}
                        {' '}
                        :
                        {' '}
                        {JSON.stringify(value)}
                      </li>
                    ))}
                  </ul>
                </a>
                <hr />
              </div>
            ))}
          </div>
          )}
        </>
      )}
    </MainLayout>
  )
}

export default CityPage
