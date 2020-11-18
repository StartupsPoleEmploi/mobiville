import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { MainLayout } from '../../components/main-layout'

const HomePage = () => {
  const [onSearch, setOnSearch] = useState(null)

  const testSearch = () => {
    setOnSearch({ code_rome: ['A1407'], code_region: ['53'], code_criterion: ['big-city'] })
  }

  if (onSearch) {
    const params = []
    Object.entries(onSearch).forEach(([key, value]) => {
      params.push(`${key}:${value.join(',')}`)
    })

    return <Redirect to={`/cities?${params.join(';')}`} />
  }

  return (
    <MainLayout>
      <p>Home</p>
      <Button color="primary" onClick={testSearch}>Lancer un test de recherche</Button>
    </MainLayout>
  )
}

export default HomePage
