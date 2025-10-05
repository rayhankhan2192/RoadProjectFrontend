import { Link } from 'react-router-dom'

function AboutPage() {
  return (
    <div className="crystal-dark" style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '40px 20px'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#0a0a0a',
          animation: 'float 20s ease-in-out infinite'
        }}></div>

        <div style={{
          position: 'relative',
          maxWidth: '1400px',
          width: '100%',
          textAlign: 'center'
        }}>
          <div className="fade-in" style={{
            marginBottom: '40px'
          }}>
            <h1 className="premium-text" style={{
              fontSize: '64px',
              fontWeight: '900',
              marginBottom: '24px',
              margin: 0,
              letterSpacing: '-0.02em',
              textShadow: '0 8px 32px rgba(255, 255, 255, 0.3)'
            }}>
              RodexAI
            </h1>
            <div style={{
              position: 'relative',
              display: 'inline-block',
              marginBottom: '32px'
            }}>
              <p style={{
                fontSize: '24px',
                color: '#ffffff',
                marginBottom: '16px',
                margin: 0,
                fontWeight: '600',
                letterSpacing: '0.01em',
                textShadow: '0 4px 16px rgba(255, 255, 255, 0.2)'
              }}>
                Advanced AI-Powered Road Damage Detection System
              </p>
              <div style={{
                position: 'absolute',
                bottom: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '200px',
                height: '4px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1), transparent)',
                borderRadius: '2px',
                animation: 'pulse 2s ease-in-out infinite'
              }}></div>
            </div>
            <p style={{
              fontSize: '20px',
              color: '#a1a1aa',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: '1.6',
              fontWeight: '400',
              letterSpacing: '0.01em'
            }}>
              Revolutionizing infrastructure maintenance with cutting-edge artificial intelligence 
              for precise detection of potholes, cracks, and surface erosion.
            </p>
          </div>

          <div className="slide-up" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap'
          }}>
            <Link to="/detection" className="btn btn-primary" style={{
              minWidth: '200px',
              height: '56px',
              fontSize: '18px',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}>
              <span>🚀</span>
              Start Detection
            </Link>
            <Link to="/classification" className="btn btn-secondary" style={{
              minWidth: '200px',
              height: '56px',
              fontSize: '18px',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}>
              <span>🔍</span>
              AI Classification
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        padding: '120px 20px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div className="fade-in" style={{
          textAlign: 'center',
          marginBottom: '80px'
        }}>
          <h2 style={{
            fontSize: '48px',
            fontWeight: '900',
            color: '#ffffff',
            marginBottom: '24px',
            margin: 0,
            letterSpacing: '-0.02em',
            textShadow: '0 4px 20px rgba(255, 255, 255, 0.3)'
          }}>
            Advanced Detection Capabilities
          </h2>
          <p style={{
            fontSize: '20px',
            color: '#a1a1aa',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Our AI system specializes in identifying three critical types of road damage
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '40px',
          marginBottom: '80px'
        }}>
          {/* Pothole Detection */}
          <div className="card crystal-card crystal-glow slide-up" style={{
            textAlign: 'center',
            padding: '40px 32px',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, rgba(30, 64, 175, 0.8), rgba(124, 58, 237, 0.8))',
              borderRadius: '20px 20px 0 0'
            }}></div>
            
            <div style={{
              fontSize: '64px',
              marginBottom: '24px',
              filter: 'drop-shadow(0 8px 24px rgba(30, 64, 175, 0.4))',
              animation: 'pulse 2s ease-in-out infinite'
            }}>🕳️</div>
            
            <h3 style={{
              fontSize: '28px',
              fontWeight: '800',
              color: '#ffffff',
              marginBottom: '16px',
              margin: 0,
              letterSpacing: '-0.01em',
              textShadow: '0 2px 8px rgba(255, 255, 255, 0.3)'
            }}>
              Pothole Detection
            </h3>
            
            <p style={{
              fontSize: '16px',
              color: '#a1a1aa',
              lineHeight: '1.6',
              marginBottom: '24px',
              margin: 0
            }}>
              Advanced computer vision algorithms detect potholes with 95%+ accuracy, 
              identifying depth, size, and severity for prioritized maintenance planning.
            </p>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <div style={{
                background: 'rgba(30, 64, 175, 0.1)',
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid rgba(30, 64, 175, 0.3)',
                fontSize: '14px',
                color: '#ffffff',
                fontWeight: '600'
              }}>
                🎯 95%+ Accuracy
              </div>
              <div style={{
                background: 'rgba(124, 58, 237, 0.1)',
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid rgba(124, 58, 237, 0.3)',
                fontSize: '14px',
                color: '#ffffff',
                fontWeight: '600'
              }}>
                📏 Size Analysis
              </div>
            </div>
          </div>

          {/* Crack Detection */}
          <div className="card crystal-card crystal-glow slide-up" style={{
            textAlign: 'center',
            padding: '40px 32px',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, rgba(30, 64, 175, 0.8), rgba(124, 58, 237, 0.8))',
              borderRadius: '20px 20px 0 0'
            }}></div>
            
            <div style={{
              fontSize: '64px',
              marginBottom: '24px',
              filter: 'drop-shadow(0 8px 24px rgba(30, 64, 175, 0.4))',
              animation: 'pulse 2s ease-in-out infinite'
            }}>🔧</div>
            
            <h3 style={{
              fontSize: '28px',
              fontWeight: '800',
              color: '#ffffff',
              marginBottom: '16px',
              margin: 0,
              letterSpacing: '-0.01em',
              textShadow: '0 2px 8px rgba(255, 255, 255, 0.3)'
            }}>
              Crack Detection
            </h3>
            
            <p style={{
              fontSize: '16px',
              color: '#a1a1aa',
              lineHeight: '1.6',
              marginBottom: '24px',
              margin: 0
            }}>
              Sophisticated pattern recognition identifies various crack types including 
              longitudinal, transverse, and alligator cracks with precise measurements.
            </p>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <div style={{
                background: 'rgba(30, 64, 175, 0.1)',
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid rgba(30, 64, 175, 0.3)',
                fontSize: '14px',
                color: '#ffffff',
                fontWeight: '600'
              }}>
                🔍 Pattern Recognition
              </div>
              <div style={{
                background: 'rgba(124, 58, 237, 0.1)',
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid rgba(124, 58, 237, 0.3)',
                fontSize: '14px',
                color: '#ffffff',
                fontWeight: '600'
              }}>
                📐 Precise Measurements
              </div>
            </div>
          </div>

          {/* Surface Erosion Detection */}
          <div className="card crystal-card crystal-glow slide-up" style={{
            textAlign: 'center',
            padding: '40px 32px',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, rgba(30, 64, 175, 0.8), rgba(124, 58, 237, 0.8))',
              borderRadius: '20px 20px 0 0'
            }}></div>
            
            <div style={{
              fontSize: '64px',
              marginBottom: '24px',
              filter: 'drop-shadow(0 8px 24px rgba(30, 64, 175, 0.4))',
              animation: 'pulse 2s ease-in-out infinite'
            }}>🌊</div>
            
            <h3 style={{
              fontSize: '28px',
              fontWeight: '800',
              color: '#ffffff',
              marginBottom: '16px',
              margin: 0,
              letterSpacing: '-0.01em',
              textShadow: '0 2px 8px rgba(255, 255, 255, 0.3)'
            }}>
              Surface Erosion
            </h3>
            
            <p style={{
              fontSize: '16px',
              color: '#a1a1aa',
              lineHeight: '1.6',
              marginBottom: '24px',
              margin: 0
            }}>
              AI-powered analysis detects surface erosion, weathering, and material 
              degradation to assess long-term road condition and maintenance needs.
            </p>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <div style={{
                background: 'rgba(30, 64, 175, 0.1)',
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid rgba(30, 64, 175, 0.3)',
                fontSize: '14px',
                color: '#ffffff',
                fontWeight: '600'
              }}>
                🌊 Erosion Analysis
              </div>
              <div style={{
                background: 'rgba(124, 58, 237, 0.1)',
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid rgba(124, 58, 237, 0.3)',
                fontSize: '14px',
                color: '#ffffff',
                fontWeight: '600'
              }}>
                📊 Condition Assessment
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section style={{
        padding: '120px 20px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div className="card crystal-card crystal-glow card-large slide-up" style={{
          textAlign: 'center',
          padding: '80px 60px',
          position: 'relative'
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

          <h2 style={{
            fontSize: '48px',
            fontWeight: '900',
            color: '#ffffff',
            marginBottom: '32px',
            margin: 0,
            letterSpacing: '-0.02em',
            textShadow: '0 4px 20px rgba(255, 255, 255, 0.3)'
          }}>
            Powered by Advanced AI Technology
          </h2>

          <p style={{
            fontSize: '20px',
            color: '#a1a1aa',
            maxWidth: '800px',
            margin: '0 auto 60px auto',
            lineHeight: '1.6'
          }}>
            RodexAI leverages state-of-the-art machine learning algorithms and computer vision 
            to deliver unprecedented accuracy in road damage detection and analysis.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
            marginBottom: '60px'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '32px 24px',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '20px',
                filter: 'drop-shadow(0 4px 16px rgba(30, 64, 175, 0.3))'
              }}>🧠</div>
              <h4 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#ffffff',
                marginBottom: '16px',
                margin: 0
              }}>
                Deep Learning
              </h4>
              <p style={{
                fontSize: '16px',
                color: '#a1a1aa',
                lineHeight: '1.5',
                margin: 0
              }}>
                Advanced neural networks trained on millions of road images for maximum accuracy
              </p>
            </div>

            <div style={{
              textAlign: 'center',
              padding: '32px 24px',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '20px',
                filter: 'drop-shadow(0 4px 16px rgba(124, 58, 237, 0.3))'
              }}>👁️</div>
              <h4 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#ffffff',
                marginBottom: '16px',
                margin: 0
              }}>
                Computer Vision
              </h4>
              <p style={{
                fontSize: '16px',
                color: '#a1a1aa',
                lineHeight: '1.5',
                margin: 0
              }}>
                Sophisticated image processing algorithms for precise damage identification
              </p>
            </div>

            <div style={{
              textAlign: 'center',
              padding: '32px 24px',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '20px',
                filter: 'drop-shadow(0 4px 16px rgba(8, 145, 178, 0.3))'
              }}>⚡</div>
              <h4 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#ffffff',
                marginBottom: '16px',
                margin: 0
              }}>
                Real-time Processing
              </h4>
              <p style={{
                fontSize: '16px',
                color: '#a1a1aa',
                lineHeight: '1.5',
                margin: 0
              }}>
                Lightning-fast analysis and instant results for immediate action
              </p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap'
          }}>
            <Link to="/detection" className="btn btn-primary" style={{
              minWidth: '220px',
              height: '60px',
              fontSize: '18px',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}>
              <span>🚀</span>
              Try RodexAI
            </Link>
            <Link to="/classification" className="btn btn-secondary" style={{
              minWidth: '220px',
              height: '60px',
              fontSize: '18px',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}>
              <span>🔍</span>
              AI Classification
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: '120px 20px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div className="fade-in" style={{
          textAlign: 'center',
          marginBottom: '80px'
        }}>
          <h2 style={{
            fontSize: '48px',
            fontWeight: '900',
            color: '#ffffff',
            marginBottom: '24px',
            margin: 0,
            letterSpacing: '-0.02em',
            textShadow: '0 4px 20px rgba(255, 255, 255, 0.3)'
          }}>
            Proven Performance
          </h2>
          <p style={{
            fontSize: '20px',
            color: '#a1a1aa',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            RodexAI delivers exceptional results across all damage detection categories
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px'
        }}>
          <div className="card crystal-card crystal-glow slide-up" style={{
            textAlign: 'center',
            padding: '40px 24px'
          }}>
            <div style={{
              fontSize: '48px',
              fontWeight: '900',
              color: '#ffffff',
              marginBottom: '16px',
              textShadow: '0 4px 16px rgba(30, 64, 175, 0.3)'
            }}>
              95%+
            </div>
            <div style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '8px'
            }}>
              Detection Accuracy
            </div>
            <div style={{
              fontSize: '14px',
              color: '#a1a1aa'
            }}>
              Across all damage types
            </div>
          </div>

          <div className="card crystal-card crystal-glow slide-up" style={{
            textAlign: 'center',
            padding: '40px 24px'
          }}>
            <div style={{
              fontSize: '48px',
              fontWeight: '900',
              color: '#ffffff',
              marginBottom: '16px',
              textShadow: '0 4px 16px rgba(124, 58, 237, 0.3)'
            }}>
              &lt; 2s
            </div>
            <div style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '8px'
            }}>
              Processing Time
            </div>
            <div style={{
              fontSize: '14px',
              color: '#a1a1aa'
            }}>
              Per image analysis
            </div>
          </div>

          <div className="card crystal-card crystal-glow slide-up" style={{
            textAlign: 'center',
            padding: '40px 24px'
          }}>
            <div style={{
              fontSize: '48px',
              fontWeight: '900',
              color: '#ffffff',
              marginBottom: '16px',
              textShadow: '0 4px 16px rgba(8, 145, 178, 0.3)'
            }}>
              3
            </div>
            <div style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '8px'
            }}>
              Damage Types
            </div>
            <div style={{
              fontSize: '14px',
              color: '#a1a1aa'
            }}>
              Potholes, Cracks, Erosion
            </div>
          </div>

          <div className="card crystal-card crystal-glow slide-up" style={{
            textAlign: 'center',
            padding: '40px 24px'
          }}>
            <div style={{
              fontSize: '48px',
              fontWeight: '900',
              color: '#ffffff',
              marginBottom: '16px',
              textShadow: '0 4px 16px rgba(30, 64, 175, 0.3)'
            }}>
              24/7
            </div>
            <div style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '8px'
            }}>
              Availability
            </div>
            <div style={{
              fontSize: '14px',
              color: '#a1a1aa'
            }}>
              Continuous monitoring
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '120px 20px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div className="card crystal-card crystal-glow card-large slide-up" style={{
          textAlign: 'center',
          padding: '80px 60px',
          position: 'relative'
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

          <h2 style={{
            fontSize: '48px',
            fontWeight: '900',
            color: '#ffffff',
            marginBottom: '32px',
            margin: 0,
            letterSpacing: '-0.02em',
            textShadow: '0 4px 20px rgba(255, 255, 255, 0.3)'
          }}>
            Ready to Transform Road Maintenance?
          </h2>

          <p style={{
            fontSize: '20px',
            color: '#a1a1aa',
            maxWidth: '600px',
            margin: '0 auto 60px auto',
            lineHeight: '1.6'
          }}>
            Experience the power of AI-driven road damage detection. Upload your images 
            and get instant, accurate analysis with professional-grade results.
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap'
          }}>
            <Link to="/detection" className="btn btn-primary" style={{
              minWidth: '240px',
              height: '64px',
              fontSize: '20px',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}>
              <span>🚀</span>
              Start Detection Now
            </Link>
            <Link to="/" className="btn btn-secondary" style={{
              minWidth: '240px',
              height: '64px',
              fontSize: '20px',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}>
              <span>🏠</span>
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
