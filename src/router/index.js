import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  // {
  //   path: '/clientes',
  //   name: 'Clientes',
  //   component: () => import('@/views/Clientes.vue')
  // },
  // {
  //   path: '/cobrancas',
  //   name: 'Cobrancas',
  //   component: () => import('@/views/Cobrancas.vue')
  // },
  // {
  //   path: '/carteira',
  //   name: 'Carteira',
  //   component: () => import('@/views/Carteira.vue')
  // },
  // {
  //   path: '/vendedores',
  //   name: 'Vendedores',
  //   component: () => import('@/views/Vendedores.vue')
  // },
  // {
  //   path: '/antecipacoes',
  //   name: 'Antecipacoes',
  //   component: () => import('@/views/Antecipacoes.vue')
  // },
  // {
  //   path: '/gestao',
  //   name: 'Gestao',
  //   component: () => import('@/views/Gestao.vue')
  // },
  // {
  //   path: '/integracoes',
  //   name: 'Integracoes',
  //   component: () => import('@/views/Integracoes.vue')
  // },
  // {
  //   path: '/configuracoes',
  //   name: 'Configuracoes',
  //   component: () => import('@/views/Configuracoes.vue')
  // },
  // {
  //   path: '/perfil',
  //   name: 'Perfil',
  //   component: () => import('@/views/Perfil.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

