import { useState, useEffect } from 'react'
import { useSession } from '../contexts/SessionContext'
import { API_ENDPOINTS, API_CONFIG, apiCall } from '../config/api'

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
      const data = await apiCall(API_ENDPOINTS.CLASSIFICATION, {
        method: 'POST',
        body: formData,
      })

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
    if (confidence >= 80) return '#10b981'
    if (confidence >= 60) return '#f59e0b'
    return '#ef4444'
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
    <div style={{ minHeight: '100vh', padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div className="fade-in" style={{ 
          textAlign: 'center', 
          marginBottom: '20px',
          position: 'relative'
        }}>
          <div style={{
            position: 'relative',
            display: 'inline-block',
            marginBottom: '16px'
          }}>
            <h2 className="gradient-text" style={{
              fontSize: '40px',
              fontWeight: '900',
              marginBottom: '8px',
              margin: 0,
              letterSpacing: '-0.02em',
              textShadow: '0 4px 20px rgba(30, 64, 175, 0.3)'
            }}>
              AI Classification System
            </h2>
            <div style={{
              position: 'absolute',
              bottom: '-8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120px',
              height: '4px',
              background: 'linear-gradient(90deg, transparent, #1e40af, transparent)',
              borderRadius: '2px',
              animation: 'pulse 2s ease-in-out infinite'
            }}></div>
          </div>
          <p style={{
            fontSize: '18px',
            color: '#a1a1aa',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.5',
            fontWeight: '400',
            letterSpacing: '0.01em'
          }}>
            Upload an image to classify road damage types using advanced artificial intelligence.
            Get instant, accurate predictions with confidence scores.
          </p>
        </div>

        {/* Upload Section */}
        <div className="card card-large slide-up" style={{ 
          marginBottom: '20px',
          position: 'relative',
          overflow: 'hidden',
          flex: 1
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #1e40af, #7c3aed, #0891b2)',
            borderRadius: '20px 20px 0 0'
          }}></div>
          
          <div style={{
            padding: '8px 0 16px 0',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '20px'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: 'white',
              margin: 0,
              textAlign: 'center',
              letterSpacing: '-0.01em'
            }}>
              Upload Road Image
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#a1a1aa',
              margin: '4px 0 0 0',
              textAlign: 'center'
            }}>
              Select an image to begin AI-powered classification
            </p>
          </div>

          <div className="upload-area">
            <input
              type="file"
              id="file-upload"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
            <label htmlFor="file-upload" style={{ display: 'block', cursor: 'pointer' }}>
              {previewUrl ? (
                <div className="image-preview" style={{ position: 'relative' }}>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                  <div className="image-overlay" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(139, 92, 246, 0.8))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }}>
                    <span style={{ color: 'white', fontWeight: '600', fontSize: '20px' }}>
                      Click to change image
                    </span>
                  </div>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <div style={{
                    position: 'relative',
                    marginBottom: '24px'
                  }}>
                    <div className="upload-icon" style={{
                      fontSize: '5rem',
                      marginBottom: '16px',
                      position: 'relative'
                    }}>📁</div>
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '80px',
                      height: '80px',
                      border: '2px dashed rgba(30, 64, 175, 0.3)',
                      borderRadius: '50%',
                      animation: 'pulse 2s ease-in-out infinite'
                    }}></div>
                  </div>
                  <h3 style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    color: 'white',
                    marginBottom: '16px',
                    margin: 0,
                    letterSpacing: '-0.01em'
                  }}>
                    Upload Road Image
                  </h3>
                  <p style={{
                    color: '#a1a1aa',
                    marginBottom: '24px',
                    margin: 0,
                    fontSize: '18px',
                    lineHeight: '1.5'
                  }}>
                    Drag & drop your image here or click to browse
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '24px',
                    fontSize: '16px',
                    color: '#71717a',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      background: 'rgba(30, 64, 175, 0.1)',
                      borderRadius: '12px',
                      border: '1px solid rgba(30, 64, 175, 0.2)'
                    }}>
                      <span>📷</span>
                      <span>JPG</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      background: 'rgba(124, 58, 237, 0.1)',
                      borderRadius: '12px',
                      border: '1px solid rgba(124, 58, 237, 0.2)'
                    }}>
                      <span>🖼️</span>
                      <span>PNG</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      background: 'rgba(8, 145, 178, 0.1)',
                      borderRadius: '12px',
                      border: '1px solid rgba(8, 145, 178, 0.2)'
                    }}>
                      <span>🎞️</span>
                      <span>GIF</span>
                    </div>
                  </div>
                </div>
              )}
            </label>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '12px',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20px',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={handlePredict}
              disabled={!selectedFile || loading}
              className={`btn btn-primary ${(!selectedFile || loading) ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{
                opacity: (!selectedFile || loading) ? 0.5 : 1,
                cursor: (!selectedFile || loading) ? 'not-allowed' : 'pointer',
                minWidth: '160px',
                height: '40px',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <span>🔍</span>
                  Analyze Damage
                </>
              )}
            </button>

            {result && (
              <>
                <button
                  onClick={handleNewUpload}
                  className="btn btn-secondary"
                  title="Start a new classification"
                  style={{
                    minWidth: '140px',
                    height: '40px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                >
                  <span>🔄</span>
                  New Analysis
                </button>
                <button
                  onClick={() => window.open('/detection', '_blank')}
                  className="btn btn-primary"
                  title="Go to Detection Page"
                  style={{
                    minWidth: '140px',
                    height: '40px',
                    fontSize: '14px',
                    fontWeight: '600',
                    background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                    boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)'
                  }}
                >
                  <span>📊</span>
                  Detection
                </button>
              </>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="card slide-up" style={{
            marginBottom: '20px',
            borderLeft: '4px solid #ef4444',
            background: 'rgba(239, 68, 68, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>⚠️</span>
              <div>
                <h4 style={{
                  fontWeight: '600',
                  color: '#f87171',
                  margin: 0,
                  marginBottom: '4px'
                }}>
                  Analysis Failed
                </h4>
                <p style={{ color: '#fca5a5', margin: 0 }}>{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
            <div style={{ textAlign: 'center' }}>
              <h3 className="gradient-text" style={{
                fontSize: '28px',
                fontWeight: 'bold',
                marginBottom: '8px',
                margin: 0
              }}>
                Classification Results
              </h3>
              <p style={{ color: '#71717a', margin: 0 }}>AI-powered damage analysis completed</p>
            </div>

            {/* Main Result Card */}
            <div className="card card-large" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}>
                  <div style={{ fontSize: '48px' }}>
                    {getPredictionIcon(result.prediction)}
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <h4 style={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: 'white',
                      marginBottom: '4px',
                      margin: 0
                    }}>
                      {result.prediction}
                    </h4>
                    <p style={{
                      color: '#71717a',
                      fontSize: '16px',
                      margin: 0
                    }}>
                      Damage Type Detected
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div className="confidence-bar" style={{ marginBottom: '8px' }}>
                    <div
                      className="confidence-fill"
                      style={{
                        width: `${result.confidence}%`,
                        backgroundColor: getConfidenceColor(result.confidence)
                      }}
                    ></div>
                  </div>
                  <span style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: 'white'
                  }}>
                    {result.confidence.toFixed(1)}%
                  </span>
                  <p style={{
                    color: '#71717a',
                    fontSize: '14px',
                    margin: 0
                  }}>
                    Confidence Score
                  </p>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '16px'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <span style={{
                      fontWeight: '600',
                      color: '#a1a1aa'
                    }}>
                      Lighting Condition:
                    </span>
                    <span style={{
                      color: 'white',
                      fontWeight: '500'
                    }}>
                      {result.lighting}
                    </span>
                  </div>

                  {result.image_url && (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 0'
                    }}>
                      <span style={{
                        fontWeight: '600',
                        color: '#a1a1aa'
                      }}>
                        Processed Image:
                      </span>
                      <a
                        href={`${API_CONFIG.BASE_URL}${result.image_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                        style={{ fontSize: '12px', padding: '6px 12px' }}
                      >
                        <span>👁️</span>
                        View Image
                      </a>
                    </div>
                  )}
                </div>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  padding: '12px'
                }}>
                  <h5 style={{
                    fontWeight: '600',
                    color: 'white',
                    marginBottom: '8px',
                    margin: 0
                  }}>
                    Analysis Summary
                  </h5>
                  <p style={{
                    color: '#a1a1aa',
                    fontSize: '13px',
                    lineHeight: '1.5',
                    margin: 0
                  }}>
                    The AI has successfully identified this as a <strong>{result.prediction}</strong> with
                    <strong> {result.confidence.toFixed(1)}%</strong> confidence. The analysis was performed
                    under <strong>{result.lighting}</strong> lighting conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ClassificationPage
