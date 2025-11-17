import { ref, computed } from 'vue'

const startDate = ref('10-06-2020')
const endDate = ref('30-01-2025')
const period = ref('specific')

export function useDateRange() {
  const periodOptions = [
    { value: 'specific', label: 'Período: Específico' },
    { value: 'today', label: 'Hoje' },
    { value: 'week', label: 'Esta Semana' },
    { value: 'month', label: 'Este Mês' },
    { value: 'year', label: 'Este Ano' }
  ]
  
  const formattedStartDate = computed(() => {
    return startDate.value
  })
  
  const formattedEndDate = computed(() => {
    return endDate.value
  })
  
  const updateStartDate = (date) => {
    startDate.value = date
  }
  
  const updateEndDate = (date) => {
    endDate.value = date
  }
  
  const updatePeriod = (value) => {
    period.value = value
  }
  
  const getDateRangeParams = () => {
    return {
      startDate: startDate.value,
      endDate: endDate.value,
      period: period.value
    }
  }
  
  return {
    startDate,
    endDate,
    period,
    periodOptions,
    formattedStartDate,
    formattedEndDate,
    updateStartDate,
    updateEndDate,
    updatePeriod,
    getDateRangeParams
  }
}

