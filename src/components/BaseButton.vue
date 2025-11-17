<template>
  <button
    :class="['base-button', `base-button--${variant}`, { 'base-button--full': fullWidth }]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot name="icon-left" />
    <span v-if="$slots.default" class="base-button__text">
      <slot />
    </span>
    <slot name="icon-right" />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'ghost'].includes(value)
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-8);
  padding: var(--spacing-12) var(--spacing-24);
  border: var(--border-width) solid transparent;
  border-radius: var(--border-radius-full);
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-normal);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.base-button--full {
  width: 100%;
}

.base-button--primary {
  background: var(--color-primary);
  color: var(--color-white);
}

.base-button--primary:hover:not(:disabled) {
  background: #0533d9;
}

.base-button--secondary {
  background: var(--color-secondary);
  color: var(--color-white);
}

.base-button--outline {
  background: transparent;
  border-color: var(--color-border);
  color: var(--color-text-primary);
}

.base-button--outline:hover:not(:disabled) {
  background: var(--color-background);
}

.base-button--ghost {
  background: transparent;
  color: var(--color-text-primary);
}

.base-button--ghost:hover:not(:disabled) {
  background: var(--color-background);
}

.base-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.base-button__text {
  display: inline-block;
}
</style>

