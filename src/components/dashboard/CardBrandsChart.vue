<template>
  <BaseCard class="card-brands-chart">
    <div class="card-brands-chart__header">
      <h3 class="card-brands-chart__title">Bandeiras mais utilizadas</h3>
      <button class="card-brands-chart__info">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/>
          <path d="M8 12V8M8 4H8.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
    
    <div class="card-brands-chart__content">
      <div class="card-brands-chart__chart-wrapper">
        <apexchart
          type="bar"
          height="99"
          :options="chartOptions"
          :series="series"
          class="card-brands-chart__apex"
        />
      </div>
      
      <div class="card-brands-chart__brands">
        <img
          v-for="(brand, index) in data"
          :key="index"
          :src="brand.logo"
          :alt="brand.name"
          class="card-brands-chart__brand-logo"
        />
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import { computed } from 'vue'
import BaseCard from '../BaseCard.vue'

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => []
  }
})

const maxValue = computed(() => {
  if (!props.data || props.data.length === 0) return 100
  return Math.max(...props.data.map(item => item.value))
})

const series = computed(() => {
  return [{
    name: 'Uso',
    data: props.data.map(item => item.value)
  }]
})

const chartOptions = computed(() => {
  return {
    chart: {
      type: 'bar',
      height: 99,
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
        columnWidth: '8',
        borderRadius: 4, 
        distributed: false,
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
    colors: ['#0641fc'],
    xaxis: {
      categories: props.data.map(() => ''),
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: false
    },
    grid: {
      show: false
    },
    tooltip: {
      enabled: false
    },
    legend: {
      show: false
    }
  }
})
</script>

<style scoped>
.card-brands-chart {
  padding: var(--spacing-24);
}

.card-brands-chart__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-24);
}

.card-brands-chart__title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.card-brands-chart__info {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-text-secondary);
}

.card-brands-chart__content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-16);
}

.card-brands-chart__chart-wrapper {
  width: 100%;
  height: 99px;
}

.card-brands-chart__apex {
  width: 100%;
}

.card-brands-chart__brands {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-8);
  flex-wrap: wrap;
}

.card-brands-chart__brand-logo {
  height: 24px;
  width: auto;
  object-fit: contain;
  flex: 1;
  min-width: 0;
}

@media (max-width: 768px) {
  .card-brands-chart {
    padding: var(--spacing-16);
  }
  
  .card-brands-chart__chart-wrapper {
    height: 80px;
  }
  
  .card-brands-chart__brand-logo {
    height: 18px;
  }
}
</style>

