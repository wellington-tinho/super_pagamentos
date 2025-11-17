<template>
  <aside :class="['sidebar', { 'sidebar--collapsed': isCollapsed }]">
    <div class="sidebar__logo">
      <span class="sidebar__logo-text">super</span>
    </div>
    
    <nav class="sidebar__nav">
      <div class="sidebar__section">
        <h3 class="sidebar__section-title">MENU</h3>
        <ul class="sidebar__menu">
          <li
            v-for="item in menuItems"
            :key="item.path"
            :class="['sidebar__menu-item', { 'sidebar__menu-item--active': isActive(item.path) }]"
            @click="navigate(item.path)"
          >
            <div class="sidebar__menu-icon">
              <Icon :name="item.icon" />
            </div>
            <span class="sidebar__menu-text">{{ item.label }}</span>
            <svg
              v-if="item.children"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              class="sidebar__menu-arrow"
            >
              <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </li>
        </ul>
      </div>
      
      <div class="sidebar__section">
        <h3 class="sidebar__section-title">GERAL</h3>
        <ul class="sidebar__menu">
          <li
            v-for="item in generalItems"
            :key="item.path"
            :class="['sidebar__menu-item', { 'sidebar__menu-item--active': isActive(item.path) }]"
            @click="navigate(item.path)"
          >
            <div class="sidebar__menu-icon">
              <Icon :name="item.icon" />
            </div>
            <span class="sidebar__menu-text">{{ item.label }}</span>
          </li>
        </ul>
      </div>
    </nav>
    
    <div class="sidebar__card">
      <div class="sidebar__card-content">
        <h4 class="sidebar__card-title">Super Cartão Pré-Pago</h4>
        <p class="sidebar__card-text">
          Solicite agora o seu cartão físico e crie quantos cartões virtuais quiser.
        </p>
        <BaseButton variant="primary" class="sidebar__card-button">
          Super Cartão Pré-Pago
        </BaseButton>
      </div>
    </div>
    
    <button class="sidebar__logout" @click="handleLogout">
      <span>Deslogar da conta</span>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 1L9 17M9 17L17 9M9 17L1 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BaseButton from '../BaseButton.vue'
import Icon from '../Icon.vue'
import { useMenu } from '@/composables/useMenu'

const router = useRouter()
const route = useRoute()
const { isCollapsed } = useMenu()

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: 'home' },
  { path: '/clientes', label: 'Clientes', icon: 'user' },
  { path: '/cobrancas', label: 'Cobranças', icon: 'money' },
  { path: '/carteira', label: 'Carteira', icon: 'wallet' },
  { path: '/vendedores', label: 'Vendedores', icon: 'fire' },
  { path: '/antecipacoes', label: 'Antecipações', icon: 'cash', children: true },
  { path: '/gestao', label: 'Gestão', icon: 'case', children: true },
  { path: '/integracoes', label: 'Integrações', icon: 'code' }
]

const generalItems = [
  { path: '/configuracoes', label: 'Configurações', icon: 'settings' },
  { path: '/perfil', label: 'Perfil', icon: 'user' }
]

const isActive = (path) => {
  return route.path === path
}

const navigate = (path) => {
  router.push(path)
}

const handleLogout = () => {
  console.log('Logout')
}

</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: var(--sidebar-width);
  background: var(--color-white);
  border-right: var(--border-width) solid var(--color-border-light);
  display: flex;
  flex-direction: column;
  z-index: 100;
  transition: width 0.3s ease;
}

.sidebar__logo {
  padding: var(--spacing-24) var(--spacing-32);
  border-bottom: var(--border-width) solid var(--color-border-light);
}

.sidebar__logo-text {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.sidebar__nav {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-24) 0;
}

.sidebar__section {
  margin-bottom: var(--spacing-32);
}

.sidebar__section-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 1.44px;
  padding: 0 var(--spacing-32);
  margin-bottom: var(--spacing-16);
}

.sidebar__menu {
  list-style: none;
}

.sidebar__menu-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-10);
  padding: var(--spacing-12) var(--spacing-32);
  cursor: pointer;
  transition: background 0.2s ease;
  position: relative;
}

.sidebar__menu-item:hover {
  background: var(--color-background);
}

.sidebar__menu-item--active {
  background: var(--color-primary-light);
}

.sidebar__menu-item--active .sidebar__menu-text {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
}

.sidebar__menu-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-background);
  border-radius: var(--border-radius-full);
  padding: var(--spacing-12);
  color: var(--color-text-secondary);
}

.sidebar__menu-item--active .sidebar__menu-icon {
  background: var(--color-primary-light);
  color: var(--color-primary);
}

.sidebar__menu-text {
  flex: 1;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.sidebar__menu-arrow {
  width: 24px;
  height: 24px;
  color: var(--color-text-secondary);
}

.sidebar__card {
  margin: var(--spacing-24) var(--spacing-16);
  padding: var(--spacing-24);
  background: linear-gradient(180deg, #2a2e33 0%, rgba(0, 0, 0, 0.27) 100%);
  border-radius: var(--border-radius-xl);
  position: relative;
  overflow: hidden;
}

.sidebar__card-content {
  position: relative;
  z-index: 1;
}

.sidebar__card-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-white);
  margin-bottom: var(--spacing-8);
  text-align: center;
}

.sidebar__card-text {
  font-size: var(--font-size-sm);
  color: var(--color-white);
  line-height: var(--line-height-normal);
  margin-bottom: var(--spacing-16);
  text-align: center;
}

.sidebar__card-button {
  width: 100%;
}

.sidebar__logout {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-8);
  padding: var(--spacing-12) var(--spacing-32);
  margin: var(--spacing-16);
  background: var(--color-background);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.sidebar__logout:hover {
  background: var(--color-white);
  border-color: var(--color-primary);
}

@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}
</style>
