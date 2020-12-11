import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import app from '@/App'

describe('App.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(app, {
      propsData: { msg }
    })
    expect(wrapper.text()).to.include(msg)
  })
})
