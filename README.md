# 从零到一实现Vue 3组件库指南

## 1. 项目概述

本文档将指导您从零开始构建一个基于Vue 3 + TypeScript的组件库，采用monorepo结构管理，类似ys-tools项目的架构。

### 技术栈选择
- **框架**：Vue 3 + Composition API
- **语言**：TypeScript
- **构建工具**：Vite
- **样式**：Less/Sass
- **包管理**：pnpm（推荐使用，支持workspace）
- **文档**：VitePress
- **测试**：Vitest + Vue Test Utils

## 2. 项目初始化

### 2.1 创建monorepo结构

使用pnpm workspace创建monorepo项目：

```bash
# 1. 创建项目根目录
mkdir @mynetdisk/components
cd @mynetdisk/components

# 2. 初始化pnpm workspace
pnpm init
# 创建pnpm-workspace.yaml文件
echo "packages:\n  - 'packages/*'\n  - 'examples'" > pnpm-workspace.yaml

# 3. 创建.gitignore文件
echo "node_modules\ndist\n*.log\n.DS_Store\n.vscode\n.idea" > .gitignore
```

### 2.2 创建核心包目录

```bash
# 创建packages目录
mkdir -p packages/components/src
mkdir -p packages/utils/src
mkdir examples

# 初始化组件包
cd packages/components
pnpm init

# 初始化工具包
cd ../utils
pnpm init

# 初始化示例文档
cd ../../examples
pnpm init
```

## 3. 基础配置

### 3.1 TypeScript配置

在根目录创建`tsconfig.json`：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["packages/**/*.ts", "packages/**/*.d.ts", "packages/**/*.tsx", "packages/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

创建`tsconfig.node.json`：

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

### 3.2 根目录package.json配置

```json
{
  "name": "@mynetdisk/components",
  "private": true,
  "version": "1.0.0",
  "description": "Vue 3组件库",
  "scripts": {
    "build": "pnpm -F @mynetdisk/components run build",
    "dev": "pnpm -F examples run dev",
    "docs:dev": "pnpm -F examples run docs:dev",
    "docs:build": "pnpm -F examples run docs:build"
  },
  "keywords": ["vue", "components", "library"],
  "author": "",
  "license": "MIT",
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
```

## 4. 组件库开发环境搭建

### 4.1 组件包配置

编辑`packages/components/package.json`：

```json
{
  "name": "@mynetdisk/components",
  "version": "1.0.0",
  "type": "module",
  "main": "./lib/index.js",
  "types": "./lib/index.d.ts",
  "files": ["lib"],
  "scripts": {
    "build": "vite build"
  },
  "peerDependencies": {
    "vue": "^3.3.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.0.0",
    "less": "^4.0.0",
    "vite": "^4.0.0",
    "vite-plugin-dts": "^3.0.0",
    "vite-plugin-lib-inject-css": "^2.0.0",
    "vue": "^3.3.0"
  }
}
```

### 4.2 Vite配置

创建`packages/components/vite.config.ts`：

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import libInjectCss from 'vite-plugin-lib-inject-css'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      outputDir: 'lib',
      insertTypesEntry: true
    }),
    libInjectCss()
  ],
  build: {
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
```

### 4.3 组件目录结构

```
packages/components/src/
├── components.ts        # 组件导出文件
├── directives/         # 自定义指令
├── styles/             # 样式文件
│   ├── index.less      # 主样式入口
│   └── variables.less  # 样式变量
├── utils/              # 工具函数
└── views/              # 组件目录
    ├── button/         # Button组件
    │   ├── index.vue   # 组件实现
    │   ├── index.ts    # 组件导出
    │   ├── index.less  # 组件样式
    │   └── interface.ts # 类型定义
    └── ...             # 其他组件
```

## 5. 开发第一个组件

### 5.1 创建Button组件

创建`packages/components/src/views/button/interface.ts`：

```typescript
export interface IButtonProps {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'large' | 'middle' | 'small'
  disabled?: boolean
  loading?: boolean
}
```

创建`packages/components/src/views/button/index.vue`：

```vue
<template>
  <button 
    :class="[
      'my-button',
      `my-button--${type}`,
      `my-button--${size}`,
      { 'my-button--disabled': disabled },
      { 'my-button--loading': loading }
    ]"
    :disabled="disabled || loading"
  >
    <span v-if="loading" class="my-button__loading">
      <svg width="16" height="16" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <path d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512-230.4 512-512 512z" fill="currentColor"/>
      </svg>
    </span>
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { IButtonProps } from './interface'

