import { base, filename } from 'paths.macro'
import UserIcon from './UserIcon.vue'

export default {
  title: `${base.replace('/components/', '')}${filename.replace(
    '.stories',
    ''
  )}`,
  component: UserIcon,
  argTypes: {
    onClick: { action: 'clicked' }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { UserIcon },
  template: '<UserIcon @click="onClick" v-bind="$props"/>'
})

export const Default = Template.bind({})
Default.args = {
  src: 'sampleIcon1.jpg',
  icon: null,
  size: null
}

export const NoImage = Template.bind({})
NoImage.args = {
  src: null,
  icon: null,
  size: null
}
