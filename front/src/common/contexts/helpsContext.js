/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react'
import { apiLoadHelpPreviews, apiLoadHelpPreviewId } from '../../api/helps.api'

const HelpsContext = React.createContext()

export function HelpsProvider(props) {
  const [previews, _setPreviews] = useState([])
  const [help, _setHelp] = useState(null)
  const [isLoading, _setIsLoading] = useState(false)

  const onLoadPreviews = useCallback(() => {
    if (previews.length === 0) {
      _setIsLoading(true)
      apiLoadHelpPreviews().then(_setPreviews)
        .then(() => _setIsLoading(false))
    }
  }, [])

  const onLoadPreviewId = useCallback((id) => {
    _setIsLoading(true)
    apiLoadHelpPreviewId(id).then(_setHelp)
      .then(() => _setIsLoading(false))
  }, [])

  return (
    <HelpsContext.Provider
      {...props}
      value={{
        previews,
        help,
        isLoading,
        // function
        onLoadPreviews,
        onLoadPreviewId
      }}
    />
  )
}

export const useHelps = () => {
  const context = React.useContext(HelpsContext)
  if (!context) throw new Error('useHelps must be used in CitiesProvider')

  return context
}
