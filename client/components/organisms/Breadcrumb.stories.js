import { base, filename } from 'paths.macro'
import Breadcrumb from './Breadcrumb.vue'

export default {
  title: `${base.replace('/components/', '')}${filename.replace(
    '.stories',
    ''
  )}`,
  component: Breadcrumb,
  argTypes: {
    onClick: { action: 'clicked' }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Breadcrumb },
  template: '<Breadcrumb @click="onClick" v-bind="$props"/>'
})

export const Default = Template.bind({})
Default.args = {
  items: ['早稲田大学', '西早稲田キャンパス']
}
