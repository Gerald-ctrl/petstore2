import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box, Container, Grid, Typography, Chip, Button,
  Skeleton, Alert, Divider, Paper,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PetsIcon from '@mui/icons-material/Pets'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { petApi } from '../api/petApi'

const STATUS_COLORS = { AVAILABLE: 'success', PENDING: 'warning', SOLD: 'error' }

const PLACEHOLDER_IMAGES = {
  Dog:    'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=600&h=400&fit=crop',
  Cat:    'https://images.unsplash.com/photo-1518791841217-8f162f1912da?w=600&h=400&fit=crop',
  Bird:   'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=600&h=400&fit=crop',
  Fish:   'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=600&h=400&fit=crop',
  Rabbit: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&h=400&fit=crop',
  Other:  'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=600&h=400&fit=crop',
}

function StatItem({ icon, label, value }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2, borderRadius: 2, textAlign: 'center',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <Box sx={{ color: '#8b5cf6', mb: 0.5 }}>{icon}</Box>
      <Typography variant="caption" color="text.secondary" display="block">{label}</Typography>
      <Typography variant="body1" fontWeight={700}>{value}</Typography>
    </Paper>
  )
}

export default function PetDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pet, setPet]     = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState(null)

  useEffect(() => {
    petApi.getById(id)
      .then(setPet)
      .catch(() => setError('Pet not found or server error.'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" height={420} sx={{ borderRadius: 3 }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton height={48} width="60%" />
            <Skeleton height={28} width="40%" sx={{ mt: 1 }} />
            <Skeleton height={100} sx={{ mt: 3 }} />
          </Grid>
        </Grid>
      </Container>
    )
  }

  if (error || !pet) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>{error || 'Pet not found.'}</Alert>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Back to Gallery
        </Button>
      </Container>
    )
  }

  const imageUrl = pet.imageUrl || PLACEHOLDER_IMAGES[pet.species] || PLACEHOLDER_IMAGES.Other
  const ageLabel = pet.ageMonths
    ? pet.ageMonths < 12
      ? `${pet.ageMonths} months`
      : `${Math.floor(pet.ageMonths / 12)} year${Math.floor(pet.ageMonths / 12) > 1 ? 's' : ''}`
    : 'Unknown'

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0f0f1a 0%, #16163a 100%)', py: 5 }}>
      <Container maxWidth="lg">

        {/* Back */}
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mb: 3, color: '#94a3b8' }}>
          Back to Gallery
        </Button>

        <Grid container spacing={5} className="fade-in-up">
          {/* Image */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 24px 80px rgba(139,92,246,0.2)',
              }}
            >
              <img
                src={imageUrl}
                alt={pet.name}
                style={{ width: '100%', height: 420, objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                className="hover:scale-105"
                onError={e => { e.target.src = PLACEHOLDER_IMAGES.Other }}
              />
            </Box>
          </Grid>

          {/* Details */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Chip
                label={pet.status}
                color={STATUS_COLORS[pet.status] || 'default'}
                size="small"
                sx={{ fontWeight: 700 }}
              />
              <Chip label={pet.species} size="small" variant="outlined" sx={{ borderColor: 'rgba(139,92,246,0.4)', color: '#a78bfa' }} />
            </Box>

            <Typography variant="h3" fontWeight={800} sx={{ mb: 0.5, lineHeight: 1.1 }}>
              {pet.name}
            </Typography>

            {pet.breed && (
              <Typography variant="h6" color="text.secondary" fontWeight={400} sx={{ mb: 3 }}>
                {pet.breed}
              </Typography>
            )}

            {/* Stats */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={4}>
                <StatItem icon={<AttachMoneyIcon />} label="Price" value={`$${Number(pet.price).toFixed(2)}`} />
              </Grid>
              <Grid item xs={4}>
                <StatItem icon={<CalendarMonthIcon />} label="Age" value={ageLabel} />
              </Grid>
              <Grid item xs={4}>
                <StatItem icon={<PetsIcon />} label="Status" value={pet.status.charAt(0) + pet.status.slice(1).toLowerCase()} />
              </Grid>
            </Grid>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mb: 3 }} />

            {pet.description && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.7rem' }}>
                  About
                </Typography>
                <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
                  {pet.description}
                </Typography>
              </Box>
            )}

            {/* Price & CTA */}
            <Box
              className="glass"
              sx={{ borderRadius: 3, p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}
            >
              <Box>
                <Typography variant="caption" color="text.secondary">Total price</Typography>
                <Typography
                  variant="h4"
                  fontWeight={800}
                  sx={{ color: '#fbbf24', lineHeight: 1 }}
                >
                  ${Number(pet.price).toFixed(2)}
                </Typography>
              </Box>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCartIcon />}
                disabled={pet.status !== 'AVAILABLE'}
                sx={{ px: 4, py: 1.5, fontSize: '1rem' }}
              >
                {pet.status === 'AVAILABLE' ? 'Adopt Me!' : pet.status === 'PENDING' ? 'Pending' : 'Sold Out'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
