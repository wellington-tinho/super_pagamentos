<template>
  <BaseCard class="conversion-chart">
    <h3 class="conversion-chart__title">Conversão por modalidade</h3>
    
    <div class="conversion-chart__content">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="conversion-chart__item"
      >
        <DonutChart
          :percentage="item.percentage"
          :label="item.label"
          :color="item.color"
        />
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '../BaseCard.vue'
import DonutChart from '../charts/DonutChart.vue'

defineProps({
  data: {
    type: Array,
    required: true,
    default: () => []
  }
})
</script>

<style scoped>
.conversion-chart {
  padding: var(--spacing-24);
}

.conversion-chart__title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-24);
}

.conversion-chart__content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(88px, 1fr));
  gap: var(--spacing-24);
  justify-items: center;
}

@media (max-width: 768px) {
  .conversion-chart {
    padding: var(--spacing-16);
  }
  
  .conversion-chart__content {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-16);
  }
}
</style>

