import { base, filename } from 'paths.macro'
import UserInformationIcon from './UserInformationIcon.vue'

export default {
  title: `${base.replace('/components/', '')}${filename.replace(
    '.stories',
    ''
  )}`,
  component: UserInformationIcon,
  argTypes: {
    onClick: { action: 'clicked' }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { UserInformationIcon },
  template: '<UserInformationIcon @click="onClick" v-bind="$props"/>'
})

export const Default = Template.bind({})
Default.args = {
  user: {
    id: 1,
    num: 56
  }
}
