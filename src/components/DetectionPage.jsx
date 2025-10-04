import { useState, useEffect } from 'react'
import { useSession } from '../contexts/SessionContext'
import './DetectionPage.css'

function DetectionPage() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const { detectionData, saveDetectionData, clearDetectionData } = useSession()

  // Load saved data when component mounts
  useEffect(() => {
    if (detectionData) {
      setResult(detectionData.result)
      setSelectedFile(detectionData.selectedFile)
      setPreviewUrl(detectionData.previewUrl)
    }
  }, [detectionData])

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      setResult(null)
      setError(null)
    }
  }

  const handlePredict = async () => {
    if (!selectedFile) {
      setError('Please select an image first')
      return
    }

    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append('image', selectedFile)

    try {
      const response = await fetch('http://127.0.0.1:8000/api/detect_damage', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to get detection results')
      }

      const data = await response.json()
      setResult(data)
      
      // Save data to context for persistence across page changes
      saveDetectionData({
        result: data,
        selectedFile,
        previewUrl
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return '#10b981' // green
    if (confidence >= 60) return '#f59e0b' // yellow
    return '#ef4444' // red
  }

  const getConditionColor = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'excellent':
        return '#10b981'
      case 'good':
        return '#22c55e'
      case 'fair':
        return '#f59e0b'
      case 'poor':
        return '#f97316'
      case 'very poor':
        return '#ef4444'
      default:
        return '#6b7280'
    }
  }

  const getPredictionIcon = (prediction) => {
    switch (prediction?.toLowerCase()) {
      case 'crack':
        return '🔧'
      case 'pothole':
        return '🕳️'
      case 'surface erosion':
        return '🌊'
      default:
        return '🚧'
    }
  }

  const handleNewUpload = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setResult(null)
    setError(null)
    clearDetectionData()
  }

  return (
    <div className="detection-page">
      <div className="container">
        <div className="page-header">
          <h2>Road Damage Detection</h2>
          <p>Upload an image to detect and analyze road damage comprehensively</p>
        </div>

        <div className="upload-section">
          <div className="upload-area">
            <input
              type="file"
              id="file-upload"
              accept="image/*"
              onChange={handleFileSelect}
              className="file-input"
            />
            <label htmlFor="file-upload" className="upload-label">
              {previewUrl ? (
                <div className="image-preview">
                  <img src={previewUrl} alt="Preview" />
                  <div className="overlay">
                    <span>Click to change image</span>
                  </div>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <div className="upload-icon">📁</div>
                  <p>Click to upload image</p>
                  <span>Supports: JPG, PNG, GIF</span>
                </div>
              )}
            </label>
          </div>

          <div className="button-group">
            <button
              onClick={handlePredict}
              disabled={!selectedFile || loading}
              className="predict-button"
            >
              {loading ? 'Analyzing...' : 'Detect Damage'}
            </button>
            
            {result && (
              <button
                onClick={handleNewUpload}
                className="new-upload-button"
                title="Start a new detection"
              >
                <span className="button-icon">🔄</span>
                New Upload
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {result && (
          <div className="result-section">
            <h3>Detection Results</h3>
            
            {/* Images First */}
            <div className="images-section">
              <h4>Analysis Images</h4>
              <div className="images-grid">
                {result.image_original && (
                  <div className="image-card">
                    <h5>Original Image</h5>
                    <a 
                      href={`http://127.0.0.1:8000${result.image_original}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="image-link"
                    >
                      <img 
                        src={`http://127.0.0.1:8000${result.image_original}`} 
                        alt="Original" 
                        className="result-image"
                      />
                    </a>
                  </div>
                )}
                {result.image_detected && (
                  <div className="image-card">
                    <h5>Detection Results</h5>
                    <a 
                      href={`http://127.0.0.1:8000${result.image_detected}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="image-link"
                    >
                      <img 
                        src={`http://127.0.0.1:8000${result.image_detected}`} 
                        alt="Detection Results" 
                        className="result-image"
                      />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Prediction Results */}
            <div className="result-card">
              <h4>Classification</h4>
              <div className="prediction-result">
                <div className="prediction-info">
                  <span className="prediction-icon">
                    {getPredictionIcon(result.prediction?.class)}
                  </span>
                  <div>
                    <h5>{result.prediction?.class}</h5>
                    <p className="confidence-label">Confidence</p>
                  </div>
                </div>
                <div className="confidence-bar">
                  <div className="confidence-fill" style={{
                    width: `${result.prediction?.confidence}%`,
                    backgroundColor: getConfidenceColor(result.prediction?.confidence)
                  }}></div>
                  <span className="confidence-text">{result.prediction?.confidence?.toFixed(1)}%</span>
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Lighting Condition:</span>
                <span className="detail-value">{result.prediction?.lighting}</span>
              </div>
            </div>

            {/* Road Damage Analysis */}
            <div className="result-card">
              <h4>Road Condition Assessment</h4>
              <div className="condition-overview">
                <div className="condition-badge" style={{
                  backgroundColor: getConditionColor(result.road_damage?.condition)
                }}>
                  {result.road_damage?.condition}
                </div>
                <div className="condition-score">
                  <span className="score-label">Condition Score:</span>
                  <span className="score-value">{result.road_damage?.score}/100</span>
                </div>
              </div>
              
              <div className="explanation">
                <h5>Assessment Summary</h5>
                <p>{result.road_damage?.explanation}</p>
              </div>

              <div className="damage-summary">
                <h5>Damage Breakdown</h5>
                <div className="damage-stats">
                  <div className="stat-item">
                    <span className="stat-icon">🕳️</span>
                    <span className="stat-label">Potholes:</span>
                    <span className="stat-value">{result.road_damage?.damage_summary?.potholes || 0}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">🔧</span>
                    <span className="stat-label">Cracks:</span>
                    <span className="stat-value">{result.road_damage?.damage_summary?.cracks || 0}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">🌊</span>
                    <span className="stat-label">Surface Erosion:</span>
                    <span className="stat-value">{result.road_damage?.damage_summary?.surface_erosion || 0}</span>
                  </div>
                </div>
              </div>

              {result.road_damage?.report && (
                <div className="report-section">
                  <h5>Professional Report</h5>
                  <div className="report-content">
                    {result.road_damage.report}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DetectionPage
