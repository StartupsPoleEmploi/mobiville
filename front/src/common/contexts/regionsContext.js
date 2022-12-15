import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchRegions } from '../../api/regions.api'

const RegionsContext = React.createContext()

export const RegionsProvider = (props) => {
  const [regions, setRegions] = useState([])
  const [DROM] = useState([
    {
      code: 1,
      name: 'Guadeloupe',
      slug: 'guadeloupe',
    },
    {
      code: 2,
      name: 'Martinique',
      slug: 'martinique',
    },
    {
      code: 3,
      name: 'Guyane',
      slug: 'guyane',
    },
    {
      code: 4,
      name: 'La Réunion',
      slug: 'la-reunion',
    },
    {
      code: 6,
      name: 'Mayotte',
      slug: 'mayotte',
    },
  ])

  useEffect(() => {
    if (regions?.length > 0) return
    fetchRegions().then((regions) => setRegions(regions))
  }, [])

  const regionsDROMIncluded = useMemo(
    () => [...regions, ...DROM],
    [regions, DROM]
  )

  const formatUrl = useCallback((region) => {
    if (!!DROM.find((drom) => drom.code === region.code)) {
        // todo: remplacer le region.code par le departement.code du département rattaché...
        return `/departement/${region.code}-${region.slug}`
    }
    return `/region/${region.code}-${region.slug}`
  }, [DROM])

  return (
    <RegionsContext.Provider
      {...props}
      value={{
        regions,
        regionsDROMIncluded,
        formatUrl
      }}
    />
  )
}

export const useRegions = () => {
  const context = React.useContext(RegionsContext)
  if (!context) throw new Error('useRegions must be used in RegionsProvider')

  return context
}
