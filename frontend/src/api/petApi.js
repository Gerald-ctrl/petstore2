import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
})

export const petApi = {
  /** List pets with optional filters */
  getAll: (params = {}) =>
    api.get('/pets', { params }).then(r => r.data),

  /** Get single pet by id */
  getById: (id) =>
    api.get(`/pets/${id}`).then(r => r.data),

  /** Create a new pet */
  create: (pet) =>
    api.post('/pets', pet).then(r => r.data),

  /** Update an existing pet */
  update: (id, pet) =>
    api.put(`/pets/${id}`, pet).then(r => r.data),

  /** Delete a pet */
  delete: (id) =>
    api.delete(`/pets/${id}`),
}
