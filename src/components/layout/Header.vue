<template>
  <header class="header">
    <div class="header__left">
      <h1 class="header__title">Super central de gestão</h1>
      <img
          src="/icone-super.svg"
          alt="sinueta azul de homem com capa com o braço esquerto levantado"
        />
    </div>
    
    <div class="header__right">
      <button class="header__icon-button">
        <Calculator />
      </button>
      
      <button class="header__icon-button">
        <Settings />
      </button>
      
      <button class="header__icon-button">
        <Bell />
      </button>
      
      <div class="header__profile">
        <div class="header__profile-avatar">AP</div>
        <div class="header__profile-info">
          <span class="header__profile-name">Empresarial</span>
          <span class="header__profile-company">Astra Pagamentos</span>
        </div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </header>
</template>

<script setup>
import { Calculator, Settings, Bell  } from 'lucide-vue-next';

</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: var(--sidebar-width);
  right: 0;
  height: var(--header-height);
  background: var(--color-white);
  border-bottom: var(--border-width) solid var(--color-border-light);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--spacing-24);
  z-index: 90;
}

.header__left {
  display: flex;
  align-items: center;
  gap: var(--spacing-12);
}

.header__title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.header__right {
  display: flex;
  align-items: center;
  gap: var(--spacing-16);
}

.header__icon-button {
  width: 32px;
  height: 32px;
  padding: var(--spacing-6);
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-secondary);
  transition: color 0.2s ease;
}

.header__icon-button:hover {
  color: var(--color-primary);
}

.header__profile {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
  padding: var(--spacing-6) var(--spacing-8);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: background 0.2s ease;
}

.header__profile:hover {
  background: var(--color-background);
}

.header__profile-avatar {
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background: var(--color-primary);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
}

.header__profile-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.header__profile-name {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.header__profile-company {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

@media (max-width: 768px) {
  .header {
    display: none;
  }
}
</style>

