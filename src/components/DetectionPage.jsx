import { useState, useEffect } from 'react'
import { useSession } from '../contexts/SessionContext'
import { API_ENDPOINTS, API_CONFIG, apiCall } from '../config/api'

function DetectionPage() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [fullscreenImage, setFullscreenImage] = useState(null)

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

  const handleImageClick = (imageUrl, imageType) => {
    setFullscreenImage({ url: imageUrl, type: imageType })
  }

  const closeFullscreen = () => {
    setFullscreenImage(null)
  }

  return (
    <div className="crystal-dark" style={{ minHeight: '100vh', padding: '20px', display: 'flex', flexDirection: 'column' }}>
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
            <h2 style={{
              fontSize: '40px',
              fontWeight: '900',
              marginBottom: '8px',
              margin: 0,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              textShadow: '0 4px 20px rgba(255, 255, 255, 0.3)'
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
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
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
        <div className="card crystal-card crystal-glow card-large slide-up" style={{ 
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
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1))',
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
                        fontSize: '24px',
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
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
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
          <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{
                position: 'relative',
                display: 'inline-block',
                marginBottom: '20px'
              }}>
              <h3 style={{
                  fontSize: '36px',
                  fontWeight: '900',
                  marginBottom: '12px',
                  margin: 0,
                  letterSpacing: '-0.02em',
                  color: '#ffffff',
                  textShadow: '0 4px 20px rgba(255, 255, 255, 0.4)'
              }}>
                Detection Results
              </h3>
                <div style={{
                  position: 'absolute',
                  bottom: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '140px',
                  height: '4px',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1), transparent)',
                  borderRadius: '2px',
                  animation: 'pulse 2s ease-in-out infinite'
                }}></div>
              </div>
              <p style={{ 
                color: '#a1a1aa', 
                margin: 0, 
                fontSize: '20px',
                fontWeight: '400',
                letterSpacing: '0.01em'
              }}>
                Comprehensive AI analysis completed with professional assessment
              </p>
            </div>

            {/* Images Section */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '20px',
              marginBottom: '24px'
            }}>
                {result.image_original && (
                  <div className="card crystal-card crystal-glow" style={{ 
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'rgba(0, 0, 0, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 12px 40px rgba(0, 0, 0, 0.6)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    borderRadius: '24px',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
                    e.currentTarget.style.boxShadow = '0 30px 80px rgba(0, 0, 0, 0.9), 0 20px 60px rgba(0, 0, 0, 0.7)'
                    // Show hover message
                    const hoverMessage = e.currentTarget.querySelector('.card-hover-message')
                    if (hoverMessage) {
                      hoverMessage.style.opacity = '1'
                      hoverMessage.style.transform = 'translateY(0)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)'
                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.8), 0 12px 40px rgba(0, 0, 0, 0.6)'
                    // Hide hover message
                    const hoverMessage = e.currentTarget.querySelector('.card-hover-message')
                    if (hoverMessage) {
                      hoverMessage.style.opacity = '0'
                      hoverMessage.style.transform = 'translateY(20px)'
                    }
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                      borderRadius: '12px 12px 0 0'
                    }}></div>
                    
                    <div style={{
                      padding: '0px 0 0px 0',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      marginBottom: '24px',
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '120px',
                        height: '120px',
                        background: 'radial-gradient(circle, rgba(30, 64, 175, 0.1) 0%, transparent 70%)',
                        borderRadius: '50%',
                        filter: 'blur(20px)',
                        zIndex: -1
                      }}></div>
                      <h5 style={{
                        fontSize: '24px',
                        fontWeight: '800',
                        color: 'white',
                        marginBottom: '12px',
                        margin: 0,
                        letterSpacing: '-0.01em',
                        textShadow: '0 2px 8px rgba(30, 64, 175, 0.3)'
                      }}>
                        Original Image
                      </h5>
                      <p style={{
                        fontSize: '16px',
                        color: '#a1a1aa',
                        margin: 0,
                        fontWeight: '400'
                      }}>
                        Source road image
                      </p>
                    </div>
                    
                    <div
                      onClick={() => handleImageClick(`${API_CONFIG.BASE_URL}${result.image_original}`, 'Original')}
                      style={{ 
                        display: 'block', 
                        position: 'relative',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 20px 60px rgba(30, 64, 175, 0.2), 0 8px 32px rgba(0, 0, 0, 0.3)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)'
                        e.currentTarget.style.boxShadow = '0 40px 100px rgba(30, 64, 175, 0.4), 0 20px 60px rgba(0, 0, 0, 0.5)'
                        e.currentTarget.style.borderColor = 'rgba(30, 64, 175, 0.5)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)'
                        e.currentTarget.style.boxShadow = '0 16px 50px rgba(30, 64, 175, 0.2), 0 8px 25px rgba(0, 0, 0, 0.15)'
                        e.currentTarget.style.borderColor = 'rgba(30, 64, 175, 0.3)'
                      }}
                    >
                      <img
                        src={`${API_CONFIG.BASE_URL}${result.image_original}`}
                        alt="Original"
                        style={{
                          width: '650px',
                          height: '650px',
                          objectFit: 'cover',
                          borderRadius: '16px',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          filter: 'brightness(0.95) contrast(1.05) saturate(1.1)'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.filter = 'brightness(1.05) contrast(1.1) saturate(1.2)'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.filter = 'brightness(0.95) contrast(1.05) saturate(1.1)'
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.9), rgba(124, 58, 237, 0.9))',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '24px',
                        fontSize: '14px',
                        fontWeight: '700',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 8px 32px rgba(30, 64, 175, 0.3)',
                        letterSpacing: '0.01em'
                      }}>
                        📷 Original
                      </div>
                      <div style={{
                        position: 'absolute',
                        bottom: '16px',
                        left: '16px',
                        right: '16px',
                        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4))',
                        color: 'white',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: '600',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        opacity: 0,
                        transform: 'translateY(20px)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '1'
                        e.currentTarget.style.transform = 'translateY(0)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '0'
                        e.currentTarget.style.transform = 'translateY(20px)'
                      }}
                    >
                      Click to view full size
                    </div>
                    </div>
                    
                    {/* Card Hover Message */}
                    <div className="card-hover-message" style={{
                      position: 'absolute',
                      bottom: '20px',
                      left: '20px',
                      right: '20px',
                      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7))',
                      color: 'white',
                      padding: '12px 20px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: '600',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      opacity: 0,
                      transform: 'translateY(20px)',
                      transition: 'all 0.2s ease-out',
                      textAlign: 'center',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                      zIndex: 10
                    }}>
                      Click to view full size
                    </div>
                  </div>
                )}
                {result.image_detected && (
                  <div className="card crystal-card crystal-glow" style={{ 
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'rgba(0, 0, 0, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 12px 40px rgba(0, 0, 0, 0.6)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    borderRadius: '24px',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
                    e.currentTarget.style.boxShadow = '0 30px 80px rgba(0, 0, 0, 0.9), 0 20px 60px rgba(0, 0, 0, 0.7)'
                    // Show hover message
                    const hoverMessage = e.currentTarget.querySelector('.card-hover-message')
                    if (hoverMessage) {
                      hoverMessage.style.opacity = '1'
                      hoverMessage.style.transform = 'translateY(0)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)'
                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.8), 0 12px 40px rgba(0, 0, 0, 0.6)'
                    // Hide hover message
                    const hoverMessage = e.currentTarget.querySelector('.card-hover-message')
                    if (hoverMessage) {
                      hoverMessage.style.opacity = '0'
                      hoverMessage.style.transform = 'translateY(20px)'
                    }
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                      borderRadius: '12px 12px 0 0'
                    }}></div>
                    
                    <div style={{
                      padding: '0px 0 0px 0',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      marginBottom: '24px',
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '120px',
                        height: '120px',
                        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, transparent 70%)',
                        borderRadius: '50%',
                        filter: 'blur(20px)',
                        zIndex: -1
                      }}></div>
                      <h5 style={{
                        fontSize: '24px',
                        fontWeight: '800',
                        color: 'white',
                        marginBottom: '12px',
                        margin: 0,
                        letterSpacing: '-0.01em',
                        textShadow: '0 2px 8px rgba(124, 58, 237, 0.3)'
                      }}>
                        Detection Results
                      </h5>
                      <p style={{
                        fontSize: '16px',
                        color: '#a1a1aa',
                        margin: 0,
                        fontWeight: '400'
                      }}>
                        AI-detected damage areas
                      </p>
                    </div>
                    
                    <div
                      onClick={() => handleImageClick(`${API_CONFIG.BASE_URL}${result.image_detected}`, 'Detection Results')}
                      style={{ 
                        display: 'block', 
                        position: 'relative',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 20px 60px rgba(124, 58, 237, 0.2), 0 8px 32px rgba(0, 0, 0, 0.3)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)'
                        e.currentTarget.style.boxShadow = '0 40px 100px rgba(124, 58, 237, 0.4), 0 20px 60px rgba(0, 0, 0, 0.5)'
                        e.currentTarget.style.borderColor = 'rgba(124, 58, 237, 0.5)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)'
                        e.currentTarget.style.boxShadow = '0 16px 50px rgba(124, 58, 237, 0.2), 0 8px 25px rgba(0, 0, 0, 0.15)'
                        e.currentTarget.style.borderColor = 'rgba(124, 58, 237, 0.3)'
                      }}
                    >
                      <img
                        src={`${API_CONFIG.BASE_URL}${result.image_detected}`}
                        alt="Detection Results"
                        style={{
                          width: '650px',
                          height: '650px',
                          objectFit: 'cover',
                          borderRadius: '16px',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          filter: 'brightness(0.95) contrast(1.05) saturate(1.1)'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.filter = 'brightness(1.05) contrast(1.1) saturate(1.2)'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.filter = 'brightness(0.95) contrast(1.05) saturate(1.1)'
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.9), rgba(8, 145, 178, 0.9))',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '24px',
                        fontSize: '14px',
                        fontWeight: '700',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 8px 32px rgba(124, 58, 237, 0.3)',
                        letterSpacing: '0.01em'
                      }}>
                        🔍 AI Detection
                      </div>
                      <div style={{
                        position: 'absolute',
                        bottom: '16px',
                        left: '16px',
                        right: '16px',
                        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4))',
                        color: 'white',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: '600',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        opacity: 0,
                        transform: 'translateY(20px)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '1'
                        e.currentTarget.style.transform = 'translateY(0)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '0'
                        e.currentTarget.style.transform = 'translateY(20px)'
                      }}
                    >
                      Click to view full size
                    </div>
                    </div>
                    
                    {/* Card Hover Message */}
                    <div className="card-hover-message" style={{
                      position: 'absolute',
                      bottom: '20px',
                      left: '20px',
                      right: '20px',
                      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7))',
                      color: 'white',
                      padding: '12px 20px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: '600',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      opacity: 0,
                      transform: 'translateY(20px)',
                      transition: 'all 0.2s ease-out',
                      textAlign: 'center',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                      zIndex: 10
                    }}>
                      Click to view full size
                    </div>
                  </div>
                )}
            </div>

            {/* Damage Statistics */}
            <div className="card crystal-card crystal-glow card-large" style={{
              position: 'relative',
              overflow: 'hidden',
              background: 'rgba(0, 0, 0, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.8), 0 15px 50px rgba(0, 0, 0, 0.6)'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1))',
                borderRadius: '20px 20px 0 0'
              }}></div>
              
              <div style={{
                padding: '0px 0 10px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                marginBottom: '10px',
                textAlign: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '200px',
                  height: '200px',
                  background: 'radial-gradient(circle, rgba(30, 64, 175, 0.1) 0%, transparent 70%)',
                  borderRadius: '50%',
                  filter: 'blur(40px)',
                  zIndex: -1
                }}></div>
                <h4 style={{
                  fontSize: '24px',
                  fontWeight: '900',
                  marginBottom: '5px',
                  margin: 0,
                  letterSpacing: '-0.01em',
                  color: '#ffffff',
                  textShadow: '0 4px 20px rgba(255, 255, 255, 0.3)'
                }}>
                  Damage Statistics
                </h4>
                <p style={{
                  fontSize: '18px',
                  color: '#a1a1aa',
                  margin: 0,
                  fontWeight: '400',
                  letterSpacing: '0.01em'
                }}>
                  Comprehensive damage analysis and detection summary
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '16px',
                padding: '0 20px 20px 20px'
              }}>
                <div className="crystal-card crystal-glow" style={{
                  background: 'rgba(0, 0, 0, 0.5)',
                padding: '20px',
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  backdropFilter: 'blur(20px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(30, 64, 175, 0.2), 0 4px 16px rgba(0, 0, 0, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(30, 64, 175, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(30, 64, 175, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(30, 64, 175, 0.2)'
              }}>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100px',
                    height: '100px',
                    background: 'radial-gradient(circle, rgba(30, 64, 175, 0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(20px)',
                    zIndex: -1
                  }}></div>
                  <span style={{ 
                    fontSize: '24px', 
                    display: 'block',
                    marginBottom: '12px',
                    filter: 'drop-shadow(0 2px 4px rgba(30, 64, 175, 0.3))'
                  }}>🕳️</span>
                  <div style={{
                    fontSize: '28px',
                    fontWeight: '900',
                    color: '#ffffff',
                    marginBottom: '8px',
                    textShadow: '0 2px 8px rgba(255, 255, 255, 0.3)'
                  }}>
                    {result.road_damage?.damage_summary?.potholes || 0}
                  </div>
                  <div style={{
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: '600',
                    letterSpacing: '0.01em',
                    textShadow: '0 2px 4px rgba(255, 255, 255, 0.2)'
                  }}>
                    Potholes Detected
                </div>
                </div>
                  <div className="crystal-card crystal-glow" style={{
                  background: 'rgba(0, 0, 0, 0.5)',
                  padding: '20px',
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  backdropFilter: 'blur(20px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(30, 64, 175, 0.2), 0 4px 16px rgba(0, 0, 0, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(30, 64, 175, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(30, 64, 175, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(30, 64, 175, 0.2)'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100px',
                    height: '100px',
                    background: 'radial-gradient(circle, rgba(30, 64, 175, 0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(20px)',
                    zIndex: -1
                  }}></div>
                  <span style={{ 
                    fontSize: '24px', 
                    display: 'block',
                    marginBottom: '12px',
                    filter: 'drop-shadow(0 2px 4px rgba(30, 64, 175, 0.3))'
                  }}>🔧</span>
                  <div style={{
                    fontSize: '28px',
                    fontWeight: '900',
                    color: '#ffffff',
                    marginBottom: '8px',
                    textShadow: '0 2px 8px rgba(255, 255, 255, 0.3)'
                  }}>
                    {result.road_damage?.damage_summary?.cracks || 0}
                  </div>
                  <div style={{
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: '600',
                    letterSpacing: '0.01em',
                    textShadow: '0 2px 4px rgba(255, 255, 255, 0.2)'
                  }}>
                    Cracks Found
                  </div>
                  </div>
                  <div className="crystal-card crystal-glow" style={{
                  background: 'rgba(0, 0, 0, 0.5)',
                  padding: '20px',
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  backdropFilter: 'blur(20px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(30, 64, 175, 0.2), 0 4px 16px rgba(0, 0, 0, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(30, 64, 175, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(30, 64, 175, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(30, 64, 175, 0.2)'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100px',
                    height: '100px',
                    background: 'radial-gradient(circle, rgba(30, 64, 175, 0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(20px)',
                    zIndex: -1
                  }}></div>
                  <span style={{ 
                    fontSize: '24px', 
                    display: 'block',
                    marginBottom: '12px',
                    filter: 'drop-shadow(0 2px 4px rgba(30, 64, 175, 0.3))'
                  }}>🌊</span>
                  <div style={{
                    fontSize: '28px',
                    fontWeight: '900',
                    color: '#ffffff',
                    marginBottom: '8px',
                    textShadow: '0 2px 8px rgba(255, 255, 255, 0.3)'
                  }}>
                    {result.road_damage?.damage_summary?.surface_erosion || 0}
                  </div>
                  <div style={{
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: '600',
                    letterSpacing: '0.01em',
                    textShadow: '0 2px 4px rgba(255, 255, 255, 0.2)'
                  }}>
                    Surface Erosion
                  </div>
                  </div>
                </div>
              </div>

            {/* AI Classification */}
            <div className="card crystal-card crystal-glow card-large" style={{
              position: 'relative',
              overflow: 'hidden',
              background: 'rgba(0, 0, 0, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.8), 0 15px 50px rgba(0, 0, 0, 0.6)'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1))',
                borderRadius: '20px 20px 0 0'
              }}></div>
              
              <div style={{
                padding: '0px 0 10px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                marginBottom: '10px',
                textAlign: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '200px',
                  height: '200px',
                  background: 'radial-gradient(circle, rgba(30, 64, 175, 0.1) 0%, transparent 70%)',
                  borderRadius: '50%',
                  filter: 'blur(40px)',
                  zIndex: -1
                }}></div>
                <h4 style={{
                  fontSize: '24px',
                  fontWeight: '900',
                  marginBottom: '5px',
                  margin: 0,
                  letterSpacing: '-0.01em',
                  color: '#ffffff',
                  textShadow: '0 4px 20px rgba(255, 255, 255, 0.3)'
                }}>
                  AI Classification
                </h4>
                <p style={{
                  fontSize: '18px',
                  color: '#a1a1aa',
                  margin: 0,
                  fontWeight: '400',
                  letterSpacing: '0.01em'
                }}>
                  Intelligent damage type identification and confidence scoring
                </p>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '16px',
                marginBottom: '24px',
                padding: '0 20px'
              }}>
                {/* Damage Type */}
                <div className="crystal-card crystal-glow" style={{
                  background: 'rgba(0, 0, 0, 0.5)',
                  padding: '20px',
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  backdropFilter: 'blur(20px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(30, 64, 175, 0.2), 0 4px 16px rgba(0, 0, 0, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(30, 64, 175, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(30, 64, 175, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(30, 64, 175, 0.2)'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '120px',
                    height: '120px',
                    background: 'radial-gradient(circle, rgba(30, 64, 175, 0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(20px)',
                    zIndex: -1
                  }}></div>
                  <div style={{ 
                    fontSize: '36px',
                    marginBottom: '16px',
                    filter: 'drop-shadow(0 4px 12px rgba(30, 64, 175, 0.3))',
                    animation: 'pulse 2s ease-in-out infinite'
                  }}>
                    {getPredictionIcon(result.prediction?.class)}
                  </div>
                  <h6 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#ffffff',
                    marginBottom: '8px',
                    margin: 0,
                    letterSpacing: '0.01em',
                    textShadow: '0 2px 8px rgba(255, 255, 255, 0.2)'
                  }}>
                    Damage Type
                  </h6>
                  <div style={{
                      fontSize: '24px',
                    fontWeight: '900',
                      color: '#ffffff',
                    textShadow: '0 2px 8px rgba(255, 255, 255, 0.3)',
                    letterSpacing: '-0.01em'
                    }}>
                      {result.prediction?.class}
                  </div>
                </div>

                {/* AI Confidence Score */}
                <div className="crystal-card crystal-glow" style={{
                  background: 'rgba(0, 0, 0, 0.5)',
                  padding: '20px',
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  backdropFilter: 'blur(20px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(30, 64, 175, 0.2), 0 4px 16px rgba(0, 0, 0, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(30, 64, 175, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(30, 64, 175, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(30, 64, 175, 0.2)'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '120px',
                    height: '120px',
                    background: 'radial-gradient(circle, rgba(30, 64, 175, 0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(20px)',
                    zIndex: -1
                  }}></div>
                  <div style={{ 
                    fontSize: '36px',
                    marginBottom: '16px',
                    filter: 'drop-shadow(0 4px 12px rgba(30, 64, 175, 0.3))'
                  }}>
                    🎯
                  </div>
                  <h6 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#ffffff',
                    marginBottom: '8px',
                    margin: 0,
                    letterSpacing: '0.01em',
                    textShadow: '0 2px 8px rgba(255, 255, 255, 0.2)'
                  }}>
                    AI Confidence
                  </h6>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '900',
                    color: '#ffffff',
                    textShadow: '0 2px 8px rgba(255, 255, 255, 0.3)',
                    letterSpacing: '-0.01em'
                  }}>
                    {result.prediction?.confidence?.toFixed(1)}%
                </div>
              </div>

                {/* Lighting Condition */}
              <div className="crystal-card crystal-glow" style={{
                  background: 'rgba(0, 0, 0, 0.5)',
                  padding: '20px',
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  backdropFilter: 'blur(20px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(30, 64, 175, 0.2), 0 4px 16px rgba(0, 0, 0, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(30, 64, 175, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(30, 64, 175, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(30, 64, 175, 0.2)'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '120px',
                    height: '120px',
                    background: 'radial-gradient(circle, rgba(30, 64, 175, 0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(20px)',
                    zIndex: -1
                  }}></div>
                  <div style={{ 
                    fontSize: '36px',
                    marginBottom: '16px',
                    filter: 'drop-shadow(0 4px 12px rgba(30, 64, 175, 0.3))'
                  }}>
                    ☀️
                  </div>
                  <h6 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#ffffff',
                    marginBottom: '8px',
                    margin: 0,
                    letterSpacing: '0.01em',
                    textShadow: '0 2px 8px rgba(255, 255, 255, 0.2)'
                  }}>
                    Lighting Condition
                  </h6>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '900',
                    color: '#ffffff',
                    textShadow: '0 2px 8px rgba(255, 255, 255, 0.3)',
                    letterSpacing: '-0.01em'
                  }}>
                    {result.prediction?.lighting}
                  </div>
                </div>
              </div>
            </div>

            {/* Assessment & Condition Card */}
            <div className="card crystal-card crystal-glow card-large" style={{
              position: 'relative',
              overflow: 'hidden',
              background: 'rgba(0, 0, 0, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.8), 0 15px 50px rgba(0, 0, 0, 0.6)'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1))',
                borderRadius: '20px 20px 0 0'
              }}></div>
              
              <div style={{
                padding: '0px 0 10px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                marginBottom: '10px',
                textAlign: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '200px',
                  height: '200px',
                  background: 'radial-gradient(circle, rgba(30, 64, 175, 0.1) 0%, transparent 70%)',
                  borderRadius: '50%',
                  filter: 'blur(40px)',
                  zIndex: -1
                }}></div>
                <h4 style={{
                  fontSize: '24px',
                  fontWeight: '900',
                  marginBottom: '16px',
                  margin: 0,
                  letterSpacing: '-0.01em',
                  color: '#ffffff',
                  textShadow: '0 4px 20px rgba(255, 255, 255, 0.3)'
                }}>
                  Assessment & Condition
                </h4>
                <p style={{
                  fontSize: '18px',
                  color: '#a1a1aa',
                  margin: 0,
                  fontWeight: '400',
                  letterSpacing: '0.01em'
                }}>
                  Professional analysis and road condition evaluation
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '20px',
                padding: '0 20px 20px 20px'
              }}>
              {/* Assessment Summary */}
                <div className="crystal-card crystal-glow" style={{
                  background: 'rgba(0, 0, 0, 0.5)',
                  padding: '20px',
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderLeft: '4px solid #3b82f6',
                  position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: 'blur(20px)'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '120px',
                    height: '120px',
                    background: 'radial-gradient(circle, rgba(30, 64, 175, 0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(20px)',
                    zIndex: -1
                  }}></div>
                <h5 style={{
                  fontSize: '20px',
                    fontWeight: '700',
                  color: '#ffffff',
                  marginBottom: '16px',
                    margin: 0,
                    letterSpacing: '-0.01em',
                    textShadow: '0 2px 8px rgba(255, 255, 255, 0.3)'
                }}>
                  Assessment Summary
                </h5>
                  <p style={{
                    color: '#a1a1aa',
                    lineHeight: '1.6',
                    fontSize: '16px',
                    margin: 0,
                    fontWeight: '400',
                    letterSpacing: '0.01em'
                  }}>
                    {result.road_damage?.explanation}
                  </p>
              </div>

                {/* Road Condition Assessment */}
                <div className="crystal-card crystal-glow" style={{
                  background: 'rgba(0, 0, 0, 0.5)',
                  padding: '20px',
                  borderRadius: '20px',
                  border: '1px solid rgba(124, 58, 237, 0.3)',
                  borderLeft: '4px solid #0891b2',
                  position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: 'blur(20px)'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '120px',
                    height: '120px',
                    background: 'radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(20px)',
                    zIndex: -1
                  }}></div>
                <h5 style={{
                  fontSize: '20px',
                    fontWeight: '700',
                  color: '#ffffff',
                    marginBottom: '16px',
                    margin: 0,
                    letterSpacing: '-0.01em',
                    textShadow: '0 2px 8px rgba(255, 255, 255, 0.3)'
                  }}>
                    Road Condition Assessment
                </h5>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '16px',
                    marginBottom: '16px'
                  }}>
                    <div
                      className={`status-badge ${
                        result.road_damage?.condition?.toLowerCase().replace(' ', '-') === 'excellent' ? 'status-excellent' :
                        result.road_damage?.condition?.toLowerCase().replace(' ', '-') === 'good' ? 'status-good' :
                        result.road_damage?.condition?.toLowerCase().replace(' ', '-') === 'fair' ? 'status-fair' :
                        result.road_damage?.condition?.toLowerCase().replace(' ', '-') === 'poor' ? 'status-poor' :
                        'status-very-poor'
                      }`}
                      style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        padding: '8px 16px',
                        borderRadius: '16px',
                        textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
                        boxShadow: '0 4px 12px rgba(124, 58, 237, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      {result.road_damage?.condition}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      {/* <div style={{
                        fontSize: '14px',
                        color: '#ffffff',
                        marginBottom: '4px',
                        fontWeight: '600',
                        letterSpacing: '0.01em',
                        textShadow: '0 2px 4px rgba(255, 255, 255, 0.2)'
                      }}>
                        Condition Score
                  </div>
                      <div style={{
                        fontSize: '20px',
                        fontWeight: '900',
                        color: '#ffffff',
                        textShadow: '0 2px 8px rgba(255, 255, 255, 0.3)'
                      }}>
                        {result.road_damage?.score}/100
                    </div> */}
                  </div>
                </div>
                </div>
              </div>
            </div>

            {/* Professional Report */}
            {result.road_damage?.report && (
              <div className="crystal-card crystal-glow" style={{
                background: 'rgba(0, 0, 0, 0.5)',
                padding: '24px 28px',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderLeft: '4px solid #3b82f6',
                marginBottom: '32px',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(20px)'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100px',
                  height: '100px',
                  background: 'radial-gradient(circle, rgba(30, 64, 175, 0.1) 0%, transparent 70%)',
                  borderRadius: '50%',
                  filter: 'blur(20px)',
                  zIndex: -1
                }}></div>
                  <h5 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                    color: '#ffffff',
                  marginBottom: '12px',
                  margin: 0,
                  letterSpacing: '-0.01em',
                  textShadow: '0 2px 8px rgba(255, 255, 255, 0.3)'
                  }}>
                    Professional Assessment Report
                  </h5>
                    <div style={{
                      color: '#a1a1aa',
                      lineHeight: '1.6',
                      whiteSpace: 'pre-line',
                      fontSize: '16px',
                  margin: 0,
                  fontWeight: '400',
                  letterSpacing: '0.01em'
                    }}>
                      {result.road_damage.report}
                  </div>
                </div>
              )}
          </div>
        )}

        {/* Fullscreen Image Modal */}
        {fullscreenImage && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
          }}
          onClick={closeFullscreen}
          >
            <div style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
            onClick={(e) => e.stopPropagation()}
            >
              <div style={{
                position: 'absolute',
                top: '-50px',
                right: '0',
                background: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '25px',
                fontSize: '16px',
                fontWeight: '600',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                {fullscreenImage.type}
              </div>
              <img
                src={fullscreenImage.url}
                alt={fullscreenImage.type}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
                }}
              />
              <button
                onClick={closeFullscreen}
                style={{
                  position: 'absolute',
                  top: '-50px',
                  left: '0',
                  background: 'rgba(239, 68, 68, 0.8)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  fontSize: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(239, 68, 68, 1)'
                  e.target.style.transform = 'scale(1.1)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(239, 68, 68, 0.8)'
                  e.target.style.transform = 'scale(1)'
                }}
              >
                ✕
              </button>
              <div style={{
                marginTop: '20px',
                color: 'white',
                fontSize: '14px',
                opacity: 0.7,
                textAlign: 'center'
              }}>
                Click anywhere to close
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DetectionPage
