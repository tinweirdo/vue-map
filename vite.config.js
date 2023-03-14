import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/cdkc': {
        target: 'https://kc3.kcgis.cn:31005/kcgis/services',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/cdkc/, '')
      }
    },
  },
  plugins: [vue()],
})
