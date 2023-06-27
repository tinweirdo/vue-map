import { defineConfig } from 'vite'
import cesium from 'vite-plugin-cesium';
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  server: {
    proxy: {
      '/tileserver': {
        target: 'https://kc3.kcgis.cn:31005/kcgis/services',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/tileserver/, '')
      },
      '/baseMapUrl': {
        target: 'https://kc3.kcgis.cn:30130/kcgis/services/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/baseMapUrl/, '')
      },
      '/baseStreamUrl': {
        target: 'https://kc3.kcgis.cn:30130/kcgis/services/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/baseStreamUrl/, '')
      }
    },
  },
  resolve: {
    alias: [//配置别名
      { find: '@', replacement: resolve(__dirname, 'src') },
      { find: '@mapVues', replacement: resolve(__dirname, 'src/components/map') },
      { find: '@widgets', replacement: resolve(__dirname, 'src/components/widgets') },
      { find: '@views', replacement: resolve(__dirname, 'src/views') },
    ]
  },
  plugins: [
    vue(),
    cesium()
  ],
  devServer: {
    hot: true
  }
})
