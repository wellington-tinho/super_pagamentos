<template>
  <BaseCard class="pending-transfer-card">
    <div class="pending-transfer-card__content">
      <div class="pending-transfer-card__icon">
        <div class="pending-transfer-card__icon-bg">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 5V19M12 5L5 12M12 5L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="pending-transfer-card__badge">
          <span>!</span>
        </div>
      </div>
      
      <div class="pending-transfer-card__info">
        <h3 class="pending-transfer-card__title">Solicitação de transferência pendente</h3>
        <p class="pending-transfer-card__description">
          A transação no valor de {{ formattedAmount }} está aguardando a sua aprovação.
        </p>
      </div>
      
      <BaseButton variant="primary" @click="handleAuthorize">
        Autorizar transferência
        <template #icon-right>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 1L9 17M9 17L17 9M9 17L1 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </template>
      </BaseButton>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '../BaseCard.vue'
import BaseButton from '../BaseButton.vue'
import { computed } from 'vue'

const props = defineProps({
  amount: {
    type: Number,
    required: true
  },
  transferId: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['authorize'])

const formattedAmount = computed(() => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(props.amount)
})

const handleAuthorize = () => {
  emit('authorize', props.transferId)
}
</script>

<style scoped>
.pending-transfer-card {
  padding: var(--spacing-24);
}

.pending-transfer-card__content {
  display: flex;
  align-items: center;
  gap: var(--spacing-24);
}

.pending-transfer-card__icon {
  position: relative;
  flex-shrink: 0;
}

.pending-transfer-card__icon-bg {
  width: 57px;
  height: 57px;
  border-radius: 50%;
  background: var(--color-warning);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
}

.pending-transfer-card__badge {
  position: absolute;
  bottom: -4px;
  right: -4px;
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background: var(--color-error);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
}

.pending-transfer-card__info {
  flex: 1;
}

.pending-transfer-card__title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-8);
}

.pending-transfer-card__description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-normal);
}

@media (max-width: 768px) {
  .pending-transfer-card {
    padding: var(--spacing-16);
  }
  
  .pending-transfer-card__content {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-16);
  }
  
  .pending-transfer-card__info {
    width: 100%;
  }
}
</style>

