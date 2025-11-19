<template>
  <ElConfigProvider :locale="ptBr">
  <div class="demo-datetime-picker-icon">
    <div class="block">
      <el-date-picker
        v-model="valueAux"
        type="daterange"
        start-placeholder="Data inicial"
        end-placeholder="Data final "
        format="DD-MM-YYYY"
        date-format="DD/MM/YYYY ddd"
        time-format="A hh:mm:ss"
        range-separator="|"
      >
      </el-date-picker>
    </div>
  </div>
  </ElConfigProvider>

</template>

<script lang="ts" setup>
import { ElConfigProvider } from 'element-plus'
import ptBr from "element-plus/dist/locale/pt-br.mjs"

import { ref } from 'vue'

const valueAux = ref('')
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