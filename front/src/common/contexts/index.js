import React from 'react'
import { DeviceProvider } from './deviceContext'
import { NomPageProvider } from './NomPageContext'
import { HelpsProvider } from './helpsContext'
import { RegionsProvider } from './regionsContext'
import { ProfessionsProvider } from './professionsContext'
import { CitiesProvider } from './citiesContext'

export { useDevice } from './deviceContext'
export { useNomPage } from './NomPageContext'
export { useHelps } from './helpsContext'
export { useRegions } from './regionsContext'
export { useProfessions } from './professionsContext'
export { useCities } from './citiesContext'

export default function Providers(props) {
  return (
    <DeviceProvider>
      <NomPageProvider>
        <HelpsProvider>
          <RegionsProvider>
            <ProfessionsProvider>
              <CitiesProvider {...props} />
            </ProfessionsProvider>
          </RegionsProvider>
        </HelpsProvider>
      </NomPageProvider>
    </DeviceProvider>
  )
}
