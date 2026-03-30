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