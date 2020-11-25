import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useCities } from '../../common/contexts/citiesContext'
import { MainLayout } from '../../components/main-layout'
import { CODE_ROMES } from '../../contants/romes'

const HomePage = () => {
  const {
    register, handleSubmit
  } = useForm()
  const { criterions } = useCities()
  const [onSearch, setOnSearch] = useState(null)

  const onSubmit = (data) => {
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
  }

  if (!criterions) {
    return <p>Loading...</p>
  }

  if (onSearch) {
    const params = []
    Object.entries(onSearch).forEach(([key, value]) => {
      params.push(`${key}:${value.join(',')}`)
    })

    return <Redirect to={`/cities?${params.join(';')}`} />
  }

  const environmentVars = (criterions.criterions || []).filter((e) => e.tag === 'environment')
  const citiesVars = (criterions.criterions || []).filter((e) => e.tag === 'city')

  return (
    <MainLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        {environmentVars && environmentVars.length && (
        <div>
          <p>Environment</p>
          <select name="environment" ref={register}>
            <option value="">-- Pas de choix</option>
            {environmentVars.map((r) => <option key={r.key} value={r.key}>{r.label}</option>)}
          </select>
        </div>
        )}

        {citiesVars && citiesVars.length && (
        <div>
          <p>Ville</p>
          <select name="city" ref={register}>
            <option value="">-- Pas de choix</option>
            {citiesVars.map((r) => <option key={r.key} value={r.key}>{r.label}</option>)}
          </select>
        </div>
        )}

        {criterions.regions && (
        <div>
          <p>Regions</p>
          <select name="regions" ref={register}>
            <option value="">-- Pas de region</option>
            {criterions.regions.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
          </select>
        </div>
        )}
        <div>
          <input type="submit" value="Lancer un test de recherche" />
        </div>
      </form>
    </MainLayout>
  )
}

export default HomePage
