<template>
  <div class="bar-chart">
    <div class="bar-chart__y-axis">
      <span v-for="tick in yAxisTicks" :key="tick" class="bar-chart__y-tick">{{ formatYAxis(tick) }}</span>
    </div>
    
    <div class="bar-chart__content">
      <div class="bar-chart__bars">
        <div
          v-for="(item, index) in data"
          :key="index"
          class="bar-chart__bar-wrapper"
          :style="{ width: `${100 / data.length}%` }"
        >
          <div
            class="bar-chart__bar"
            :class="getBarClass(item.value)"
            :style="{ height: `${(item.value / maxValue) * 100}%` }"
          ></div>
        </div>
      </div>
      
      <div class="bar-chart__x-axis">
        <span v-for="(item, index) in data" :key="index" class="bar-chart__x-tick">{{ item.day }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => []
  },
  maxValue: {
    type: Number,
    default: 200000
  }
})

const yAxisTicks = computed(() => {
  return [200000, 100000, 50000, 0]
})

const formatYAxis = (value) => {
  if (value >= 1000) {
    return `${value / 1000}K`
  }
  return value.toString()
}

const getBarClass = (value) => {
  const percentage = (value / props.maxValue) * 100
  if (percentage > 70) {
    return 'bar-chart__bar--high'
  } else if (percentage > 40) {
    return 'bar-chart__bar--medium'
  }
  return 'bar-chart__bar--low'
}
</script>

<style scoped>
.bar-chart {
  display: flex;
  gap: var(--spacing-16);
  height: 162px;
}

.bar-chart__y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 39px;
  height: 100%;
}

.bar-chart__y-tick {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-align: right;
}

.bar-chart__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
}

.bar-chart__bars {
  display: flex;
  align-items: flex-end;
  gap: var(--spacing-4);
  height: 153px;
  position: relative;
}

.bar-chart__bars::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: repeating-linear-gradient(
    to bottom,
    transparent,
    transparent 37px,
    var(--color-border-light) 37px,
    var(--color-border-light) 38px
  );
  pointer-events: none;
}

.bar-chart__bar-wrapper {
  display: flex;
  align-items: flex-end;
  height: 100%;
}

.bar-chart__bar {
  width: 8px;
  border-radius: var(--border-radius-sm) var(--border-radius-sm) 0 0;
  transition: height 0.3s ease;
}

.bar-chart__bar--low {
  background: var(--color-chart-blue);
}

.bar-chart__bar--medium {
  background: var(--color-chart-purple);
}

.bar-chart__bar--high {
  background: var(--color-chart-green);
}

.bar-chart__x-axis {
  display: flex;
  justify-content: space-between;
  height: 15px;
}

.bar-chart__x-tick {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-align: center;
  flex: 1;
}

@media (max-width: 768px) {
  .bar-chart {
    height: 120px;
    gap: var(--spacing-8);
  }
  
  .bar-chart__y-axis {
    width: 30px;
  }
  
  .bar-chart__bars {
    height: 100px;
  }
  
  .bar-chart__bar {
    width: 6px;
  }
  
  .bar-chart__x-tick {
    font-size: var(--font-size-xs);
  }
}
</style>

