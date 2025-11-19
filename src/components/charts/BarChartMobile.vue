<template>
  <div class="bar-chart">
    <apexchart
      type="bar"
      :height="isMobile ? 160 : 300"
      :options="chartOptions"
      :series="series"
      class="bar-chart__apex"
      :key="isShowAmount"
    />
    <p class="apex-label">De 15 de Dez. de 2024 à 07 de Fev. de 2025</p>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => []
  },
  isShowAmount: {
    type: Boolean,
    default: true,
    required: true
  }
})

const isMobile = ref(false)

const handleResize = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth <= 768
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', handleResize)
    handleResize()
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize)
  }
})

// Escala fixa de 0 a 200K
const FIXED_MAX = 200000
const THRESHOLD = 50000 // 50K - ponto onde começa o gradiente azul para verde

const series = computed(() => {
  return [{
    name: 'Faturamento',
    data: props.data.map(item => item.value)
  }]
})

const chartOptions = computed(() => {
  return {
    chart: {
      type: 'bar',
      height: isMobile.value ? 120 : 162,
      toolbar: { show: false },
      sparkline: { enabled: false },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: isMobile.value ? '6px' : '8px',
        borderRadius: '4',
        distributed: true,
        dataLabels: {
          position: 'top'
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: false
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: props.data.map(item => {
          // Se o valor é maior ou igual a 50K, usa verde como cor final do gradiente
          if (item.value > THRESHOLD) {
            return '#10b981'
          }
          // Se o valor é menor que 50K, mantém azul
          return '#0641fc'
        }),
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    colors: props.data.map(item => {
      // Cor base do gradiente (sempre azul para começar)
      if (item.value < THRESHOLD) {
        return '#0641fc'
      }
      // Para valores >= 50K, começa com azul e gradiente vai para verde
      return '#0641fc'
    }),
    xaxis: {
      categories: props.data.map(item => item.day),
      labels: {
        style: {
          fontSize: isMobile.value ? '10px' : '12px',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          colors: '#86898b'
        },
        offsetY: 0,
        rotate: 0
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      min: 0,
      max: FIXED_MAX,
      tickAmount: 4,
      labels: {
        style: {
          fontSize: isMobile.value ? '10px' : '12px',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          colors: '#86898b'
        },
        formatter: (value) => {
          if (!props.isShowAmount) {
            return ''
          }
        }
      }
    },
    grid: {
      show: true,
      borderColor: '#eeeeee',
      strokeDashArray: 0,
      position: 'back',
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true,
          strokeDashArray: 0
        }
      },
      padding: {
        top: 0,
        right: 10,
        bottom: 0,
        left: -40
      }
    },
    tooltip: {
      enabled: true,
      theme: 'light',
      style: {
        fontSize: '12px',
        fontFamily: 'Plus Jakarta Sans, sans-serif'
      },
      y: {
        formatter: (value) => {
          if (!props.isShowAmount) {
            return '****'
          }
          return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0
          }).format(value)
        }
      }
    },
    legend: {
      show: false
    }
  }
})
</script>

<style scoped>
.bar-chart {
  width: 100%;
}

.apex-label{
  background: var(--color-white);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  font-family: var(--font-family);
  color: var(--color-text-secondary);
  text-align: center;
  margin-top: -34px;
  z-index: 1;
  padding: 4px;
  position: relative;
}

.bar-chart__apex :deep(.apexcharts-canvas) {
  font-family: var(--font-family) !important;
}
</style>

