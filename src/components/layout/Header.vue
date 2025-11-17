<template>
  <header class="header">
    <div class="header__left">
      <h1 class="header__title">Super central de gestão</h1>
    </div>
    
    <div class="header__right">
      <button class="header__icon-button">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 6L6 16L16 26M26 6L16 16L26 26" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      
      <button class="header__icon-button">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 6C10.477 6 6 10.477 6 16C6 21.523 10.477 26 16 26C21.523 26 26 21.523 26 16C26 10.477 21.523 6 16 6Z" stroke="currentColor" stroke-width="2"/>
          <path d="M16 10V16L20 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      
      <button class="header__icon-button">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M8 12C8 10.895 8.895 10 10 10H22C23.105 10 24 10.895 24 12V20C24 21.105 23.105 22 22 22H10C8.895 22 8 21.105 8 20V12Z" stroke="currentColor" stroke-width="2"/>
          <path d="M12 16H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      
      <button class="header__icon-button">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 20C18.209 20 20 18.209 20 16C20 13.791 18.209 12 16 12C13.791 12 12 13.791 12 16C12 18.209 13.791 20 16 20Z" stroke="currentColor" stroke-width="2"/>
          <path d="M6 16H10M22 16H26M16 6V10M16 22V26" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: var(--spacing-6);
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-text-secondary);
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

