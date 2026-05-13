import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  AppBar, Toolbar, Typography, Button, IconButton,
  Box, Drawer, List, ListItem, ListItemButton, ListItemText,
  useMediaQuery, useTheme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import PetsIcon from '@mui/icons-material/Pets'
import StoreIcon from '@mui/icons-material/Store'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'

const navLinks = [
  { label: 'Gallery',  to: '/',      icon: <StoreIcon fontSize="small" /> },
  { label: 'Admin',    to: '/admin', icon: <AdminPanelSettingsIcon fontSize="small" /> },
]

export default function Navbar() {
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: 'rgba(15,15,26,0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 4 }, gap: 2 }}>
          {/* Brand */}
          <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', flexGrow: 1 }}>
            <Box
              sx={{
                width: 36, height: 36, borderRadius: '10px',
                background: 'linear-gradient(135deg, #7c3aed, #fbbf24)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <PetsIcon sx={{ color: '#fff', fontSize: 20 }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #a78bfa, #fbbf24)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.5px',
              }}
            >
              Petstore
            </Typography>
          </Box>

          {isMobile ? (
            <IconButton onClick={() => setDrawerOpen(true)} color="inherit">
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {navLinks.map(link => (
                <Button
                  key={link.to}
                  component={Link}
                  to={link.to}
                  startIcon={link.icon}
                  variant={location.pathname === link.to ? 'contained' : 'text'}
                  color="primary"
                  sx={{ color: location.pathname === link.to ? '#fff' : '#94a3b8' }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 240, background: '#1a1a2e', pt: 2 } }}
      >
        <List>
          {navLinks.map(link => (
            <ListItem key={link.to} disablePadding>
              <ListItemButton
                component={Link}
                to={link.to}
                onClick={() => setDrawerOpen(false)}
                selected={location.pathname === link.to}
                sx={{
                  mx: 1, borderRadius: 2,
                  '&.Mui-selected': { background: 'rgba(139,92,246,0.15)', color: '#a78bfa' },
                }}
              >
                <Box sx={{ mr: 1.5, display: 'flex', alignItems: 'center', color: 'inherit' }}>{link.icon}</Box>
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  )
}
