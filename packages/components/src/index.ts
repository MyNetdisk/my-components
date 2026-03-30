export * from './components'
import type { App } from 'vue'
import './styles/index.less'

const install = (app: App) => {
  const components = import.meta.glob('./views/*/index.ts', { eager: true })
  
  Object.values(components).forEach((module: any) => {
    if (module.default && module.default.install) {
      app.use(module.default)
    }
  })
}

export default {
  install
}