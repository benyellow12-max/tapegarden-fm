import React from 'react'
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography } from '@mui/material'
import { Dashboard as DashboardIcon, Badge as BadgeIcon, Person as ProfileIcon, Settings as SettingsIcon } from '@mui/icons-material'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Badges', icon: <BadgeIcon />, path: '/badges' },
    { text: 'Profile', icon: <ProfileIcon />, path: '/profile' },
    { text: 'Platform Connections', icon: <SettingsIcon />, path: '/platforms' },
  ]

  return (
    <Drawer variant="temporary" open={open} onClose={onClose} anchor="left">
      <Box sx={{ width: 250 }} role="presentation" onClick={onClose}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6">Navigation</Typography>
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text} component="a" href={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}

export default Sidebar
