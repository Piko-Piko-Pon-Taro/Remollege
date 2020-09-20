import { base, filename } from 'paths.macro'
import MessageInput from './MessageInput.vue'

export default {
  title: `${base.replace('/components/', '')}${filename.replace(
    '.stories',
    ''
  )}`,
  component: MessageInput,
  argTypes: {
    onClick: { action: 'clicked' }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MessageInput },
  template: '<MessageInput @click="onClick" v-bind="$props"/>'
})

export const Default = Template.bind({})
Default.args = {
  value: {
  }
}
