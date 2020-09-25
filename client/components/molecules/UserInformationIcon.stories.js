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
    name: "ピコピコぽん太郎",
    profile: "先進理工学部二郎系学科3年生です。東京都西早稲田駅近くにある二郎系ラーメン店ピコピコポンが激推しです。おいしいよ。",
    img: "https://storage.googleapis.com/remollege-storage/1599218148359sampleIcon1.jpg",
  }
}

export const NoUsers = Template.bind({})
NoUsers.args = {
  user: null
}