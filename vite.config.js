import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import svgLoader from 'vite-svg-loader';
import vueDevTools from 'vite-plugin-vue-devtools'



export default defineConfig({
  plugins: [vue(), svgLoader(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

