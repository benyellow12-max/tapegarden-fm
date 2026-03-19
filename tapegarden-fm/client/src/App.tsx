import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAppSelector } from './hooks/redux'
import Layout from './components/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Badges from './pages/Badges'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import PlatformConnections from './pages/PlatformConnections'

function App() {
  const { user } = useAppSelector((state) => state.auth)

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/badges" element={user ? <Badges /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/platforms" element={user ? <PlatformConnections /> : <Navigate to="/login" />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
