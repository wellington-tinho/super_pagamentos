<template>
  <div ref="selectRef" class="base-select">
    <div
      :class="['base-select__trigger', { 'base-select__trigger--open': isOpen }]"
      @click="toggleDropdown"
    >
      <slot name="icon-left" />
      <span class="base-select__value">{{ displayValue }}</span>
      <slot name="icon-right">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </slot>
    </div>
    <div v-if="isOpen" class="base-select__dropdown">
      <div
        v-for="option in options"
        :key="option.value"
        :class="['base-select__option', { 'base-select__option--selected': modelValue === option.value }]"
        @click="selectOption(option.value)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: 'Selecione...'
  }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const selectRef = ref(null)

const displayValue = computed(() => {
  const selected = props.options.find(opt => opt.value === props.modelValue)
  return selected ? selected.label : props.placeholder
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (value) => {
  emit('update:modelValue', value)
  isOpen.value = false
}

const handleClickOutside = (event) => {
  if (selectRef.value && !selectRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.base-select {
  position: relative;
}

.base-select__trigger {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
  background: var(--color-white);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--border-radius-full);
  padding: var(--spacing-12) var(--spacing-16);
  cursor: pointer;
  min-width: 150px;
}

.base-select__value {
  flex: 1;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  text-align: left;
}

.base-select__dropdown {
  position: absolute;
  top: calc(100% + var(--spacing-4));
  left: 0;
  right: 0;
  background: var(--color-white);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
}

.base-select__option {
  padding: var(--spacing-12) var(--spacing-16);
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: background 0.2s ease;
}

.base-select__option:hover {
  background: var(--color-background);
}

.base-select__option--selected {
  background: var(--color-primary-light);
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
}
</style>