const props = withDefaults(defineProps<IButtonProps>(), {
  type: 'primary',
  size: 'middle',
  disabled: false,
  loading: false
})
</script>

<style lang="less" scoped>
@import '../../styles/variables.less';

.my-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
  outline: none;
  
  &--primary {
    background-color: @primary-color;
    color: white;
    
    &:hover:not(&--disabled) {
      background-color: darken(@primary-color, 10%);
    }
  }
  
  &--success {
    background-color: @success-color;
    color: white;
  }
  
  &--warning {
    background-color: @warning-color;
    color: white;
  }
  
  &--danger {
    background-color: @danger-color;
    color: white;
  }
  
  &--info {
    background-color: @info-color;
    color: white;
  }
  
  &--large {
    height: 40px;
    font-size: 16px;
  }
  
  &--middle {
    height: 32px;
    font-size: 14px;
  }
  
  &--small {
    height: 24px;
    font-size: 12px;
    padding: 0 8px;
  }
  
  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &__loading {
    margin-right: 8px;
    animation: rotate 1s linear infinite;
  }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
```

创建`packages/components/src/views/button/index.ts`：

```typescript
import Button from './index.vue'
import type { App } from 'vue'

export default {
  install(app: App) {
    app.component('MyButton', Button)
  }
}

export { Button }
export type { IButtonProps } from './interface'
```

### 5.2 创建样式变量文件

创建`packages/components/src/styles/variables.less`：

```less
// 主题色
@primary-color: #1890ff;
@success-color: #52c41a;
@warning-color: #faad14;
@danger-color: #f5222d;
@info-color: #1890ff;

// 基础色
@text-color: #333;
@border-color: #d9d9d9;
@bg-color: #f5f5f5;
```

创建`packages/components/src/styles/index.less`：

```less
@import './variables.less';

// 全局样式重置
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: @text-color;
  background-color: #fff;
}
```

### 5.3 配置组件导出

创建`packages/components/src/components.ts`：

export { default as Button } from './views/button/index'
export type { IButtonProps } from './views/button/interface'

创建`packages/components/src/index.ts`：

```typescript
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
```

## 6. 工具库开发

### 6.1 工具包配置

编辑`packages/utils/package.json`：

```json
{
  "name": "@mynetdisk/utils",
  "version": "1.0.0",
  "type": "module",
  "main": "./lib/index.js",
  "types": "./lib/index.d.ts",
  "files": ["lib"],
  "scripts": {
    "build": "vite build"
  },
  "devDependencies": {
    "vite": "^4.0.0",
    "vite-plugin-dts": "^3.0.0"
  }
}
```

### 6.2 开发工具函数

创建`packages/utils/src/format.ts`：

```typescript
/**
 * 格式化时间戳
 * @param timestamp 时间戳
 * @param format 格式
 */
export const formatDate = (timestamp: number, format: string = 'YYYY-MM-DD HH:mm:ss'): string => {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  
  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}
```

创建`packages/utils/src/index.ts`：

```typescript
export { formatDate } from './format'

