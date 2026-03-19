import React from 'react'
import { Box, Typography, Card, CardContent, Button, Grid } from '@mui/material'

const PlatformConnections: React.FC = () => {
  const platforms = [
    { id: 'spotify', name: 'Spotify', connected: false },
    { id: 'lastfm', name: 'Last.fm', connected: false },
    { id: 'apple_music', name: 'Apple Music', connected: false },
  ]

  const handleConnect = (platform: string) => {
    console.log(`Connecting to ${platform}`)
    // Handle platform connection logic here
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Platform Connections
      </Typography>
      <Grid container spacing={3}>
        {platforms.map((platform) => (
          <Grid item xs={12} sm={6} md={4} key={platform.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {platform.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  Connect your {platform.name} account to sync your listening data.
                </Typography>
                <Button
                  variant={platform.connected ? "outlined" : "contained"}
                  color={platform.connected ? "secondary" : "primary"}
                  fullWidth
                  onClick={() => handleConnect(platform.id)}
                >
                  {platform.connected ? 'Disconnect' : 'Connect'}
                </Button>
                {platform.connected && (
                  <Typography variant="caption" color="success.main" display="block" mt={1}>
                    Connected
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default PlatformConnections