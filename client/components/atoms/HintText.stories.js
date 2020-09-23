import { base, filename } from 'paths.macro'
import HintText from './HintText.vue'

export default {
  title: `${base.replace('/components/', '')}${filename.replace(
    '.stories',
    ''
  )}`,
  component: HintText,
  argTypes: {
    onClick: { action: 'clicked' }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HintText },
  template: '<HintText @click="onClick" v-bind="$props"/>'
})

export const Default = Template.bind({})
Default.args = {
  text: 'ひょえひょえ🥺'
}
