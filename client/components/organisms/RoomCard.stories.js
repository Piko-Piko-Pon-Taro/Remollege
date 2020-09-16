import { base, filename } from 'paths.macro'
import RoomCard from './RoomCard.vue'

export default {
  title: `${base.replace('/components/', '')}${filename.replace(
    '.stories',
    ''
  )}`,
  component: RoomCard,
  argTypes: {
    onClick: { action: 'clicked' }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { RoomCard },
  template: '<RoomCard @click="onClick" v-bind="$props"/>'
})

export const Default = Template.bind({})
Default.args = {
  room: {
    name: '52-101',
    id: 1
  }
}
