import React, { useState, useEffect } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem, Grid, CircularProgress,
  InputAdornment, IconButton, Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import SaveIcon from '@mui/icons-material/Save'

const SPECIES_OPTIONS = ['Dog', 'Cat', 'Bird', 'Fish', 'Rabbit', 'Other']
const STATUS_OPTIONS  = ['AVAILABLE', 'PENDING', 'SOLD']

const EMPTY_FORM = {
  name: '', species: 'Dog', breed: '', ageMonths: '',
  price: '', status: 'AVAILABLE', description: '', imageUrl: '',
}

export default function PetFormDialog({ open, onClose, onSave, pet, loading }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const isEdit = Boolean(pet?.id)

  useEffect(() => {
    if (open) {
      setErrors({})
      setForm(
        pet
          ? {
              name:        pet.name        ?? '',
              species:     pet.species     ?? 'Dog',
              breed:       pet.breed       ?? '',
              ageMonths:   pet.ageMonths   ?? '',
              price:       pet.price       ?? '',
              status:      pet.status      ?? 'AVAILABLE',
              description: pet.description ?? '',
              imageUrl:    pet.imageUrl    ?? '',
            }
          : EMPTY_FORM
      )
    }
  }, [open, pet])

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.name.trim())            errs.name  = 'Name is required'
    if (!form.species)                errs.species = 'Species is required'
    if (!form.price || Number(form.price) <= 0) errs.price = 'Valid price required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSave = () => {
    if (!validate()) return
    onSave({
      ...form,
      ageMonths: form.ageMonths ? Number(form.ageMonths) : null,
      price: Number(form.price),
    })
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: '#1a1a2e',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
        <Typography variant="h6" fontWeight={700}>
          {isEdit ? '✏️ Edit Pet' : '🐾 Add New Pet'}
        </Typography>
        <IconButton onClick={onClose} size="small" disabled={loading}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <Grid container spacing={2} sx={{ pt: 1 }}>
          {/* Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name *"
              fullWidth
              value={form.name}
              onChange={set('name')}
              error={!!errors.name}
              helperText={errors.name}
              disabled={loading}
            />
          </Grid>

          {/* Species */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Species *"
              fullWidth
              value={form.species}
              onChange={set('species')}
              error={!!errors.species}
              helperText={errors.species}
              disabled={loading}
            >
              {SPECIES_OPTIONS.map(s => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Breed */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Breed"
              fullWidth
              value={form.breed}
              onChange={set('breed')}
              disabled={loading}
              placeholder="e.g. Golden Retriever"
            />
          </Grid>

          {/* Age */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Age (months)"
              fullWidth
              type="number"
              value={form.ageMonths}
              onChange={set('ageMonths')}
              disabled={loading}
              inputProps={{ min: 0 }}
            />
          </Grid>

          {/* Price */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price *"
              fullWidth
              type="number"
              value={form.price}
              onChange={set('price')}
              error={!!errors.price}
              helperText={errors.price}
              disabled={loading}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              inputProps={{ min: 0, step: 0.01 }}
            />
          </Grid>

          {/* Status */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Status"
              fullWidth
              value={form.status}
              onChange={set('status')}
              disabled={loading}
            >
              {STATUS_OPTIONS.map(s => (
                <MenuItem key={s} value={s}>
                  {s.charAt(0) + s.slice(1).toLowerCase()}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Image URL */}
          <Grid item xs={12}>
            <TextField
              label="Image URL"
              fullWidth
              value={form.imageUrl}
              onChange={set('imageUrl')}
              disabled={loading}
              placeholder="https://..."
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              multiline
              minRows={3}
              value={form.description}
              onChange={set('description')}
              disabled={loading}
              placeholder="Tell us about this pet…"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button onClick={onClose} disabled={loading} variant="outlined" color="inherit"
          sx={{ color: '#94a3b8', borderColor: 'rgba(255,255,255,0.15)' }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <SaveIcon />}
          disabled={loading}
        >
          {loading ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Pet'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
