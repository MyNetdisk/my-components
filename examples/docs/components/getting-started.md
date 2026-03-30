# 快速开始

## 安装

```bash
npm install @mynetdisk/components
```

## 使用

### 全局注册

```ts
import { createApp } from 'vue'
import App from './App.vue'
import MyComponents from '@mynetdisk/components'
import '@mynetdisk/components/lib/style.css'

const app = createApp(App)
app.use(MyComponents).mount('#app')
```

### 局部注册

```vue
<template>
  <MyButton type="primary">按钮</MyButton>
</template>

<script setup>
import { Button as MyButton } from '@mynetdisk/components'
</script>
```