import Button from './index.vue'
import type { App } from 'vue'

export default {
  install(app: App) {
    app.component('MyButton', Button)
  }
}

export { Button }
export type { IButtonProps } from './interface'