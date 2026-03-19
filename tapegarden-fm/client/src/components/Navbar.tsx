import React from 'react'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { useAppSelector } from '../hooks/redux'

const Navbar: React.FC = () => {
  const { user } = useAppSelector(state => state.auth)

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TapeGarden FM
        </Typography>
        {user ? (
          <Box>
            <Button color="inherit">Dashboard</Button>
            <Button color="inherit">Badges</Button>
            <Button color="inherit">Profile</Button>
            <Button color="inherit">Platforms</Button>
            <Button color="inherit">Logout</Button>
          </Box>
        ) : (
          <Box>
            <Button color="inherit" href="/login">Login</Button>
            <Button color="inherit" href="/register">Register</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar