<template>
  <header class="mobile-header">
    
    <div class="mobile-header__content">
      <div class="mobile-header__profile">
        <div class="mobile-header__avatar">
          <img src="/avatar-mobile.png" alt="Avatar" />
        </div>
        <div class="mobile-header__profile-info">
          <span class="mobile-header__name">Empresarial</span>
          <span class="mobile-header__company">Astra Pagamentos</span>
        </div>
        <ChevronDown  style="margin-left: 10px;" size="18" color="black"/>
      </div>
      
      <div class="mobile-header__actions">
        <Bell color="white"/>
      </div>
    </div>
    
    <div v-if="showRevenue" class="mobile-header__revenue">
      <h1 class="mobile-header__revenue-title">Faturamento</h1>
      <div class="mobile-header__revenue-value">
        <div>
          <span class="mobile-header__revenue-currency">R$</span>
          <span class="mobile-header__revenue-amount"  v-if="isShowAmount">{{ formattedValue }}</span>
          <span class="mobile-header__revenue-amount" v-else style="gap:0;">
            <Dot size="25" strokeWidth="10" />
            <Dot size="25" strokeWidth="10" />
            <Dot size="25" strokeWidth="10" />
            <Dot size="25" strokeWidth="10" />
          </span>
        </div>
        <div>
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
      </div>
      <div class="mobile-header__revenue-actions">
        <span class="mobile-header__revenue-link">Ir para a carteira</span>
        <ChevronDown  style="rotate: 270deg;" size="18"/>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import {Bell, ChevronDown, Eye, EyeClosed, Dot } from 'lucide-vue-next';

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
  },
  isShowAmount: {
    type: Boolean,
    default: true,
    required: true
  }
})

const emit = defineEmits(['toggleShowAmount'])

const handleChangeIsShowAmount = () => {
  emit('toggleShowAmount')
}


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
  display: flex;
  flex-direction: column;
}

.mobile-header__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-24);
  margin-inline: 25px;
  margin-top: 44px;
}

.mobile-header__profile {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
  background: rgba(240, 240, 240, 0.1);
  background-color: var(--color-white);
  padding: var(--spacing-8);
  border-radius: var(--border-radius-full);
  min-width: 14rem;
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
  margin-inline: 25px;
}

.mobile-header__revenue-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-white);
}

.mobile-header__revenue-value {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--spacing-8);
  margin-bottom: var(--spacing-12);
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
  padding-top: var(--spacing-16);
  margin-bottom: var(--spacing-16);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
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

