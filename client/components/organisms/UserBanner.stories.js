import { base, filename } from 'paths.macro'
import UserBanner from './UserBanner.vue'

export default {
  title: `${base.replace('/components/', '')}${filename.replace(
    '.stories',
    ''
  )}`,
  component: UserBanner,
  argTypes: {
    onClick: { action: 'clicked' }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { UserBanner },
  template: '<UserBanner @click="onClick" v-bind="$props"/>'
})

export const Default = Template.bind({})
Default.args = {
  img: 'https://storage.googleapis.com/remollege-storage/1599218148359sampleIcon1.jpg',
  name: 'ピコピコぽん太郎'
}

export const NoImage = Template.bind({})
NoImage.args = {
  img: null,
  name: 'ピコピコぽん太郎'
}
