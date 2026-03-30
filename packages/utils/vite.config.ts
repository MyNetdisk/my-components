import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    dts({
      outDir: 'lib',
      insertTypesEntry: true
    })
  ],
  build: {
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MyComponentsUtils',
      fileName: 'index'
    },
    rollupOptions: {
      output: {
        globals: {
          // 没有外部依赖
        }
      }
    }
  }
})