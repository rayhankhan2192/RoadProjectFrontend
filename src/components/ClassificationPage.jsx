import { useState, useEffect } from 'react'
import { useSession } from '../contexts/SessionContext'
import './ClassificationPage.css'

function ClassificationPage() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const { classificationData, saveClassificationData, clearClassificationData } = useSession()

  // Load saved data when component mounts
  useEffect(() => {
    if (classificationData) {
      setResult(classificationData.result)
      setSelectedFile(classificationData.selectedFile)
      setPreviewUrl(classificationData.previewUrl)
    }
  }, [classificationData])

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
      const response = await fetch('http://127.0.0.1:8000/api/predict-classification', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to get prediction')
      }

      const data = await response.json()
      setResult(data)
      
      // Save data to context for persistence across page changes
      saveClassificationData({
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
    clearClassificationData()
  }

  return (
    <div className="classification-page">
      <div className="container">
        <div className="page-header">
          <h2>Road Damage Classification</h2>
          <p>Upload an image to classify the type of road damage</p>
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
              {loading ? 'Analyzing...' : 'Predict Damage'}
            </button>
            
            {result && (
              <button
                onClick={handleNewUpload}
                className="new-upload-button"
                title="Start a new classification"
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
            <h3>Classification Results</h3>
            <div className="result-card">
              <div className="result-header">
                <div className="prediction-info">
                  <span className="prediction-icon">
                    {getPredictionIcon(result.prediction)}
                  </span>
                  <div>
                    <h4>{result.prediction}</h4>
                    <p className="confidence-label">Confidence</p>
                  </div>
                </div>
                <div className="confidence-bar">
                  <div className="confidence-fill" style={{
                    width: `${result.confidence}%`,
                    backgroundColor: getConfidenceColor(result.confidence)
                  }}></div>
                  <span className="confidence-text">{result.confidence.toFixed(1)}%</span>
                </div>
              </div>

              <div className="result-details">
                <div className="detail-item">
                  <span className="detail-label">Lighting Condition:</span>
                  <span className="detail-value">{result.lighting}</span>
                </div>
                {result.image_url && (
                  <div className="detail-item">
                    <span className="detail-label">Processed Image:</span>
                    <a 
                      href={`http://127.0.0.1:8000${result.image_url}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="image-link"
                    >
                      View Image
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ClassificationPage
