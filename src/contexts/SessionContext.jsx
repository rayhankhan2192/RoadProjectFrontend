import { createContext, useContext, useState } from 'react'

const SessionContext = createContext()

export const useSession = () => {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider')
  }
  return context
}

export const SessionProvider = ({ children }) => {
  const [classificationData, setClassificationData] = useState(null)
  const [detectionData, setDetectionData] = useState(null)

  const saveClassificationData = (data) => {
    setClassificationData(data)
  }

  const saveDetectionData = (data) => {
    setDetectionData(data)
  }

  const clearClassificationData = () => {
    setClassificationData(null)
  }

  const clearDetectionData = () => {
    setDetectionData(null)
  }

  const value = {
    classificationData,
    detectionData,
    saveClassificationData,
    saveDetectionData,
    clearClassificationData,
    clearDetectionData
  }

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  )
}
