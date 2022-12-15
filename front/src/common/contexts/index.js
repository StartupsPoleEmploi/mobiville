import React from 'react'
import { CitiesProvider } from './citiesContext'
import { NomPageProvider } from './NomPageContext'
import { HelpsProvider } from './helpsContext'
import { ProfessionsProvider } from './professionsContext'
import { RegionsProvider } from './regionsContext'

export default function Providers(props) {
  return (
    <NomPageProvider>
      <HelpsProvider>
        <RegionsProvider>
          <ProfessionsProvider>
            <CitiesProvider {...props} />
          </ProfessionsProvider>
        </RegionsProvider>
      </HelpsProvider>
    </NomPageProvider>
  )
}
