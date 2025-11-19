<template>
  <BaseCard class="revenue-card">
    <div class="revenue-card__header">
      <h2 class="revenue-card__title">Faturamento</h2>
      <Eye
        class="icon-eye"
        v-if="isShowAmount" 
        @click="handleChangeIsShowAmount"
      />
      <EyeClosed 
        v-else
        class="icon-eye"
        @click="handleChangeIsShowAmount"
      />
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
        <span class="revenue-card__growth-text">Em crescimento</span>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '../BaseCard.vue'
import { computed } from 'vue'
import { Eye, EyeClosed, Dot } from 'lucide-vue-next';


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

const formattedValue = computed(() => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(props.value)
})

const handleChangeIsShowAmount = () => {
  emit('toggleShowAmount')
}


</script>

<style scoped>

.icon-eye{
  font-size: 24;
  color: var(--color-text-secondary);
  cursor: pointer;
}

.revenue-card {
  padding: var(--spacing-24);
}
.revenue-card__value-container{
  gap: var(--spacing-8);
  display: flex;
  align-items: center;
  justify-content: center;
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
  justify-content: flex-start;
  gap: var(--spacing-12);
  margin-bottom: var(--spacing-16);
}

.revenue-card__title {
  font-size: var(--font-size-xl);
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
  align-items: center;
  gap: var(--spacing-12);
  margin-bottom: var(--spacing-16);
}

.revenue-card__currency {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-secondary);
  margin: 4px 4px 0 0;
}

.revenue-card__amount {
  font-size: 40px;
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
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

