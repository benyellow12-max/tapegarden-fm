import React from 'react'
import { Box, Toolbar } from '@mui/material'
import { useAppSelector } from '../hooks/redux'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAppSelector(state => state.auth)
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {user && (
        <>
          <Navbar />
          <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
        </>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: user ? { xs: 0, md: '240px' } : 0,
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}

export default Layout