// 导出所有工具函数
export default {
  formatDate
}
```

## 7. 文档系统搭建

### 7.1 安装VitePress

```bash
cd examples
pnpm add -D vitepress vitepress-theme-demoblock
```

### 7.2 配置VitePress

创建`examples/docs/.vitepress/config.mts`：

```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'My Components',
  description: 'Vue 3组件库',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/components/' },
      { text: '工具', link: '/utils/' }
    ],
    sidebar: {
      '/components/': [
        { text: '快速开始', link: '/components/getting-started' },
        { text: 'Button', link: '/components/button' }
      ],
      '/utils/': [
        { text: '快速开始', link: '/utils/getting-started' },
        { text: 'formatDate', link: '/utils/format-date' }
      ]
    }
  }
})
```

### 7.3 创建文档内容

创建`examples/docs/components/getting-started.md`：

```markdown
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
```

创建`examples/docs/components/button.md`：

```markdown
# Button 按钮

## 基本用法

<demo-block>
:::demo
```vue
<template>
  <MyButton>默认按钮</MyButton>
  <MyButton type="primary">主要按钮</MyButton>
  <MyButton type="success">成功按钮</MyButton>
  <MyButton type="warning">警告按钮</MyButton>
  <MyButton type="danger">危险按钮</MyButton>
</template>
```
:::
</demo-block>

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| type | `primarysuccesswarningdangerinfo` | `primary` | 按钮类型 |
| size | `largemiddlesmall` | `middle` | 按钮大小 |
| disabled | `boolean` | `false` | 是否禁用 |
| loading | `boolean` | `false` | 是否加载中 |
```

## 8. 测试配置

### 8.1 安装测试依赖

```bash
cd packages/components
pnpm add -D vitest @vue/test-utils jsdom
```

### 8.2 创建测试文件

创建`packages/components/src/views/button/__tests__/button.test.ts`：

```typescript
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../index.vue'

describe('Button', () => {
  it('should render correctly', () => {
    const wrapper = mount(Button)
    expect(wrapper.exists()).toBe(true)
  })
  
  it('should have correct type', () => {
    const wrapper = mount(Button, {
      props: { type: 'primary' }
    })
    expect(wrapper.classes()).toContain('my-button--primary')
  })
  
  it('should be disabled', () => {
    const wrapper = mount(Button, {
      props: { disabled: true }
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})
```

## 9. 构建与发布

### 9.1 构建组件库

```bash
# 在根目录
pnpm run build
```

### 9.2 发布到npm

```bash
cd packages/components
npm login
npm publish --access public

cd ../utils
npm publish --access public
```

## 10. 使用示例

创建一个Vue项目来测试组件库：

```bash
# 创建测试项目
vue create test-project
cd test-project

# 安装组件库
npm install @mynetdisk/components @mynetdisk/utils
```

在`src/main.ts`中引入：

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import MyComponents from '@mynetdisk/components'
import '@mynetdisk/components/lib/style.css'

const app = createApp(App)
app.use(MyComponents).mount('#app')
```

在`src/App.vue`中使用：

```vue
<template>
  <div>
    <MyButton type="primary" @click="handleClick">点击按钮</MyButton>
    <p>{{ formattedDate }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { formatDate } from '@mynetdisk/utils'

const formattedDate = ref('')

onMounted(() => {
  formattedDate.value = formatDate(Date.now())
})

const handleClick = () => {
  console.log('Button clicked')
}
</script>
```

## 11. 最佳实践

1. **组件设计原则**：
   - 单一职责原则
   - 可复用性
   - 可定制性
   - 类型安全

2. **开发流程**：
   - 先定义接口和类型
   - 再实现组件逻辑
   - 编写文档和示例
   - 编写测试用例

3. **维护与迭代**：
   - 使用语义化版本控制
   - 保持向后兼容
   - 定期更新依赖
   - 收集用户反馈

## 12. 总结

通过以上步骤，您已经成功构建了一个完整的Vue 3组件库，包括：
- ✅ Monorepo项目结构
- ✅ TypeScript支持
- ✅ Vite构建配置
- ✅ 组件开发规范
- ✅ 样式系统
- ✅ 文档系统
- ✅ 测试配置
- ✅ 发布流程

您可以根据实际需求扩展更多组件和功能，持续优化组件库的质量和性能。