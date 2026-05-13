import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'
import Navbar from './components/Navbar'
import GalleryPage from './pages/GalleryPage'
import PetDetailPage from './pages/PetDetailPage'
import AdminPage from './pages/AdminPage'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8b5cf6',
      light: '#a78bfa',
      dark: '#6d28d9',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#fbbf24',
      light: '#fcd34d',
      dark: '#f59e0b',
      contrastText: '#000000',
    },
    background: {
      default: '#0f0f1a',
      paper: '#1a1a2e',
    },
    text: {
      primary: '#e2e8f0',
      secondary: '#94a3b8',
    },
    divider: 'rgba(255,255,255,0.08)',
    success: { main: '#22c55e' },
    warning: { main: '#f59e0b' },
    error:   { main: '#ef4444' },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 20px',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
          '&:hover': { background: 'linear-gradient(135deg, #6d28d9, #7c3aed)' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, borderRadius: 6 },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined', size: 'small' },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          background: '#1a1a2e',
        },
      },
    },
  },
})

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/"         element={<GalleryPage />} />
          <Route path="/pets/:id" element={<PetDetailPage />} />
          <Route path="/admin"    element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
