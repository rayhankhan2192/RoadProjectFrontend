import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import ClassificationPage from './components/ClassificationPage'
import DetectionPage from './components/DetectionPage'
import Nav from './components/Nav'
import { SessionProvider } from './contexts/SessionContext'

function App() {
  return (
    <SessionProvider>
      <Router>
        <AppContent />
      </Router>
    </SessionProvider>
  )
}

function AppContent() {
  const location = useLocation()
  
  return (
    <div style={{ minHeight: '100vh' }}>
      <Nav />
      <main style={{ paddingTop: '100px' }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/classification" element={<ClassificationPage />} />
          <Route path="/detection" element={<DetectionPage />} />
        </Routes>
      </main>
    </div>
  )
}


export default App
