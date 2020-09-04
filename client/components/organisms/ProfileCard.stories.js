import { base, filename } from 'paths.macro'
import ProfileCard from './ProfileCard.vue'

export default {
  title: `${base.replace('/components/', '')}${filename.replace(
    '.stories',
    ''
  )}`,
  component: ProfileCard,
  argTypes: {
    iconColor: { control: 'color' },
    onClick: { action: 'clicked' }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ProfileCard },
  template: '<ProfileCard @click="onClick" v-bind="$props"/>'
})

export const MyProfileCard = Template.bind({})
MyProfileCard.args = {
  name: 'ピコピコぽん太郎',
  image: 'https://storage.googleapis.com/remollege-storage/1599218148359sampleIcon1.jpg',
  profile:
    '先進理工学部二郎系学科3年生です。\n東京都西早稲田駅近くにある二郎系ラーメン店ピコピコポンが激推しです。おいしいよ。',
  isEditable: true
}

export const IsNotEditable = Template.bind({})
IsNotEditable.args = { ...MyProfileCard.args }
IsNotEditable.args.isEditable = false
