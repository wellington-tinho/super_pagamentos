import axios from 'axios'

const apiService = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
apiService.interceptors.request.use(
  (config) => {
    // Adicionar token de autenticação se existir
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiService.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Tratar erros globais
    if (error.response?.status === 401) {
      // Redirecionar para login
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Funções de API
export const getDashboardMetrics = async (params = {}) => {
  try {
    const response = await apiService.get('/dashboard/metrics', { params })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getRevenueData = async (params = {}) => {
  try {
    const response = await apiService.get('/dashboard/revenue', { params })
    return response.data
  } catch (error) {
    throw error
  }
}

export const authorizeTransfer = async (transferId) => {
  try {
    const response = await apiService.post(`/transfers/${transferId}/authorize`)
    return response.data
  } catch (error) {
    throw error
  }
}

export default apiService

