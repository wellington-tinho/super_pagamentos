<template>
  <BaseCard class="financial-metrics-card">
    <div class="financial-metrics-card__header">
      <h3 class="financial-metrics-card__title">{{ title }}
        <span class="pending-transfer-card__badge" v-if="showBadge">
         <span>!</span>
        </span>
      </h3>
      <div v-if="showPercentage" class="financial-metrics-card__percentage">
        <span>%</span>
      </div>
    </div>
    
    <div class="financial-metrics-card__content">
      <div class="financial-metrics-card__value">{{ formattedAmount }}</div>
      <div class="financial-metrics-card__divider"></div>
      <div class="financial-metrics-card__footer">
        <span class="financial-metrics-card__count">{{ count }} cobranças</span>
        <span v-if="percentage" class="financial-metrics-card__percentage-value">{{ percentage }}%</span>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '../BaseCard.vue'
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  percentage: {
    type: Number,
    default: null
  },
  showPercentage: {
    type: Boolean,
    default: false
  },
  showBadge: {
    type: Boolean,
    default: false
  },
  
})

const formattedAmount = computed(() => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(props.amount)
})
</script>

<style scoped>
.financial-metrics-card {
  padding: var(--spacing-24);
}

.financial-metrics-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-16);
}

.financial-metrics-card__title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.financial-metrics-card__percentage {
  width: 48px;
  height: 48px;
  border-radius: var(--border-radius-full);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.pending-transfer-card__badge {
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background: var(--color-warning);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-left: 6px;
  line-height: 0;
  color: var(--color-text-primary);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
}


.financial-metrics-card__content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-16);
}

.financial-metrics-card__value {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  line-height: var(--line-height-tight);
}

.financial-metrics-card__divider {
  height: 1px;
  background: var(--color-border-light);
}

.financial-metrics-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.financial-metrics-card__count {
  font-size: var(--font-size-base);
  color: var(--color-text-tertiary);
  font-weight: var(--font-weight-semibold);
}

.financial-metrics-card__percentage-value {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

@media (max-width: 768px) {
  .financial-metrics-card {
    padding: var(--spacing-16);
  }
  
  .financial-metrics-card__value {
    font-size: var(--font-size-xl);
  }
}
</style>

