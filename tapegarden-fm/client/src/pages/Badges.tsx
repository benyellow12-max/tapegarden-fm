import React from 'react'
import { Box, Typography, Grid, Card, CardContent, Avatar } from '@mui/material'

const Badges: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Badges
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, margin: '0 auto 16px' }}>
                🎵
              </Avatar>
              <Typography variant="h6" align="center">
                Music Explorer
              </Typography>
              <Typography variant="body2" color="textSecondary" align="center">
                Discovered 100 different artists
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Avatar sx={{ bgcolor: 'secondary.main', width: 56, height: 56, margin: '0 auto 16px' }}>
                🏆
              </Avatar>
              <Typography variant="h6" align="center">
                Early Adopter
              </Typography>
              <Typography variant="body2" color="textSecondary" align="center">
                Joined in the first month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Avatar sx={{ bgcolor: 'success.main', width: 56, height: 56, margin: '0 auto 16px' }}>
                🌟
              </Avatar>
              <Typography variant="h6" align="center">
                Super Listener
              </Typography>
              <Typography variant="body2" color="textSecondary" align="center">
                1000 hours of listening
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Badges