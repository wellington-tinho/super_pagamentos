<template>
  <BaseCard class="metric-card">
    <div class="metric-card__header">
      <span class="metric-card__label">{{ label }}</span>
      <BaseTag v-if="tag" :variant="tagVariant">{{ tag }}</BaseTag>
    </div>
    
    <div class="metric-card__value">
      <div class="metric-card__dot" :style="{ backgroundColor: dotColor }"></div>
      <span class="metric-card__amount">{{ formattedValue }}</span>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '../BaseCard.vue'
import BaseTag from '../BaseTag.vue'
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: [Number, String],
    required: true
  },
  dotColor: {
    type: String,
    default: '#0641fc'
  },
  tag: {
    type: String,
    default: ''
  },
  tagVariant: {
    type: String,
    default: 'default'
  },
  isCurrency: {
    type: Boolean,
    default: true
  }
})

const formattedValue = computed(() => {
  if (props.isCurrency) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(props.value)
  }
  return new Intl.NumberFormat('pt-BR').format(props.value)
})
</script>

<style scoped>
.metric-card {
  padding: var(--spacing-16);
}

.metric-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-16);
}

.metric-card__label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
}

.metric-card__value {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
}

.metric-card__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.metric-card__amount {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  line-height: var(--line-height-tight);
}

@media (max-width: 768px) {
  .metric-card {
    padding: var(--spacing-12);
  }
  
  .metric-card__amount {
    font-size: var(--font-size-xl);
  }
}
</style>

