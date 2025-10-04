// API Configuration
const API_BASE_URL = 'http://127.0.0.1:8000'

export const API_ENDPOINTS = {
  CLASSIFICATION: `${API_BASE_URL}/api/predict-classification`,
  DETECTION: `${API_BASE_URL}/api/detect_damage`,
}

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  TIMEOUT: 30000, // 30 seconds
  HEADERS: {
    'Accept': 'application/json',
  }
}

// Helper function to make API calls
export const apiCall = async (endpoint, options = {}) => {
  const config = {
    ...API_CONFIG,
    ...options,
    headers: {
      ...API_CONFIG.HEADERS,
      ...options.headers,
    },
  }

  try {
    const response = await fetch(endpoint, config)
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API call error:', error)
    throw error
  }
}

export default {
  API_ENDPOINTS,
  API_CONFIG,
  apiCall,
}
