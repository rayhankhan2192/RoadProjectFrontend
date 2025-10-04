import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import ClassificationPage from './components/ClassificationPage'
import DetectionPage from './components/DetectionPage'
import { SessionProvider } from './contexts/SessionContext'
import './App.css'

function App() {
  return (
    <SessionProvider>
      <Router>
        <div className="app">
          <nav className="navbar">
            <div className="nav-container">
              <h1 className="nav-title">Road Damage Detection</h1>
              <div className="nav-links">
                <Link to="/" className="nav-link">Classification</Link>
                <Link to="/detection" className="nav-link">Detection</Link>
              </div>
            </div>
          </nav>
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<ClassificationPage />} />
              <Route path="/detection" element={<DetectionPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </SessionProvider>
  )
}

export default App
