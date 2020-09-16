import { base, filename } from 'paths.macro'
import TeacherBanner from './TeacherBanner.vue'

export default {
  title: `${base.replace('/components/', '')}${filename.replace(
    '.stories',
    ''
  )}`,
  component: TeacherBanner,
  argTypes: {
    onClick: { action: 'clicked' }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TeacherBanner },
  template: '<TeacherBanner @click="onClick" v-bind="$props"/>'
})

export const Default = Template.bind({})
Default.args = {
  name: '田中愛治総長',
  img:
    'https://storage.googleapis.com/remollege-storage/1599556564604teacher.jpg'
}
