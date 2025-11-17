<template>
  <div class="base-input">
    <label v-if="label" class="base-input__label">{{ label }}</label>
    <div class="base-input__wrapper">
      <slot name="icon-left" />
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        class="base-input__field"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <slot name="icon-right" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
}

.base-input__label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.base-input__wrapper {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
  background: var(--color-white);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--border-radius-full);
  padding: var(--spacing-12) var(--spacing-16);
}

.base-input__field {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
}

.base-input__field::placeholder {
  color: var(--color-text-secondary);
}

.base-input__field:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

