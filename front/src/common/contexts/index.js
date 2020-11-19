import React from 'react'
import { CitiesProvider } from './citiesContext'
import { ProfessionsProvider } from './professionsContext'

export default function Providers(props) {
  return (
    <ProfessionsProvider>
      <CitiesProvider {...props} />
    </ProfessionsProvider>
  )
}
