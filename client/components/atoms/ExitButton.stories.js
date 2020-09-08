import { base, filename } from 'paths.macro'
import ExitButton from './ExitButton.vue'

export default {
  title: `${base.replace('/components/', '')}${filename.replace(
    '.stories',
    ''
  )}`,
  component: ExitButton,
  argTypes: {
    onClick: { action: 'clicked' }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ExitButton },
  template: '<ExitButton @click="onClick" v-bind="$props"/>'
})

export const Default = Template.bind({})
Default.args = {
  to: ''
}

