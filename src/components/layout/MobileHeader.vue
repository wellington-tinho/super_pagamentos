<template>
  <header class="mobile-header">
    <div class="mobile-header__status-bar">
      <span class="mobile-header__time">19:02</span>
      <div class="mobile-header__status-icons">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 1L9 17M9 17L17 9M9 17L1 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    
    <div class="mobile-header__content">
      <div class="mobile-header__profile">
        <div class="mobile-header__avatar">
          <img v-if="avatar" :src="avatar" alt="Avatar" />
          <span v-else>AP</span>
        </div>
        <div class="mobile-header__profile-info">
          <span class="mobile-header__name">Empresarial</span>
          <span class="mobile-header__company">Astra Pagamentos</span>
        </div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      
      <div class="mobile-header__actions">
        <button class="mobile-header__action-btn">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 20C18.209 20 20 18.209 20 16C20 13.791 18.209 12 16 12C13.791 12 12 13.791 12 16C12 18.209 13.791 20 16 20Z" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>
        <button class="mobile-header__action-btn">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 6C10.477 6 6 10.477 6 16C6 21.523 10.477 26 16 26C21.523 26 26 21.523 26 16C26 10.477 21.523 6 16 6Z" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>
      </div>
    </div>
    
    <div v-if="showRevenue" class="mobile-header__revenue">
      <h1 class="mobile-header__revenue-title">Faturamento</h1>
      <div class="mobile-header__revenue-value">
        <span class="mobile-header__revenue-currency">R$</span>
        <span class="mobile-header__revenue-amount">{{ formattedValue }}</span>
      </div>
      <div class="mobile-header__revenue-actions">
        <button class="mobile-header__revenue-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 4V20M12 4L8 8M12 4L16 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <span class="mobile-header__revenue-link">Ir para a carteira</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    default: 0
  },
  showRevenue: {
    type: Boolean,
    default: true
  },
  avatar: {
    type: String,
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
.mobile-header {
  background: var(--color-primary);
  border-radius: 0 0 var(--border-radius-md) var(--border-radius-md);
  padding: var(--spacing-10) var(--spacing-24);
  color: var(--color-white);
  min-height: 309px;
  display: flex;
  flex-direction: column;
}

.mobile-header__status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-16);
  height: 44px;
}

.mobile-header__time {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-white);
}

.mobile-header__status-icons {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
  color: var(--color-white);
}

.mobile-header__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-24);
}

.mobile-header__profile {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
  background: rgba(240, 240, 240, 0.1);
  padding: var(--spacing-6);
  border-radius: var(--border-radius-full);
}

.mobile-header__avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-base);
  border: 1px solid var(--color-text-secondary);
  overflow: hidden;
}

.mobile-header__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mobile-header__profile-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.mobile-header__name {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.mobile-header__company {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.mobile-header__actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
}

.mobile-header__action-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-white);
}

.mobile-header__revenue {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
  padding-top: var(--spacing-16);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.mobile-header__revenue-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-white);
}

.mobile-header__revenue-value {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-8);
}

.mobile-header__revenue-currency {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--color-primary-light);
}

.mobile-header__revenue-amount {
  font-size: 40px;
  font-weight: var(--font-weight-bold);
  color: var(--color-white);
  line-height: 1;
}

.mobile-header__revenue-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
  margin-top: var(--spacing-8);
}

.mobile-header__revenue-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(51, 100, 255, 1);
  border: none;
  border-radius: var(--border-radius-full);
  cursor: pointer;
  color: var(--color-white);
}

.mobile-header__revenue-link {
  flex: 1;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary-light);
}

@media (min-width: 769px) {
  .mobile-header {
    display: none;
  }
}
</style>

