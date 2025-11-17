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
      <div class="card-brands-chart__bars">
        <div
          v-for="(bar, index) in bars"
          :key="index"
          class="card-brands-chart__bar"
          :style="{ height: `${(bar.value / maxValue) * 100}%` }"
        ></div>
      </div>
      
      <div class="card-brands-chart__brands">
        <img
          v-for="(brand, index) in brands"
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
import BaseCard from '../BaseCard.vue'
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => []
  }
})

const maxValue = computed(() => {
  return Math.max(...props.data.map(item => item.value))
})

const bars = computed(() => {
  return props.data.map(item => ({ value: item.value }))
})

const brands = computed(() => {
  return props.data.map(item => ({
    name: item.name,
    logo: item.logo || '/placeholder-brand.png'
  }))
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

.card-brands-chart__bars {
  display: flex;
  align-items: flex-end;
  gap: var(--spacing-4);
  height: 99px;
}

.card-brands-chart__bar {
  flex: 1;
  background: var(--color-chart-blue);
  border-radius: var(--border-radius-sm) var(--border-radius-sm) 0 0;
  min-height: 8px;
  transition: height 0.3s ease;
}

.card-brands-chart__brands {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-8);
}

.card-brands-chart__brand-logo {
  height: 24px;
  width: auto;
  object-fit: contain;
}

@media (max-width: 768px) {
  .card-brands-chart {
    padding: var(--spacing-16);
  }
  
  .card-brands-chart__bars {
    height: 80px;
  }
  
  .card-brands-chart__brand-logo {
    height: 18px;
  }
}
</style>

