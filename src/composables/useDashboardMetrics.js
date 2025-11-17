import { ref, computed } from 'vue'
import { getDashboardMetrics, getRevenueData } from '@/services/apiService'
import mockData from '@/data/mock.json'

const metrics = ref(null)
const revenueData = ref([])
const loading = ref(false)
const error = ref(null)

export function useDashboardMetrics() {
  const fetchMetrics = async (params = {}) => {
    loading.value = true
    error.value = null
    
    try {
      // Carregar dados do mock.json
      metrics.value = mockData.metrics
      revenueData.value = mockData.revenueData
      
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
      // Carregar dados do mock.json
      revenueData.value = mockData.revenueData
      
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

