import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 使用相对 base，方便把 dist 直接丢到任意静态目录 / 本机预览
export default defineConfig({
  plugins: [vue()],
  base: './',
  server: {
    host: '127.0.0.1',
    port: 5173
  }
})
