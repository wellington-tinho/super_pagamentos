<template>
  <BaseCard class="revenue-card">
    <div class="revenue-card__header">
      <h2 class="revenue-card__title">Faturamento</h2>
      <button class="revenue-card__info">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <path d="M12 16V12M12 8H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
    
    <div class="revenue-card__value">
      <span class="revenue-card__currency">R$</span>
      <span class="revenue-card__amount">{{ formattedValue }}</span>
    </div>
    
    <div class="revenue-card__growth" v-if="growth">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1L7 13M7 1L1 7M7 1L13 7" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="revenue-card__growth-value">{{ growth }}%</span>
      <span class="revenue-card__growth-text">Em crescimento</span>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '../BaseCard.vue'
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    default: 0
  },
  growth: {
    type: Number,
    default: null
  }
})

const formattedValue = computed(() => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(props.value)
})
</script>

<style scoped>
.revenue-card {
  padding: var(--spacing-24);
}

@media (max-width: 768px) {
  .revenue-card {
    padding: var(--spacing-16);
  }
  
  .revenue-card__amount {
    font-size: var(--font-size-2xl);
  }
}

.revenue-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-16);
}

.revenue-card__title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.revenue-card__info {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-text-secondary);
}

.revenue-card__value {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-8);
  margin-bottom: var(--spacing-16);
}

.revenue-card__currency {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.revenue-card__amount {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  line-height: var(--line-height-tight);
}

.revenue-card__growth {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
}

.revenue-card__growth-value {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-success);
}

.revenue-card__growth-text {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
}
</style>

