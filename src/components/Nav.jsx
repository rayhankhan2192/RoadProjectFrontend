import { Link, useLocation } from 'react-router-dom'

function Nav() {
  const location = useLocation()
  
  return (
    <nav className="glass" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      padding: '10px 0',
      background: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(25px)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #1e40af, #7c3aed)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(30, 64, 175, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <span style={{ fontSize: '24px' }}>🚧</span>
          </div>
          <div>
            <h1 className="gradient-text" style={{
              fontSize: '28px',
              fontWeight: 'bold',
              margin: 0
            }}>
              RodexAI
            </h1>
            <p style={{
              fontSize: '14px',
              color: '#71717a',
              margin: 0
            }}>
              Advanced Detection System
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <NavLink to="/" currentPath={location.pathname} icon="🏠">
            Home
          </NavLink>
          
          <NavLink to="/classification" currentPath={location.pathname} icon="🔍">
            Classification
          </NavLink>
          <NavLink to="/detection" currentPath={location.pathname} icon="📊">
            Detection
          </NavLink>
          <NavLink to="/about" currentPath={location.pathname} icon="ℹ️">
            About
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ to, children, currentPath, icon }) {
  const isActive = currentPath === to

  return (
    <Link
      to={to}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 24px',
        borderRadius: '12px',
        fontWeight: '600',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        background: isActive 
          ? 'linear-gradient(135deg, #1e40af, #7c3aed)' 
          : 'transparent',
        color: isActive ? 'white' : '#a1a1aa',
        boxShadow: isActive ? '0 4px 15px rgba(30, 64, 175, 0.4)' : 'none',
        transform: isActive ? 'scale(1.05)' : 'scale(1)'
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.target.style.background = 'rgba(255, 255, 255, 0.1)'
          e.target.style.color = 'white'
          e.target.style.transform = 'scale(1.05)'
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.target.style.background = 'transparent'
          e.target.style.color = '#a1a1aa'
          e.target.style.transform = 'scale(1)'
        }
      }}
    >
      <span style={{ fontSize: '18px' }}>{icon}</span>
      {children}
    </Link>
  )
}

export default Nav
