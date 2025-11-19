<template>
  <BaseCard class="revenue-card">
    <div class="revenue-card__header">
      <h2 class="revenue-card__title">Estatísticas do período</h2>
      <Funnel class="icon-funnel" size="40" color="black" @click="openDateRange"/>
    </div>
    
    <div class="revenue-card__value">
      <div class="revenue-card__value-container">
        <span class="revenue-card__currency">R$</span>
        <span class="revenue-card__amount" v-if="isShowAmount">
          {{ formattedValue }}
        </span>
        <span class="revenue-card__amount" v-else style="gap:0;">
          <Dot size="25" strokeWidth="10" />
          <Dot size="25" strokeWidth="10" />
          <Dot size="25" strokeWidth="10" />
          <Dot size="25" strokeWidth="10" />
        </span>
      </div>
      
      <div class="revenue-card__growth" v-if="growth">
        
        <span class="revenue-card__growth-value"><svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1L7 13M7 1L1 7M7 1L13 7" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg> {{ growth }}%</span>
      </div>
    </div>
    <DateRange
      ref="dateRangeRef"
      :shortcurts="true"
      class="revenue-card__date-range-helper"
    />
  </BaseCard>
</template>

<script setup>
import BaseCard from '../BaseCard.vue'
import DateRange from './DateRange.vue'
import { computed, ref } from 'vue'
import { Funnel, Dot } from 'lucide-vue-next';


const props = defineProps({
  value: {
    type: Number,
    default: 0
  },
  growth: {
    type: Number,
    default: null
  },
  isShowAmount: {
    type: Boolean,
    default: true,
    required: true
  }
})

const emit = defineEmits(['toggleShowAmount'])

const dateRangeRef = ref(null)

const formattedValue = computed(() => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(props.value - 300449.08)
})

const openDateRange = () => {
  if (dateRangeRef.value?.open) {
    dateRangeRef.value.open()
  }
}

</script>

<style scoped>

.icon-funnel{
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  border: 1px solid var(--color-text-secondary);
}
.revenue-card__date-range-helper{
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

:deep(.demo-datetime-picker-icon){
  display: none;
}

.revenue-card__value-container{
  gap: var(--spacing-8);
  display: flex;
  align-items: center;
  justify-content: center;
}

  .revenue-card {
    padding: 0;
    background: transparent;
    box-shadow: none;
    border-radius: 0;
  }
  
  .revenue-card :deep(.base-card) {
    background: transparent;
    box-shadow: none;
    padding: 0;
  }
  
  .revenue-card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: var(--spacing-12);
  }
  
  .revenue-card__title {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    font-family: var(--font-family);
    color: var(--color-text-primary);
  }
  
  
  .revenue-card__value-container {
    justify-content: flex-start;
  }
  
  .revenue-card__amount {
    font-size: var(--font-size-xl);
  }
  
  .revenue-card__currency {
    font-size: var(--font-size-sm);
  }
  
  .revenue-card__growth {
    flex-direction: row;
    align-items: start;
    gap: var(--spacing-8);
  }
  
  .revenue-card__growth-text {
    font-size: var(--font-size-sm);
  }
  
  .icon-eye {
    width: 20px;
    height: 20px;
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
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-16);
}

.revenue-card__currency {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-secondary);
  margin: 4px 4px 0 0;
}

.revenue-card__amount {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  line-height: var(--line-height-tight);
}

.revenue-card__growth {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

