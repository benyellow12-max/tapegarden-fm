import React from 'react'
import { Box, Typography, Grid, Card, CardContent } from '@mui/material'

const Dashboard: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Recent Activity</Typography>
              <Typography variant="body2" color="textSecondary">
                No recent activity
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Statistics</Typography>
              <Typography variant="body2" color="textSecondary">
                View your listening statistics
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard