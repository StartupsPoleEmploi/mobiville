import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCities } from '../../common/contexts/citiesContext'
import { MainLayout } from '../../components/main-layout'

const CityPage = () => {
  const { onLoadCity, isLoadingCity } = useCities()
  const { insee } = useParams()

  useEffect(() => {
    const extract = insee.split('-')
    if (extract && extract.length) {
      onLoadCity(extract[0])
    }
  }, [])

  return (
    <MainLayout>
      <p>Cities</p>
      {isLoadingCity && (<p>Loading...</p>)}
      {}
    </MainLayout>
  )
}

export default CityPage
