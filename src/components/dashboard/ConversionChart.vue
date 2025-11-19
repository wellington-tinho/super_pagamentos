<template>
  <BaseCard class="conversion-chart">
    <h3 class="conversion-chart__title">Conversão por modalidade</h3>
    
    <div class="conversion-chart__content">
      <div
        v-for="(item, index) in chartData"
        :key="index"
        class="conversion-chart__item"
      >
        <div class="conversion-chart__donut-wrapper">
          <div class="conversion-chart__chart-container">
            <apexchart
              type="donut"
              :width="120"
              :height="120"
              :options="getChartOptions(item)"
              :series="[item.percentage, 100 - item.percentage]"
              class="conversion-chart__apex"
              />
            <span class="conversion-chart__percentage">{{ item.percentage }}%</span>
          </div>
          <div class="conversion-chart__label">
            <span class="conversion-chart__text">{{ item.label }}</span>
          </div>
        </div>
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

const chartData = computed(() => {
  return props.data.map(item => ({
    percentage: item.percentage,
    label: item.label,
    color: getColorByLabel(item.label)
  }))
})

const getColorByLabel = (label) => {
  const colorMap = {
    'Crédito': '#0641fc',
    'Débito': '#7c3aed',
    'Boleto': '#a78bfa',
    'Pix': '#60a5fa'
  }
  return colorMap[label] || '#0641fc'
}

const getChartOptions = (item) => {
  return {
    plotOptions: {
      pie: {
        donut: {
          size: '86%',
          labels: {
            show: false
          }
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: false,
      width: 0,
      radius: 10
    },
    colors: [item.color, '#edeff4'],
    fill: {
      type: 'solid',
      colors: [item.color, '#edeff4'],
    },
    legend: {
      show: false
    },
    tooltip: {
      enabled: false
    },
    states: {
      hover: {
        filter: {
          type: 'none'
        }
      },
      active: {
        filter: {
          type: 'none'
        }
      }
    }
  }
}
</script>

<style scoped>
.conversion-chart {
  padding: var(--spacing-24);
}

.conversion-chart__title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-24);
}

.conversion-chart__content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(88px, 1fr));
  gap: var(--spacing-24);
  justify-items: center;
}

.conversion-chart__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-8);
}

.conversion-chart__donut-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-8);
}

.conversion-chart__chart-container {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.conversion-chart__apex {
  position: absolute;
  top: 0;
  left: 0;
}

.conversion-chart__percentage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  z-index: 1;
  pointer-events: none;
}

.conversion-chart__label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-4);
  margin-top: var(--spacing-8);
}

.conversion-chart__text {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  text-align: center;
}

@media (max-width: 768px) {
  .conversion-chart {
    padding: var(--spacing-16);
  }
  
  .conversion-chart__content {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-16);
  }
}
</style>

