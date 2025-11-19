<template>
  <ElConfigProvider :locale="ptBr">
  <div class="demo-datetime-picker-icon">
    <div class="block">
      <el-date-picker
        ref="datePickerRef"
        v-model="valueAux"
        type="daterange"
        start-placeholder="Data inicial"
        end-placeholder="Data final "
        format="DD-MM-YYYY"
        date-format="DD/MM/YYYY ddd"
        time-format="A hh:mm:ss"
        range-separator="|"
        :shortcuts="availableShortcuts"
      >
      </el-date-picker>
    </div>
  </div>
  </ElConfigProvider>

</template>

<script setup>
import { ElConfigProvider } from 'element-plus'
import ptBr from 'element-plus/dist/locale/pt-br.mjs'
import { computed, ref } from 'vue'

const props = defineProps({
  shortcurts: {
    type: Boolean,
    default: false
  }
})

const valueAux = ref('')
const datePickerRef = ref(null)

const createRangeByDays = (days) => {
  const end = new Date()
  const start = new Date()
  start.setDate(start.getDate() - days)
  return [start, end]
}

const createRangeByMonths = (months) => {
  const end = new Date()
  const start = new Date()
  start.setMonth(start.getMonth() - months)
  return [start, end]
}

const createRangeForCurrentMonth = () => {
  const end = new Date()
  const start = new Date(end.getFullYear(), end.getMonth(), 1)
  return [start, end]
}

const shortcuts = [
  {
    text: 'Última semana',
    value: () => createRangeByDays(7)
  },
  {
    text: 'Últimos 15 dias',
    value: () => createRangeByDays(15)
  },
  {
    text: 'Últimos 30 dias',
    value: () => createRangeByDays(30)
  },
  {
    text: 'Últimos 3 meses',
    value: () => createRangeByMonths(3)
  },
  {
    text: 'Este mês',
    value: () => createRangeForCurrentMonth()
  }
]

const availableShortcuts = computed(() =>
  props.shortcurts ? shortcuts : undefined
)

const open = () => {
  if (datePickerRef.value?.handleOpen) {
    datePickerRef.value.handleOpen()
  }
}

defineExpose({
  open
})
</script>

<style scoped>

:deep(.dashboard__date-input){
  height: auto;
}

:deep(.el-date-editor .el-range-separator){
  color: var(--color-border);
}

:deep(.el-date-editor.el-input__wrapper ){
  height: 50px;
  max-width: 350px;
  border-radius: 22px;
  cursor: pointer;
}

:deep(.el-date-editor .el-range-input){
  display: inline-block;
  font-size: var(--el-font-size-small);
  color: var(--color-text-primary);
  width: 100%;
  margin-top: 1px;
  font-weight: 600;
  font-family: 'Plus Jakarta Sans';
}

.demo-datetime-picker-icon {
  display: flex;
  width: 100%;
  
  padding: 0;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: stretch;
}

.demo-datetime-picker-icon .block {
  text-align: center;
  min-width: 300px;
  flex: 1;
}
.line {
  width: 1px;
  background-color: var(--el-border-color);
}

@media (max-width: 768px) {
  .demo-datetime-picker-icon .block {
    flex: 100%;
    border-bottom: solid 1px var(--el-border-color);
  }

  .demo-datetime-picker-icon .block:last-child {
    border-bottom: none;
  }

  .line {
    display: none;
  }

  :deep(.el-date-editor.el-input) {
    width: 100%;
  }

  :deep(.el-date-editor.el-input__wrapper) {
    width: 100%;
    max-width: 300px;
  }
}
</style>