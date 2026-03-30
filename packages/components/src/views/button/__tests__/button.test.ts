import { describe, it, expect } from 'vitest'
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