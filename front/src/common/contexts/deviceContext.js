import { createContext, useContext, useEffect, useState } from 'react'
import { useWindowSize } from '../hooks/window-size'

const DeviceContext = createContext({
  isMobile: false,
  windowSize: {
    width: undefined,
    height: undefined,
  }
})

const MOBILE_WIDTH = 900

export const DeviceProvider = ({ children }) => {
  const windowSize = useWindowSize()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile((windowSize.width || windowSize) <= MOBILE_WIDTH)
  }, [windowSize])

  return (
    <DeviceContext.Provider value={{ isMobile: isMobile, windowSize: windowSize }}>
      {children}
    </DeviceContext.Provider>
  )
}

export const useDevice = () => {
  const context = useContext(DeviceContext)
  if (!context) throw new Error('useDevice must be used in DeviceProvider')

  return context
}
