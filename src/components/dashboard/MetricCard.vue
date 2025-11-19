<template>
  <BaseCard class="metric-card">
    <div class="metric-card__header">
      <span class="metric-card__label">{{ label }}</span>
      <BaseTag v-if="tag" :variant="tagVariant">{{ tag }}</BaseTag>
    </div>
    
    <div class="metric-card__value">
      <div class="metric-card__dot-aux" :style="{ backgroundColor: dotColor }"></div>
      <div class="metric-card__dot" :style="{ backgroundColor: dotColor }"></div>
      <span class="metric-card__amount" v-if="isShowAmount">{{ formattedValue }}</span>
      <span class="metric-card__amount" v-else>
          R$
          <Dot size="15" strokeWidth="10" />
          <Dot size="15" strokeWidth="10" />
          <Dot size="15" strokeWidth="10" />
          <Dot size="15" strokeWidth="10" />
      </span>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '../BaseCard.vue'
import BaseTag from '../BaseTag.vue'
import { computed } from 'vue'
import { Dot } from 'lucide-vue-next';


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
  },
  isShowAmount: {
    type: Boolean,
    default: true,
    required: true
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
  border: 1px solid var(--color-border-light);
}

.metric-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-16);
}

.metric-card__label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
}

.metric-card__value {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
}

.metric-card__dot, .metric-card__dot-aux {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-right: 12px;
}

.metric-card__dot-aux {
  width: 18px;
  height: 18px;
  margin-right: -30px;
  filter: opacity(50%)
}

.metric-card__amount {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  line-height: var(--line-height-tight);
}
.metric-card__amount.hidden{
  color: var(--color-text-secondary);
  background: var(--color-background);
  filter: blur(4.5px);
  border-radius: var(--border-radius-xs);
  user-select: none;
  pointer-events: none;
  transition: filter 0.2s;
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

