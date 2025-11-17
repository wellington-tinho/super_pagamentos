<template>
  <div :class="['base-card', { 'base-card--padding': padding }]">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  padding: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
.base-card {
  background: var(--color-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
}

.base-card--padding {
  padding: var(--spacing-24);
}
</style>

