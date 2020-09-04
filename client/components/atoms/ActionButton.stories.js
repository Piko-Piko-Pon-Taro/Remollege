import { base, filename } from 'paths.macro'
import ActionButton from './ActionButton.vue'

export default {
  title: `${base.replace('/components/', '')}${filename.replace(
    '.stories',
    ''
  )}`,
  component: ActionButton,
  argTypes: {
    onClick: { action: 'clicked' }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ActionButton },
  template: '<ActionButton @click="onClick" v-bind="$props"/>'
})

export const Default = Template.bind({})
Default.args = {
  icon: 'mdi-door',
  text: 'EXIT',
  to: './',
  xlarge: false
}

export const XLarge = Template.bind({})
XLarge.args = { ...Default.args }
XLarge.args.xlarge = true
