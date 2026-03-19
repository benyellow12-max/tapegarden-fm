import React from 'react'
import { Box, Typography, Button, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'

const Home: React.FC = () => {
  const { user } = useAppSelector(state => state.auth)
  const navigate = useNavigate()

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to TapeGarden FM
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        Track your music listening habits and earn badges for your musical journey
      </Typography>
      
      <Box sx={{ mt: 6 }}>
        {user ? (
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/dashboard')}
            sx={{ 
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' },
              px: 4,
              py: 2
            }}
          >
            View Your Dashboard
          </Button>
        ) : (
          <Box>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{ 
                bgcolor: 'primary.main',
                '&:hover': { bgcolor: 'primary.dark' },
                px: 4,
                py: 2,
                mr: 2
              }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/login')}
              sx={{ 
                color: 'primary.main',
                borderColor: 'primary.main',
                '&:hover': { 
                  bgcolor: 'primary.main',
                  color: 'white'
                },
                px: 4,
                py: 2
              }}
            >
              Sign In
            </Button>
          </Box>
        )}
      </Box>

      <Box sx={{ mt: 8, display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr' }, gap: 4 }}>
        <Box>
          <Typography variant="h6" gutterBottom>Track Your Listening</Typography>
          <Typography color="text.secondary">
            Connect your music streaming accounts and automatically track your listening habits
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom>Earn Badges</Typography>
          <Typography color="text.secondary">
            Unlock achievements for reaching milestones, exploring new genres, and discovering artists
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom>Visualize Progress</Typography>
          <Typography color="text.secondary">
            See your musical journey through interactive charts and beautiful progress visualizations
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default Home