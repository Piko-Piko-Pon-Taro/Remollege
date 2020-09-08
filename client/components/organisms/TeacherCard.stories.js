import { base, filename } from 'paths.macro'
import TeacherCard from './TeacherCard.vue'

export default {
  title: `${base.replace('/components/', '')}${filename.replace(
    '.stories',
    ''
  )}`,
  component: TeacherCard,
  argTypes: {
    onClick: { action: 'clicked' }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TeacherCard },
  template: '<TeacherCard @click="onClick" v-bind="$props"/>'
})

export const Default = Template.bind({})
Default.args = {
    teacher: {
        name: "田中愛治",
        img: "https://storage.googleapis.com/remollege-storage/1599556564604teacher.jpg"
  }
}
