<template>
  <span :class="['base-tag', `base-tag--${variant}`]">
    <slot />
  </span>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'success', 'warning', 'error', 'info'].includes(value)
  }
})
</script>

<style scoped>
.base-tag {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-4) var(--spacing-8);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-normal);
  margin: -6px 0;
}

.base-tag--default {
  background: var(--color-background);
  color: var(--color-text-primary);
}

.base-tag--success {
  background: #d1fae5;
  color: var(--color-success);
}

.base-tag--warning {
  background: #fef3c7;
  color: var(--color-warning);
}

.base-tag--error {
  background: #fee2e2;
  color: var(--color-error);
}

.base-tag--info {
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  color: var(--color-text-tertiary);
}
</style>

