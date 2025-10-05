import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div className="crystal-dark" style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background */}
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
          zIndex: 10,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          textAlign: 'center'
        }}>
          {/* Main Hero Content */}
          <div className="fade-in" style={{ marginBottom: '64px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 24px',
              background: 'rgba(30, 64, 175, 0.1)',
              borderRadius: '50px',
              border: '1px solid rgba(30, 64, 175, 0.2)',
              marginBottom: '32px',
              backdropFilter: 'blur(10px)'
            }}>
              <span style={{ fontSize: '20px' }}>🤖</span>
              <span style={{ 
                fontSize: '16px', 
                color: '#a1a1aa',
                fontWeight: '500'
              }}>
                AI-Powered Road Damage Detection
              </span>
            </div>

            <h1 className="gradient-text" style={{
              fontSize: 'clamp(48px, 8vw, 80px)',
              fontWeight: '900',
              marginBottom: '24px',
              margin: 0,
              letterSpacing: '-0.02em',
              lineHeight: '1.1',
              textShadow: '0 4px 20px rgba(30, 64, 175, 0.3)'
            }}>
              Advanced Road Damage
              <br />
              <span style={{ 
                background: 'linear-gradient(135deg, #1e40af, #7c3aed, #0891b2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                AI Detection System
              </span>
            </h1>

            <p style={{
              fontSize: 'clamp(18px, 3vw, 24px)',
              color: '#a1a1aa',
              maxWidth: '800px',
              margin: '0 auto 48px auto',
              lineHeight: '1.6',
              fontWeight: '400'
            }}>
              Revolutionize road maintenance with cutting-edge AI technology. 
              Detect, classify, and assess road damage with unprecedented accuracy 
              for smarter municipal planning and infrastructure management.
            </p>

            {/* CTA Buttons */}
            <div style={{
              display: 'flex',
              gap: '24px',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              marginBottom: '64px'
            }}>
              <Link
                to="/classification"
                className="btn btn-primary"
                style={{
                  minWidth: '200px',
                  height: '56px',
                  fontSize: '18px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px'
                }}
              >
                <span>🔍</span>
                Start Classification
              </Link>
              <Link
                to="/detection"
                className="btn btn-secondary"
                style={{
                  minWidth: '200px',
                  height: '56px',
                  fontSize: '18px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px'
                }}
              >
                <span>📊</span>
                Advanced Detection
              </Link>
            </div>

            {/* Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '32px',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              <div className="stat-item" style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '36px',
                  fontWeight: '900',
                  color: 'white',
                  marginBottom: '8px'
                }}>
                  95%+
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#a1a1aa',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Accuracy Rate
                </div>
              </div>
              <div className="stat-item" style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '36px',
                  fontWeight: '900',
                  color: 'white',
                  marginBottom: '8px'
                }}>
                  &lt; 2s
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#a1a1aa',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Analysis Time
                </div>
              </div>
              <div className="stat-item" style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '36px',
                  fontWeight: '900',
                  color: 'white',
                  marginBottom: '8px'
                }}>
                  24/7
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#a1a1aa',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Available
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        padding: '120px 20px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div className="fade-in" style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 className="gradient-text" style={{
            fontSize: 'clamp(36px, 6vw, 48px)',
            fontWeight: '800',
            marginBottom: '24px',
            margin: 0,
            letterSpacing: '-0.01em'
          }}>
            Powerful AI Features
          </h2>
          <p style={{
            fontSize: '20px',
            color: '#a1a1aa',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Cutting-edge technology for comprehensive road damage analysis
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '40px',
          marginBottom: '80px'
        }}>
          {/* Feature 1 */}
          <div className="card crystal-card crystal-glow slide-up" style={{
            textAlign: 'center',
            padding: '40px 32px',
            position: 'relative'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #1e40af, #7c3aed)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              fontSize: '32px',
              boxShadow: '0 8px 32px rgba(30, 64, 175, 0.4)'
            }}>
              🔍
            </div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'white',
              marginBottom: '16px',
              margin: 0
            }}>
              Real-time Classification
            </h3>
            <p style={{
              color: '#a1a1aa',
              lineHeight: '1.6',
              margin: 0
            }}>
              Instantly classify road damage types including cracks, potholes, 
              and surface erosion with AI-powered precision.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="card crystal-card crystal-glow slide-up" style={{
            textAlign: 'center',
            padding: '40px 32px',
            position: 'relative'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              fontSize: '32px',
              boxShadow: '0 8px 32px rgba(124, 58, 237, 0.4)'
            }}>
              📊
            </div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'white',
              marginBottom: '16px',
              margin: 0
            }}>
              Advanced Detection
            </h3>
            <p style={{
              color: '#a1a1aa',
              lineHeight: '1.6',
              margin: 0
            }}>
              Comprehensive damage analysis with detailed reports, 
              condition scoring, and professional assessments.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="card crystal-card crystal-glow slide-up" style={{
            textAlign: 'center',
            padding: '40px 32px',
            position: 'relative'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #0891b2, #10b981)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              fontSize: '32px',
              boxShadow: '0 8px 32px rgba(8, 145, 178, 0.4)'
            }}>
              🏛️
            </div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'white',
              marginBottom: '16px',
              margin: 0
            }}>
              Municipal Ready
            </h3>
            <p style={{
              color: '#a1a1aa',
              lineHeight: '1.6',
              margin: 0
            }}>
              Professional reports and assessments designed for 
              municipal planning and infrastructure management.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{
        padding: '120px 20px',
        background: 'rgba(255, 255, 255, 0.02)',
        borderRadius: '40px',
        margin: '0 20px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div className="fade-in" style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 className="gradient-text" style={{
            fontSize: 'clamp(36px, 6vw, 48px)',
            fontWeight: '800',
            marginBottom: '24px',
            margin: 0,
            letterSpacing: '-0.01em'
          }}>
            How It Works
          </h2>
          <p style={{
            fontSize: '20px',
            color: '#a1a1aa',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Simple three-step process for powerful road damage analysis
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '48px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {/* Step 1 */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '100px',
              height: '100px',
              background: 'linear-gradient(135deg, #1e40af, #7c3aed)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              fontSize: '36px',
              fontWeight: '900',
              color: 'white',
              boxShadow: '0 8px 32px rgba(30, 64, 175, 0.4)'
            }}>
              1
            </div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'white',
              marginBottom: '16px',
              margin: 0
            }}>
              Upload Image
            </h3>
            <p style={{
              color: '#a1a1aa',
              lineHeight: '1.6',
              margin: 0
            }}>
              Simply upload a clear image of the road surface you want to analyze.
            </p>
          </div>

          {/* Step 2 */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '100px',
              height: '100px',
              background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              fontSize: '36px',
              fontWeight: '900',
              color: 'white',
              boxShadow: '0 8px 32px rgba(124, 58, 237, 0.4)'
            }}>
              2
            </div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'white',
              marginBottom: '16px',
              margin: 0
            }}>
              AI Analysis
            </h3>
            <p style={{
              color: '#a1a1aa',
              lineHeight: '1.6',
              margin: 0
            }}>
              Our advanced AI algorithms analyze the image and detect damage patterns.
            </p>
          </div>

          {/* Step 3 */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '100px',
              height: '100px',
              background: 'linear-gradient(135deg, #0891b2, #10b981)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              fontSize: '36px',
              fontWeight: '900',
              color: 'white',
              boxShadow: '0 8px 32px rgba(8, 145, 178, 0.4)'
            }}>
              3
            </div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'white',
              marginBottom: '16px',
              margin: 0
            }}>
              Get Results
            </h3>
            <p style={{
              color: '#a1a1aa',
              lineHeight: '1.6',
              margin: 0
            }}>
              Receive detailed analysis, confidence scores, and professional reports.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '120px 20px',
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div className="fade-in">
          <h2 className="gradient-text" style={{
            fontSize: 'clamp(36px, 6vw, 48px)',
            fontWeight: '800',
            marginBottom: '24px',
            margin: 0,
            letterSpacing: '-0.01em'
          }}>
            Ready to Get Started?
          </h2>
          <p style={{
            fontSize: '20px',
            color: '#a1a1aa',
            marginBottom: '48px',
            lineHeight: '1.6'
          }}>
            Experience the future of road damage detection with our AI-powered platform.
          </p>

          <div style={{
            display: 'flex',
            gap: '24px',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <Link
              to="/classification"
              className="btn btn-primary"
              style={{
                minWidth: '220px',
                height: '60px',
                fontSize: '18px',
                fontWeight: '700',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px'
              }}
            >
              <span>🚀</span>
              Start Free Analysis
            </Link>
            <Link
              to="/detection"
              className="btn btn-secondary"
              style={{
                minWidth: '220px',
                height: '60px',
                fontSize: '18px',
                fontWeight: '700',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px'
              }}
            >
              <span>📊</span>
              Advanced Detection
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '60px 20px 40px 20px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        textAlign: 'center',
        background: 'rgba(0, 0, 0, 0.2)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #1e40af, #7c3aed)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              boxShadow: '0 4px 15px rgba(30, 64, 175, 0.4)'
            }}>
              🚧
            </div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'white',
              margin: 0
            }}>
              RodexAI 
            </h3>
          </div>
          
          <p style={{
            color: '#71717a',
            fontSize: '16px',
            marginBottom: '32px',
            margin: 0
          }}>
            Advanced AI-powered road damage detection and analysis system
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '32px',
            flexWrap: 'wrap',
            marginBottom: '32px'
          }}>
            <Link
              to="/classification"
              style={{
                color: '#a1a1aa',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = 'white'}
              onMouseLeave={(e) => e.target.style.color = '#a1a1aa'}
            >
              Classification
            </Link>
            <Link
              to="/about"
              style={{
                color: '#a1a1aa',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = 'white'}
              onMouseLeave={(e) => e.target.style.color = '#a1a1aa'}
            >
              About
            </Link>
            <Link
              to="/detection"
              style={{
                color: '#a1a1aa',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = 'white'}
              onMouseLeave={(e) => e.target.style.color = '#a1a1aa'}
            >
              Detection
            </Link>
          </div>

          <div style={{
            paddingTop: '32px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#71717a',
            fontSize: '14px'
          }}>
            © 2024 Road Damage AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
