<template>
  <div class="donut-chart">
    <svg class="donut-chart__svg" :width="size" :height="size" viewBox="0 0 100 100">
      <circle
        class="donut-chart__background"
        cx="50"
        cy="50"
        :r="radius"
        :stroke-width="strokeWidth"
        fill="none"
      />
      <circle
        class="donut-chart__progress"
        :class="`donut-chart__progress--${color}`"
        cx="50"
        cy="50"
        :r="radius"
        :stroke-width="strokeWidth"
        fill="none"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="offset"
        transform="rotate(-90 50 50)"
      />
    </svg>
    <div class="donut-chart__label">
      <span class="donut-chart__percentage">{{ percentage }}%</span>
      <span class="donut-chart__text">{{ label }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  percentage: {
    type: Number,
    required: true,
    validator: (value) => value >= 0 && value <= 100
  },
  label: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'blue',
    validator: (value) => ['blue', 'purple', 'light-purple', 'light-blue'].includes(value)
  },
  size: {
    type: Number,
    default: 88
  },
  strokeWidth: {
    type: Number,
    default: 8
  }
})

const radius = computed(() => {
  return (props.size - props.strokeWidth) / 2 - 10
})

const circumference = computed(() => {
  return 2 * Math.PI * radius.value
})

const offset = computed(() => {
  return circumference.value - (props.percentage / 100) * circumference.value
})
</script>

<style scoped>
.donut-chart {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-8);
}

.donut-chart__svg {
  transform: rotate(-90deg);
}

.donut-chart__background {
  stroke: var(--color-background);
}

.donut-chart__progress {
  transition: stroke-dashoffset 0.5s ease;
}

.donut-chart__progress--blue {
  stroke: var(--color-chart-blue);
}

.donut-chart__progress--purple {
  stroke: var(--color-chart-purple);
}

.donut-chart__progress--light-purple {
  stroke: var(--color-chart-light-purple);
}

.donut-chart__progress--light-blue {
  stroke: var(--color-chart-light-blue);
}

.donut-chart__label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-4);
  margin-top: calc(var(--spacing-8) * -1);
}

.donut-chart__percentage {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.donut-chart__text {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  text-align: center;
}
</style>

