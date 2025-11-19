<template>
  <nav class="bottom-nav">
    <button
      v-for="item in menuItems"
      :key="item.path"
      :class="['bottom-nav__item', { 'bottom-nav__item--active': isActive(item.path) }]"
      @click="navigate(item.path)"
    >
      <Icon :name="item.icon" v-if="item.icon != 'add'" />
      <component :is="AddCircle" v-else class="icon-add" />
      <span class="bottom-nav__label" v-if="item.icon != 'add'">{{ item.label }}</span>
    </button>
  </nav>
</template>

<script setup>
import AddCircle from '@/assets/bottons/add-circle.svg'

import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Icon from '../Icon.vue'

const router = useRouter()
const route = useRoute()

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: 'home' },
  { path: '/clientes', label: 'Clientes', icon: 'user' },
  { path: '/bottons/add-circle', label: '*', icon: 'add' },
  { path: '/cobrancas', label: 'Cobranças', icon: 'money' },
  { path: '/carteira', label: 'Carteira', icon: 'wallet' }
]

const isActive = (path) => {
  return route.path === path
}

const navigate = (path) => {
  router.push(path)
}
</script>

<style scoped>

.icon-add{
  background-color: var(--color-primary);
  border-radius: 50%;
  padding: 2px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -40px;
}
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: var(--color-white);
  border-top: var(--border-width) solid var(--color-border-light);
  padding: var(--spacing-8) var(--spacing-16);
  z-index: 100;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
}

.bottom-nav__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-4);
  padding: var(--spacing-8);
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: color 0.2s ease;
  flex: 1;
  max-width: 80px;
}

.bottom-nav__item:hover {
  color: var(--color-primary);
}

.bottom-nav__item--active {
  color: var(--color-primary);
}

.bottom-nav__label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
}

@media (min-width: 769px) {
  .bottom-nav {
    display: none;
  }
}
</style>

