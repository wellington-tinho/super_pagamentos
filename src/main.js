import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/global.css'
import VueApexCharts from 'vue3-apexcharts'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)

app.component('apexchart', VueApexCharts)

app.mount('#app')

