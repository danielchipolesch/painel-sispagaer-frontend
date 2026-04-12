import axios from 'axios'

/**
 * Preconfigured Axios instance for all backend requests.
 *
 * Base URL is resolved from:
 *   1. VITE_API_BASE_URL env variable (set in .env or docker-compose)
 *   2. Falls back to '/api' so the Vite dev-proxy and nginx handle routing
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// ─── Request interceptor ──────────────────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    // Attach JWT token if present (auth to be implemented with backend)
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// ─── Response interceptor ─────────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Clear stale token and redirect to login (when auth is implemented)
      localStorage.removeItem('auth_token')
    }
    return Promise.reject(error)
  },
)

export default api
