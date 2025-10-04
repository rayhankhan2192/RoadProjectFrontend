import { useState, useEffect } from 'react'
import { useSession } from '../contexts/SessionContext'
import { API_ENDPOINTS, API_CONFIG, apiCall } from '../config/api'

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
      const data = await apiCall(API_ENDPOINTS.DETECTION, {
        method: 'POST',
        body: formData,
      })

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
    clearDetectionData()
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
              AI Detection System
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
            Comprehensive road damage analysis with AI-powered detection, classification,
            and professional assessment reports for municipal planning.
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
              Select an image to begin AI-powered damage detection
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
                      transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      filter: 'brightness(0.9) contrast(1.1)'
                    }}
                  />
                  <div className="image-overlay" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.9), rgba(124, 58, 237, 0.9))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.4s ease',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <div style={{
                      textAlign: 'center',
                      color: 'white'
                    }}>
                      <div style={{
                        fontSize: '32px',
                        marginBottom: '12px'
                      }}>🔄</div>
                      <div style={{
                        fontWeight: '600',
                        fontSize: '18px',
                        marginBottom: '4px'
                      }}>
                        Click to change image
                      </div>
                      <div style={{
                        fontSize: '14px',
                        opacity: 0.8
                      }}>
                        Upload a different image
                      </div>
                    </div>
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
                  Detect Damage
                </>
              )}
            </button>

            {result && (
              <>
                <button
                  onClick={handleNewUpload}
                  className="btn btn-secondary"
                  title="Start a new detection"
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
                  onClick={() => window.open('/', '_blank')}
                  className="btn btn-primary"
                  title="Go to Classification Page"
                  style={{
                    minWidth: '140px',
                    height: '40px',
                    fontSize: '14px',
                    fontWeight: '600',
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)'
                  }}
                >
                  <span>🔍</span>
                  Classification
                </button>
              </>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="card slide-up" style={{
            marginBottom: '32px',
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
          <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ textAlign: 'center' }}>
              <h3 className="gradient-text" style={{
                fontSize: '36px',
                fontWeight: 'bold',
                marginBottom: '16px',
                margin: 0
              }}>
                Detection Results
              </h3>
              <p style={{ color: '#71717a', margin: 0 }}>Comprehensive AI analysis completed</p>
            </div>

            {/* Images Section */}
            <div className="card card-large" style={{
              position: 'relative',
              overflow: 'hidden'
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
                padding: '24px 0 32px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                marginBottom: '40px',
                textAlign: 'center'
              }}>
                <h4 className="gradient-text" style={{
                  fontSize: '28px',
                  fontWeight: '800',
                  marginBottom: '12px',
                  margin: 0,
                  letterSpacing: '-0.01em',
                  textShadow: '0 2px 10px rgba(30, 64, 175, 0.3)'
                }}>
                  Analysis Images
                </h4>
                <p style={{
                  fontSize: '16px',
                  color: '#a1a1aa',
                  margin: 0
                }}>
                  Original image and AI-detected damage visualization
                </p>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '32px'
              }}>
                {result.image_original && (
                  <div className="card" style={{ 
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: 'linear-gradient(90deg, #1e40af, #7c3aed)',
                      borderRadius: '12px 12px 0 0'
                    }}></div>
                    
                    <div style={{
                      padding: '20px 0 16px 0',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      marginBottom: '20px'
                    }}>
                      <h5 style={{
                        fontSize: '22px',
                        fontWeight: '700',
                        color: 'white',
                        marginBottom: '8px',
                        margin: 0,
                        letterSpacing: '-0.01em'
                      }}>
                        Original Image
                      </h5>
                      <p style={{
                        fontSize: '14px',
                        color: '#a1a1aa',
                        margin: 0
                      }}>
                        Source road image
                      </p>
                    </div>
                    
                    <a
                      href={`${API_CONFIG.BASE_URL}${result.image_original}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'block', position: 'relative' }}
                    >
                      <img
                        src={`${API_CONFIG.BASE_URL}${result.image_original}`}
                        alt="Original"
                        style={{
                          width: '100%',
                          height: '320px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
                          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          filter: 'brightness(0.95) contrast(1.05)'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'scale(1.08)'
                          e.target.style.filter = 'brightness(1) contrast(1.1)'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'scale(1)'
                          e.target.style.filter = 'brightness(0.95) contrast(1.05)'
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                      }}>
                        📷 Original
                      </div>
                    </a>
                  </div>
                )}
                {result.image_detected && (
                  <div className="card" style={{ 
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: 'linear-gradient(90deg, #7c3aed, #0891b2)',
                      borderRadius: '12px 12px 0 0'
                    }}></div>
                    
                    <div style={{
                      padding: '20px 0 16px 0',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      marginBottom: '20px'
                    }}>
                      <h5 style={{
                        fontSize: '22px',
                        fontWeight: '700',
                        color: 'white',
                        marginBottom: '8px',
                        margin: 0,
                        letterSpacing: '-0.01em'
                      }}>
                        Detection Results
                      </h5>
                      <p style={{
                        fontSize: '14px',
                        color: '#a1a1aa',
                        margin: 0
                      }}>
                        AI-detected damage areas
                      </p>
                    </div>
                    
                    <a
                      href={`${API_CONFIG.BASE_URL}${result.image_detected}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'block', position: 'relative' }}
                    >
                      <img
                        src={`${API_CONFIG.BASE_URL}${result.image_detected}`}
                        alt="Detection Results"
                        style={{
                          width: '100%',
                          height: '320px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
                          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          filter: 'brightness(0.95) contrast(1.05)'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'scale(1.08)'
                          e.target.style.filter = 'brightness(1) contrast(1.1)'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'scale(1)'
                          e.target.style.filter = 'brightness(0.95) contrast(1.05)'
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                      }}>
                        🔍 AI Detection
                      </div>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Classification Results */}
            <div className="card card-large" style={{
              position: 'relative',
              overflow: 'hidden'
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
                padding: '24px 0 32px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                marginBottom: '40px',
                textAlign: 'center'
              }}>
                <h4 className="gradient-text" style={{
                  fontSize: '28px',
                  fontWeight: '800',
                  marginBottom: '12px',
                  margin: 0,
                  letterSpacing: '-0.01em',
                  textShadow: '0 2px 10px rgba(30, 64, 175, 0.3)'
                }}>
                  AI Classification
                </h4>
                <p style={{
                  fontSize: '16px',
                  color: '#a1a1aa',
                  margin: 0
                }}>
                  Intelligent damage type identification and confidence scoring
                </p>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '24px',
                marginBottom: '32px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}>
                  <div style={{ fontSize: '48px' }}>
                    {getPredictionIcon(result.prediction?.class)}
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <h5 style={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: 'white',
                      marginBottom: '8px',
                      margin: 0
                    }}>
                      {result.prediction?.class}
                    </h5>
                    <p style={{
                      color: '#71717a',
                      margin: 0
                    }}>
                      Damage Type
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div className="confidence-bar" style={{ marginBottom: '8px' }}>
                    <div
                      className="confidence-fill"
                      style={{
                        width: `${result.prediction?.confidence}%`,
                        backgroundColor: getConfidenceColor(result.prediction?.confidence)
                      }}
                    ></div>
                  </div>
                  <span style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: 'white'
                  }}>
                    {result.prediction?.confidence?.toFixed(1)}%
                  </span>
                  <p style={{
                    color: '#71717a',
                    fontSize: '14px',
                    margin: 0
                  }}>
                    Confidence
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <span style={{
                  fontWeight: '600',
                  color: '#a1a1aa'
                }}>
                  Lighting Condition:
                </span>
                <span style={{ color: 'white' }}>{result.prediction?.lighting}</span>
              </div>
            </div>

            {/* Road Damage Analysis */}
            <div className="card card-large" style={{
              position: 'relative',
              overflow: 'hidden'
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
                padding: '24px 0 32px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                marginBottom: '40px',
                textAlign: 'center'
              }}>
                <h4 className="gradient-text" style={{
                  fontSize: '28px',
                  fontWeight: '800',
                  marginBottom: '12px',
                  margin: 0,
                  letterSpacing: '-0.01em',
                  textShadow: '0 2px 10px rgba(30, 64, 175, 0.3)'
                }}>
                  Road Condition Assessment
                </h4>
                <p style={{
                  fontSize: '16px',
                  color: '#a1a1aa',
                  margin: 0
                }}>
                  Comprehensive damage analysis and professional assessment
                </p>
              </div>

              {/* Condition Overview */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                marginBottom: '32px',
                padding: '24px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  flexWrap: 'wrap'
                }}>
                  <div
                    className={`status-badge ${
                      result.road_damage?.condition?.toLowerCase().replace(' ', '-') === 'excellent' ? 'status-excellent' :
                      result.road_damage?.condition?.toLowerCase().replace(' ', '-') === 'good' ? 'status-good' :
                      result.road_damage?.condition?.toLowerCase().replace(' ', '-') === 'fair' ? 'status-fair' :
                      result.road_damage?.condition?.toLowerCase().replace(' ', '-') === 'poor' ? 'status-poor' :
                      'status-very-poor'
                    }`}
                  >
                    {result.road_damage?.condition}
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '14px',
                    color: '#71717a',
                    marginBottom: '4px'
                  }}>
                    Condition Score
                  </div>
                  <div style={{
                    fontSize: '36px',
                    fontWeight: 'bold',
                    color: 'white'
                  }}>
                    {result.road_damage?.score}/100
                  </div>
                </div>
              </div>

              {/* Assessment Summary */}
              <div style={{ marginBottom: '32px' }}>
                <h5 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: 'white',
                  marginBottom: '16px',
                  margin: 0
                }}>
                  Assessment Summary
                </h5>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '24px',
                  borderRadius: '12px',
                  borderLeft: '4px solid #3b82f6'
                }}>
                  <p style={{
                    color: '#a1a1aa',
                    lineHeight: '1.6',
                    fontSize: '16px',
                    margin: 0
                  }}>
                    {result.road_damage?.explanation}
                  </p>
                </div>
              </div>

              {/* Damage Statistics */}
              <div style={{ marginBottom: '32px' }}>
                <h5 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: 'white',
                  marginBottom: '24px',
                  margin: 0
                }}>
                  Damage Statistics
                </h5>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-icon">🕳️</span>
                    <div className="stat-content">
                      <div className="stat-label">Potholes Detected</div>
                      <div className="stat-value">{result.road_damage?.damage_summary?.potholes || 0}</div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">🔧</span>
                    <div className="stat-content">
                      <div className="stat-label">Cracks Found</div>
                      <div className="stat-value">{result.road_damage?.damage_summary?.cracks || 0}</div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">🌊</span>
                    <div className="stat-content">
                      <div className="stat-label">Surface Erosion</div>
                      <div className="stat-value">{result.road_damage?.damage_summary?.surface_erosion || 0}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Report */}
              {result.road_damage?.report && (
                <div style={{
                  paddingTop: '32px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <h5 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: 'white',
                    marginBottom: '24px',
                    margin: 0
                  }}>
                    Professional Assessment Report
                  </h5>
                  <div className="card" style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderLeft: '4px solid #3b82f6'
                  }}>
                    <div style={{
                      color: '#a1a1aa',
                      lineHeight: '1.6',
                      whiteSpace: 'pre-line',
                      fontSize: '16px',
                      margin: 0
                    }}>
                      {result.road_damage.report}
                    </div>
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
