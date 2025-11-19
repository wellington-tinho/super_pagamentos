<template>
  <aside :class="['sidebar', { 'sidebar--collapsed': isCollapsed }]">
    <div class="sidebar__logo">
        <img
          className="logo-super-pagamentos"
          src="/logo.svg"
          alt="Logo Super Pagamentos"
        />
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
            @click="setActive(item.path)"
          >
            <div class="sidebar__menu-icon">
              <component :is="item.icon" class="icon"/>
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
            @click.prevent="setActive(item.path)"
          >
            <div class="sidebar__menu-icon">
              <component :is="item.icon" class="icon"/>
            </div>
            <span class="sidebar__menu-text">{{ item.label }}</span>
          </li>
        </ul>
      </div>
    </nav>
    
    <div class="sidebar__card">
      <div class="sidebar__card-content">
        <div>
          <p class="sidebar__card-text">
            Solicite agora o seu <br>
            cartão físico e crie quantos cartões virtuais quiser.
          </p>
          <BaseButton variant="primary" class="sidebar__card-button">
            Super Cartão Pré-Pago
          </BaseButton>
        </div>
        
      </div>
    </div>
    
    <button class="sidebar__logout" @click="handleLogout">
      <span>Deslogar da conta</span>
      <component :is="Logout" />
    </button>
  </aside>
</template>

<script setup>
import BaseButton from '../BaseButton.vue'
import { ref } from 'vue'
import { useMenu } from '@/composables/useMenu'

import Logout from '@/assets/bottons/logout.svg'
import Dashboard from '@/assets/menu/dashboard.svg'
import Clients from '@/assets/menu/clients.svg'
import Payment from '@/assets/menu/payment.svg'
import Wallet from '@/assets/menu/wallet.svg'
import Sellers from '@/assets/menu/sellers.svg'
import Anticipations from '@/assets/menu/anticipations.svg'
import Management from '@/assets/menu/management.svg'
import Integrations from '@/assets/menu/integrations.svg'

import Settings from '@/assets/menu/settings.svg'
import Perfil from '@/assets/menu/perfil.svg'


const isActive = (path) => {
  return activeItemMenu.value === path
}
const setActive = (path) => {
  activeItemMenu.value = path
}

const { isCollapsed } = useMenu()

const menuItems = [
  { icon: Dashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Clients, label: 'Clientes', path: '/clients' },
  { icon: Payment, label: 'Cobranças', path: '/payment' },
  { icon: Wallet, label: 'Carteira', path: '/wallet' },
  { icon: Sellers, label: 'Vendedores', path: '/sellers' },
  { icon: Anticipations, label: 'Antecipações', path: '/anticipations', children: true },
  { icon: Management, label: 'Gestão', path: '/management', children: true },
  { icon: Integrations, label: 'Integrações', path: '/integrations' }
]

const activeItemMenu = ref(menuItems[0].path)


const generalItems = [
  { icon: Settings, label: 'Configurações', path: '/settings' },
  { icon: Perfil, label: 'Perfil', path: '/perfil' },
]


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
  padding: 15px var(--spacing-32);
  border-bottom: var(--border-width) solid var(--color-border-light);
  display: flex;
  gap: var(--spacing-8);
}

.logo-super-pagamentos{
  margin-top: 8px;
}

.sidebar__logo-text {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
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
  gap: var(--spacing-12);
  padding: var(--spacing-12) var(--spacing-32);
  cursor: pointer;
  transition: background 0.2s ease;
  position: relative;
}

.sidebar__menu-item:hover {
  background: var(--color-background);
}

.sidebar__menu-icon {
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-background);
  border-radius: var(--border-radius-full);
  padding: 10px;
  color: var(--color-secondary);
}


.sidebar__menu-item--active .sidebar__menu-icon {
  background: var(--color-primary-light);
}
.sidebar__menu-item--active .sidebar__menu-icon svg{
  color: var(--color-chart-blue);
  stroke: var(--color-chart-blue);
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
  background: linear-gradient(180deg, #1c1f22 0%, rgba(0, 0, 0, 0.27) 100%);
  border-radius: var(--border-radius-xl);
  position: relative;
  overflow: hidden;
  height: 350px;
}

.sidebar__card-content {
  position: relative;
  z-index: 1;
  background-image: url("/super cartao.png");
  background-size: cover;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
}

.sidebar__card-content  > div {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 20px;
  height: 100%;
  background: linear-gradient(0deg,  rgba(42, 46, 51, 1) 0%,  rgba(0, 0, 0, 0.63) 100%);
}


.sidebar__card-text {
  font-size: var(--font-size-lg);
  color: var(--color-white);
  line-height: var(--line-height-normal);
  margin-bottom: var(--spacing-24);
  font-family: var(--font-family);
  margin-inline: 14px;
  font-weight: var(--font-weight-semibold);
  text-align: center;
}

.sidebar__card-button {
  width: 100%;
  margin-bottom: var(--spacing-4);
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
