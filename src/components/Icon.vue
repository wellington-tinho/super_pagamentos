<template>
  <component :is="iconComponent" />
</template>

<script setup>
import { h, computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

const icons = {
  home: () => h('svg', { width: '16', height: '16', viewBox: '0 0 16 16', fill: 'none' }, [
    h('path', { d: 'M8 1L2 6V14H6V10H10V14H14V6L8 1Z', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
  ]),
  user: () => h('svg', { width: '16', height: '16', viewBox: '0 0 16 16', fill: 'none' }, [
    h('circle', { cx: '8', cy: '6', r: '3', stroke: 'currentColor', 'stroke-width': '1.5' }),
    h('path', { d: 'M3 14C3 11.5 5.5 9.5 8 9.5C10.5 9.5 13 11.5 13 14', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round' })
  ]),
  money: () => h('svg', { width: '16', height: '16', viewBox: '0 0 16 16', fill: 'none' }, [
    h('rect', { x: '2', y: '4', width: '12', height: '8', rx: '2', stroke: 'currentColor', 'stroke-width': '1.5' }),
    h('circle', { cx: '8', cy: '8', r: '1.5', fill: 'currentColor' })
  ]),
  wallet: () => h('svg', { width: '16', height: '16', viewBox: '0 0 16 16', fill: 'none' }, [
    h('rect', { x: '2', y: '4', width: '12', height: '8', rx: '1', stroke: 'currentColor', 'stroke-width': '1.5' }),
    h('path', { d: 'M10 8H14', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round' })
  ]),
  fire: () => h('svg', { width: '16', height: '16', viewBox: '0 0 16 16', fill: 'none' }, [
    h('path', { d: 'M8 2C6 4 5 6 5 8C5 10.5 6.5 12 8 12C9.5 12 11 10.5 11 8C11 6 10 4 8 2Z', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
  ]),
  cash: () => h('svg', { width: '16', height: '16', viewBox: '0 0 16 16', fill: 'none' }, [
    h('path', { d: 'M2 6H14M4 10H12', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round' }),
    h('circle', { cx: '8', cy: '8', r: '4', stroke: 'currentColor', 'stroke-width': '1.5' })
  ]),
  case: () => h('svg', { width: '16', height: '16', viewBox: '0 0 16 16', fill: 'none' }, [
    h('rect', { x: '3', y: '5', width: '10', height: '8', rx: '1', stroke: 'currentColor', 'stroke-width': '1.5' }),
    h('path', { d: 'M6 5V3C6 2.5 6.5 2 7 2H9C9.5 2 10 2.5 10 3V5', stroke: 'currentColor', 'stroke-width': '1.5' })
  ]),
  code: () => h('svg', { width: '16', height: '16', viewBox: '0 0 16 16', fill: 'none' }, [
    h('path', { d: 'M6 4L2 8L6 12M10 4L14 8L10 12', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
  ]),
  settings: () => h('svg', { width: '16', height: '16', viewBox: '0 0 16 16', fill: 'none' }, [
    h('circle', { cx: '8', cy: '8', r: '2', stroke: 'currentColor', 'stroke-width': '1.5' }),
    h('path', { d: 'M8 2V4M8 12V14M2 8H4M12 8H14M3.5 3.5L4.9 4.9M11.1 11.1L12.5 12.5M3.5 12.5L4.9 11.1M11.1 4.9L12.5 3.5', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round' })
  ])
}

const iconComponent = computed(() => {
  return icons[props.name] || (() => h('div'))
})
</script>

