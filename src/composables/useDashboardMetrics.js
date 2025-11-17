import { ref, computed } from 'vue'
import { getDashboardMetrics, getRevenueData } from '@/services/apiService'

const metrics = ref(null)
const revenueData = ref([])
const loading = ref(false)
const error = ref(null)

export function useDashboardMetrics() {
  const fetchMetrics = async (params = {}) => {
    loading.value = true
    error.value = null
    
    try {
      // Mock data - substituir por chamada real à API
      const mockMetrics = {
        totalRevenue: 1060551.14,
        growth: 123.9,
        revenueReceived: 245340.90,
        revenuePredicted: 815210.24,
        pendingSales: 15332.18,
        averageTicket: 192.30,
        numberOfCharges: 12349,
        refunds: 8260.10,
        refundsCount: 233,
        refundsPercentage: 4.5,
        chargebacks: 1260.10,
        chargebacksCount: 5,
        chargebacksPercentage: 0.3,
        canceled: 3120.60,
        canceledCount: 32,
        canceledPercentage: 1.5,
        unauthorized: 6120.60,
        unauthorizedCount: 122,
        unauthorizedPercentage: 3.1,
        conversionByModality: {
          credit: 92,
          debit: 95,
          boleto: 42,
          pix: 98
        }
      }
      
      metrics.value = mockMetrics
      
      // Mock revenue data (31 dias)
      const mockRevenueData = Array.from({ length: 31 }, (_, i) => ({
        day: i + 1,
        value: Math.floor(Math.random() * 200000) + 50000
      }))
      
      revenueData.value = mockRevenueData
      
      // Descomentar para usar API real:
      // const data = await getDashboardMetrics(params)
      // metrics.value = data
    } catch (err) {
      error.value = err.message || 'Erro ao carregar métricas'
      console.error('Error fetching metrics:', err)
    } finally {
      loading.value = false
    }
  }
  
  const fetchRevenueData = async (params = {}) => {
    try {
      // Mock data
      const mockData = Array.from({ length: 31 }, (_, i) => ({
        day: i + 1,
        value: Math.floor(Math.random() * 200000) + 50000
      }))
      
      revenueData.value = mockData
      
      // Descomentar para usar API real:
      // const data = await getRevenueData(params)
      // revenueData.value = data
    } catch (err) {
      error.value = err.message || 'Erro ao carregar dados de faturamento'
      console.error('Error fetching revenue data:', err)
    }
  }
  
  const formattedTotalRevenue = computed(() => {
    if (!metrics.value) return 'R$ 0,00'
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(metrics.value.totalRevenue)
  })
  
  const formattedGrowth = computed(() => {
    if (!metrics.value) return '0%'
    return `${metrics.value.growth.toFixed(1)}%`
  })
  
  return {
    metrics,
    revenueData,
    loading,
    error,
    fetchMetrics,
    fetchRevenueData,
    formattedTotalRevenue,
    formattedGrowth
  }
}

