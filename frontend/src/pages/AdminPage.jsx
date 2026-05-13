import React, { useEffect, useState, useCallback } from 'react'
import {
  Box, Container, Typography, Button, IconButton,
  Chip, Alert, Snackbar, Tooltip, Paper,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import PetFormDialog from '../components/PetFormDialog'
import { petApi } from '../api/petApi'

const STATUS_COLORS = { AVAILABLE: 'success', PENDING: 'warning', SOLD: 'error' }

export default function AdminPage() {
  const [pets, setPets]           = useState([])
  const [loading, setLoading]     = useState(true)
  const [saving, setSaving]       = useState(false)
  const [error, setError]         = useState(null)
  const [snack, setSnack]         = useState({ open: false, msg: '', severity: 'success' })
  const [formOpen, setFormOpen]   = useState(false)
  const [editPet, setEditPet]     = useState(null)
  const [deleteId, setDeleteId]   = useState(null)

  const fetchPets = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setPets(await petApi.getAll())
    } catch {
      setError('Failed to load pets.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchPets() }, [fetchPets])

  const showSnack = (msg, severity = 'success') =>
    setSnack({ open: true, msg, severity })

  const handleOpenCreate = () => { setEditPet(null); setFormOpen(true) }
  const handleOpenEdit   = (pet) => { setEditPet(pet); setFormOpen(true) }
  const handleFormClose  = () => { setFormOpen(false); setEditPet(null) }

  const handleSave = async (data) => {
    setSaving(true)
    try {
      if (editPet?.id) {
        await petApi.update(editPet.id, data)
        showSnack(`✅ ${data.name} updated successfully!`)
      } else {
        await petApi.create(data)
        showSnack(`✅ ${data.name} added successfully!`)
      }
      handleFormClose()
      fetchPets()
    } catch (err) {
      showSnack('❌ Failed to save pet.', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleConfirmDelete = async () => {
    if (!deleteId) return
    setSaving(true)
    try {
      await petApi.delete(deleteId)
      showSnack('🗑️ Pet deleted.')
      setDeleteId(null)
      fetchPets()
    } catch {
      showSnack('❌ Failed to delete pet.', 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0f0f1a 0%, #16163a 100%)', py: 5 }}>
      <Container maxWidth="xl">

        {/* Header */}
        <Box className="fade-in-up" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 48, height: 48, borderRadius: 2,
                background: 'linear-gradient(135deg, #7c3aed, #fbbf24)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <AdminPanelSettingsIcon sx={{ color: '#fff' }} />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight={800}>Pet Management</Typography>
              <Typography variant="body2" color="text.secondary">
                {pets.length} pets in catalogue
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={fetchPets}
              disabled={loading}
              sx={{ borderColor: 'rgba(255,255,255,0.2)', color: '#94a3b8' }}
            >
              Refresh
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenCreate}
              size="large"
            >
              Add New Pet
            </Button>
          </Box>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

        {/* Table */}
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            borderRadius: 3,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ '& th': { fontWeight: 700, color: '#a78bfa', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(139,92,246,0.05)' } }}>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Species</TableCell>
                <TableCell>Breed</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                    <CircularProgress color="primary" />
                  </TableCell>
                </TableRow>
              ) : pets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary">No pets yet. Add your first one!</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                pets.map((pet) => (
                  <TableRow
                    key={pet.id}
                    hover
                    sx={{
                      '&:hover': { background: 'rgba(139,92,246,0.05)' },
                      '& td': { borderBottom: '1px solid rgba(255,255,255,0.05)' },
                    }}
                  >
                    <TableCell>
                      <Typography variant="caption" color="text.secondary">#{pet.id}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={600}>{pet.name}</Typography>
                    </TableCell>
                    <TableCell>{pet.species}</TableCell>
                    <TableCell color="text.secondary">{pet.breed || '—'}</TableCell>
                    <TableCell>
                      {pet.ageMonths
                        ? pet.ageMonths < 12
                          ? `${pet.ageMonths}mo`
                          : `${Math.floor(pet.ageMonths / 12)}yr`
                        : '—'}
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={700} sx={{ color: '#fbbf24' }}>
                        ${Number(pet.price).toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={pet.status}
                        color={STATUS_COLORS[pet.status] || 'default'}
                        size="small"
                        sx={{ fontWeight: 600, fontSize: '0.7rem' }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit">
                        <IconButton size="small" onClick={() => handleOpenEdit(pet)} sx={{ mr: 0.5, color: '#a78bfa' }}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small" onClick={() => setDeleteId(pet.id)} sx={{ color: '#ef4444' }}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Create / Edit Dialog */}
      <PetFormDialog
        open={formOpen}
        onClose={handleFormClose}
        onSave={handleSave}
        pet={editPet}
        loading={saving}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        PaperProps={{ sx: { background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 3 } }}
      >
        <DialogTitle fontWeight={700}>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography color="text.secondary">
            Are you sure you want to delete this pet? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button onClick={() => setDeleteId(null)} variant="outlined" color="inherit"
            sx={{ color: '#94a3b8', borderColor: 'rgba(255,255,255,0.15)' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            startIcon={saving ? <CircularProgress size={16} color="inherit" /> : <DeleteIcon />}
            disabled={saving}
          >
            {saving ? 'Deleting…' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity={snack.severity}
          onClose={() => setSnack(s => ({ ...s, open: false }))}
          sx={{ borderRadius: 2, fontWeight: 600 }}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  )
}
