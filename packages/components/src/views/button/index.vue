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
import type { IButtonProps } from './interface'

withDefaults(defineProps<IButtonProps>(), {
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