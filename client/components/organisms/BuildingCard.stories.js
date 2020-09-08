import { base, filename } from 'paths.macro'
import BuildingCard from './BuildingCard.vue'

export default {
  title: `${base.replace('/components/', '')}${filename.replace(
    '.stories',
    ''
  )}`,
  component: BuildingCard,
  argTypes: {
    onClick: { action: 'clicked' }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BuildingCard },
  template: '<BuildingCard @click="onClick" v-bind="$props"/>'
})

export const Default = Template.bind({})
Default.args = {
    building: {
        id: 1,
        num: 56
    },
}

