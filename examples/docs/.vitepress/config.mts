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