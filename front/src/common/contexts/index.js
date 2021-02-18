import React from 'react'
import { CitiesProvider } from './citiesContext'
import { HelpsProvider } from './helpsContext'
import { ProfessionsProvider } from './professionsContext'

export default function Providers(props) {
  return (
    <HelpsProvider>
      <ProfessionsProvider>
        <CitiesProvider {...props} />
      </ProfessionsProvider>
    </HelpsProvider>
  )
}
