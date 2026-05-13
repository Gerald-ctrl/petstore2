import React from 'react'
import {
  Box, Typography, TextField, FormGroup, FormControlLabel,
  Checkbox, Radio, RadioGroup, FormLabel, FormControl,
  Slider, Button, Divider, InputAdornment,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'

const SPECIES = ['Dog', 'Cat', 'Bird', 'Fish', 'Rabbit', 'Other']
const STATUSES = ['AVAILABLE', 'PENDING', 'SOLD']
const PRICE_MIN = 0
const PRICE_MAX = 5000

export default function PetFilters({ filters, onChange, onReset }) {
  const handleSpeciesToggle = (species) => {
    const current = filters.species || []
    const updated = current.includes(species)
      ? current.filter(s => s !== species)
      : [...current, species]
    onChange({ ...filters, species: updated })
  }

  const handleStatusChange = (e) => {
    onChange({ ...filters, status: e.target.value })
  }

  const handlePriceChange = (_, value) => {
    onChange({ ...filters, minPrice: value[0], maxPrice: value[1] })
  }

  const handleSearchChange = (e) => {
    onChange({ ...filters, search: e.target.value })
  }

  return (
    <Box
      className="glass"
      sx={{ borderRadius: 3, p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      {/* Search */}
      <Box>
        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.7rem' }}>
          Search
        </Typography>
        <TextField
          fullWidth
          placeholder="Name or breed…"
          value={filters.search || ''}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" sx={{ color: '#6b7280' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              background: 'rgba(255,255,255,0.05)',
              '&:hover fieldset': { borderColor: '#7c3aed' },
              '&.Mui-focused fieldset': { borderColor: '#8b5cf6' },
            },
          }}
        />
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

      {/* Species */}
      <Box>
        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.7rem' }}>
          Species
        </Typography>
        <FormGroup>
          {SPECIES.map(s => (
            <FormControlLabel
              key={s}
              control={
                <Checkbox
                  size="small"
                  checked={(filters.species || []).includes(s)}
                  onChange={() => handleSpeciesToggle(s)}
                  sx={{ color: '#6b7280', '&.Mui-checked': { color: '#8b5cf6' } }}
                />
              }
              label={<Typography variant="body2">{s}</Typography>}
              sx={{ mb: 0.25 }}
            />
          ))}
        </FormGroup>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

      {/* Status */}
      <Box>
        <FormControl component="fieldset">
          <FormLabel
            component="legend"
            sx={{ mb: 1, color: '#a78bfa !important', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.7rem' }}
          >
            Status
          </FormLabel>
          <RadioGroup value={filters.status || ''} onChange={handleStatusChange}>
            <FormControlLabel
              value=""
              control={<Radio size="small" sx={{ color: '#6b7280', '&.Mui-checked': { color: '#8b5cf6' } }} />}
              label={<Typography variant="body2">All</Typography>}
            />
            {STATUSES.map(s => (
              <FormControlLabel
                key={s}
                value={s}
                control={<Radio size="small" sx={{ color: '#6b7280', '&.Mui-checked': { color: '#8b5cf6' } }} />}
                label={<Typography variant="body2">{s.charAt(0) + s.slice(1).toLowerCase()}</Typography>}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

      {/* Price Range */}
      <Box>
        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 0.5, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.7rem' }}>
          Price Range
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          ${filters.minPrice ?? PRICE_MIN} — ${filters.maxPrice ?? PRICE_MAX}
        </Typography>
        <Slider
          value={[filters.minPrice ?? PRICE_MIN, filters.maxPrice ?? PRICE_MAX]}
          onChange={handlePriceChange}
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={50}
          valueLabelDisplay="auto"
          valueLabelFormat={v => `$${v}`}
          sx={{
            color: '#8b5cf6',
            '& .MuiSlider-thumb': { width: 16, height: 16 },
            '& .MuiSlider-track': { background: 'linear-gradient(90deg, #7c3aed, #8b5cf6)' },
          }}
        />
      </Box>

      {/* Reset */}
      <Button
        startIcon={<FilterAltOffIcon />}
        onClick={onReset}
        variant="outlined"
        color="primary"
        size="small"
        sx={{ borderColor: 'rgba(139,92,246,0.4)', color: '#a78bfa', '&:hover': { borderColor: '#8b5cf6' } }}
      >
        Reset Filters
      </Button>
    </Box>
  )
}
