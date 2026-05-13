import React, { useState, useEffect, useCallback } from 'react'
import {
  Box, Container, Grid, Typography, Alert,
  Drawer, IconButton, Fab, useMediaQuery, useTheme,
  Collapse,
} from '@mui/material'
import TuneIcon from '@mui/icons-material/Tune'
import CloseIcon from '@mui/icons-material/Close'
import PetCard, { PetCardSkeleton } from '../components/PetCard'
import PetFilters from '../components/PetFilters'
import { petApi } from '../api/petApi'

const DEFAULT_FILTERS = {
  search: '', species: [], status: '', minPrice: 0, maxPrice: 5000,
}

export default function GalleryPage() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [pets, setPets]         = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [filters, setFilters]   = useState(DEFAULT_FILTERS)
  const [drawerOpen, setDrawer] = useState(false)

  const fetchPets = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = {}
      if (filters.search)           params.search   = filters.search
      if (filters.status)           params.status   = filters.status
      if (filters.minPrice > 0)     params.minPrice = filters.minPrice
      if (filters.maxPrice < 5000)  params.maxPrice = filters.maxPrice
      // species is multi-select — send first selected or all via multiple calls
      if (filters.species?.length === 1) params.species = filters.species[0]

      const data = await petApi.getAll(params)

      // client-side multi-species filter
      const filtered = filters.species?.length > 1
        ? data.filter(p => filters.species.includes(p.species))
        : data

      setPets(filtered)
    } catch (err) {
      setError('Failed to load pets. Please make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    const timer = setTimeout(fetchPets, 300) // debounce search
    return () => clearTimeout(timer)
  }, [fetchPets])

  const handleReset = () => setFilters(DEFAULT_FILTERS)

  const filterPanel = (
    <PetFilters filters={filters} onChange={setFilters} onReset={handleReset} />
  )

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0f0f1a 0%, #16163a 100%)' }}>
      <Container maxWidth="xl" sx={{ py: 5 }}>

        {/* Hero */}
        <Box className="fade-in-up" sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #a78bfa 0%, #fbbf24 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2rem', md: '3rem' },
              mb: 1,
            }}
          >
            Find Your Perfect Companion 🐾
          </Typography>
          <Typography variant="h6" color="text.secondary" fontWeight={400}>
            Browse our curated collection of {loading ? '…' : pets.length} adorable pets
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>
        )}

        <Grid container spacing={3}>
          {/* Sidebar — desktop */}
          {!isMobile && (
            <Grid item md={3} lg={2.5}>
              <Box sx={{ position: 'sticky', top: 80 }}>
                {filterPanel}
              </Box>
            </Grid>
          )}

          {/* Pet grid */}
          <Grid item xs={12} md={9} lg={9.5}>
            {/* Mobile filter fab */}
            {isMobile && (
              <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Fab
                  size="small"
                  color="primary"
                  onClick={() => setDrawer(true)}
                  variant="extended"
                  sx={{ gap: 1 }}
                >
                  <TuneIcon fontSize="small" /> Filters
                </Fab>
              </Box>
            )}

            {loading ? (
              <Grid container spacing={3}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <Grid item xs={12} sm={6} lg={4} xl={3} key={i}>
                    <PetCardSkeleton />
                  </Grid>
                ))}
              </Grid>
            ) : pets.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 10 }}>
                <Typography fontSize={64}>🐾</Typography>
                <Typography variant="h5" fontWeight={700} sx={{ mt: 2 }}>No pets found</Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  Try adjusting your filters or search terms
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {pets.map((pet, i) => (
                  <Grid item xs={12} sm={6} lg={4} xl={3} key={pet.id}
                    sx={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <PetCard pet={pet} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Mobile filter drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawer(false)}
        PaperProps={{ sx: { width: 300, p: 2, background: '#1a1a2e' } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight={700}>Filters</Typography>
          <IconButton onClick={() => setDrawer(false)} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        {filterPanel}
      </Drawer>
    </Box>
  )
}
