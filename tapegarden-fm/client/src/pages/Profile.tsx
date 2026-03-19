import React from 'react'
import { Box, Typography, Card, CardContent, Avatar, Grid } from '@mui/material'

const Profile: React.FC = () => {
  return (
    <Box>
      <Card>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar 
                sx={{ width: 80, height: 80, fontSize: 36 }}
                alt="User Avatar"
              >
                U
              </Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h4" component="h1">
                User Profile
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Manage your account settings and preferences
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Account Information
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Username: user123
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Email: user@example.com
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Member since: January 2024
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Statistics
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Badges earned: 0
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Connected platforms: 0
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Listening time: 0 hours
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Profile