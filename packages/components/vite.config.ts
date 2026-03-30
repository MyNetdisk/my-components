import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      outDir: 'lib',
      insertTypesEntry: true
    }),
    libInjectCss()
  ],
  build: {
    outDir: 'lib',  // 添加这一行，将构建输出改为lib目录
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MyComponents',
      fileName: 'index'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})