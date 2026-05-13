import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card, CardMedia, CardContent, CardActions,
  Typography, Chip, Button, Box, Skeleton,
} from '@mui/material'
import PetsIcon from '@mui/icons-material/Pets'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const STATUS_COLORS = {
  AVAILABLE: 'success',
  PENDING:   'warning',
  SOLD:      'error',
}

const SPECIES_EMOJI = {
  Dog: '🐶', Cat: '🐱', Bird: '🐦',
  Fish: '🐠', Rabbit: '🐰', Other: '🐾',
}

const PLACEHOLDER_IMAGES = {
  Dog:    'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=280&fit=crop',
  Cat:    'https://images.unsplash.com/photo-1518791841217-8f162f1912da?w=400&h=280&fit=crop',
  Bird:   'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=400&h=280&fit=crop',
  Fish:   'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400&h=280&fit=crop',
  Rabbit: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=280&fit=crop',
  Other:  'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&h=280&fit=crop',
}

export function PetCardSkeleton() {
  return (
    <Card sx={{ height: 380, display: 'flex', flexDirection: 'column' }}>
      <Skeleton variant="rectangular" height={200} sx={{ borderRadius: '12px 12px 0 0' }} />
      <CardContent sx={{ flex: 1 }}>
        <Skeleton width="60%" height={28} />
        <Skeleton width="40%" height={20} sx={{ mt: 1 }} />
        <Skeleton width="30%" height={20} sx={{ mt: 1 }} />
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Skeleton width={100} height={36} sx={{ borderRadius: 2 }} />
      </CardActions>
    </Card>
  )
}

export default function PetCard({ pet }) {
  const navigate = useNavigate()
  const imageUrl = pet.imageUrl || PLACEHOLDER_IMAGES[pet.species] || PLACEHOLDER_IMAGES.Other
  const emoji    = SPECIES_EMOJI[pet.species] || '🐾'
  const ageLabel = pet.ageMonths
    ? pet.ageMonths < 12
      ? `${pet.ageMonths}mo`
      : `${Math.floor(pet.ageMonths / 12)}yr`
    : null

  return (
    <Card
      className="pet-card fade-in-up"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        overflow: 'hidden',
      }}
      onClick={() => navigate(`/pets/${pet.id}`)}
    >
      {/* Image */}
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="200"
          image={imageUrl}
          alt={pet.name}
          sx={{ transition: 'transform 0.4s ease', '&:hover': { transform: 'scale(1.06)' } }}
          onError={e => { e.target.src = PLACEHOLDER_IMAGES.Other }}
        />
        {/* Status chip overlay */}
        <Chip
          label={pet.status}
          color={STATUS_COLORS[pet.status] || 'default'}
          size="small"
          sx={{
            position: 'absolute', top: 10, right: 10,
            fontWeight: 700, fontSize: '0.7rem',
            backdropFilter: 'blur(8px)',
          }}
        />
        {/* Species badge */}
        <Box
          sx={{
            position: 'absolute', bottom: 10, left: 10,
            background: 'rgba(15,15,26,0.75)',
            backdropFilter: 'blur(8px)',
            borderRadius: 2, px: 1, py: 0.25,
            display: 'flex', alignItems: 'center', gap: 0.5,
          }}
        >
          <Typography fontSize={14}>{emoji}</Typography>
          <Typography variant="caption" sx={{ color: '#e2e8f0', fontWeight: 600 }}>
            {pet.species}
          </Typography>
        </Box>
      </Box>

      {/* Content */}
      <CardContent sx={{ flex: 1, pb: 0 }}>
        <Typography variant="h6" fontWeight={700} noWrap>
          {pet.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
          {pet.breed && (
            <Typography variant="body2" color="text.secondary" noWrap>
              {pet.breed}
            </Typography>
          )}
          {ageLabel && (
            <Typography variant="body2" color="text.secondary">
              · {ageLabel}
            </Typography>
          )}
        </Box>
        {pet.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {pet.description}
          </Typography>
        )}
      </CardContent>

      {/* Actions */}
      <CardActions sx={{ px: 2, pb: 2, pt: 1, justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 800, color: '#fbbf24' }}
        >
          ${Number(pet.price).toFixed(2)}
        </Typography>
        <Button
          size="small"
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={e => { e.stopPropagation(); navigate(`/pets/${pet.id}`) }}
          disabled={pet.status === 'SOLD'}
        >
          {pet.status === 'SOLD' ? 'Sold Out' : 'View'}
        </Button>
      </CardActions>
    </Card>
  )
}
