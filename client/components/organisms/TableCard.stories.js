import { base, filename } from 'paths.macro'
import TableCard from './TableCard.vue'

export default {
  title: `${base.replace('/components/', '')}${filename.replace(
    '.stories',
    ''
  )}`,
  component: TableCard,
  argTypes: {
    onClick: { action: 'clicked' }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TableCard },
  template: '<TableCard @click="onClick" v-bind="$props"/>'
})

const user = {
  id: 1,
  name: 'ピコピコぽん太郎',
  img:
    'https://storage.googleapis.com/remollege-storage/1599218148359sampleIcon1.jpg',
  profile:
    '先進理工学部二郎系学科3年生です。\n東京都西早稲田駅近くにある二郎系ラーメン店ピコピコポンが激推しです。おいしいよ。'
}

const otherUsers = [
  {
    id: 2,
    name: '井上智裕',
    img:
      'https://storage.googleapis.com/remollege-storage/1599556468017sampleIcon2.png',
    profile:
      '先進理工学部二郎系学科3年生です。\n東京都西早稲田駅近くにある二郎系ラーメン店ピコピコポンが激推しです。おいしいよ。'
  },
  {
    id: 3,
    name: 'わたなべつよし',
    img:
      'https://storage.googleapis.com/remollege-storage/1599556504706sampleIcon3.jpg',
    profile:
      '先進理工学部二郎系学科3年生です。\n東京都西早稲田駅近くにある二郎系ラーメン店ピコピコポンが激推しです。おいしいよ。'
  },
  {
    id: 4,
    name: 'にしい',
    img:
      'https://storage.googleapis.com/remollege-storage/1599556513724sampleIcon4.jpg',
    profile:
      '先進理工学部二郎系学科3年生です。\n東京都西早稲田駅近くにある二郎系ラーメン店ピコピコポンが激推しです。おいしいよ。'
  },
  {
    id: 5,
    name: 'たいら',
    img:
      'https://storage.googleapis.com/remollege-storage/1599556527564sampleIcon5.jpeg',
    profile:
      '先進理工学部二郎系学科3年生です。\n東京都西早稲田駅近くにある二郎系ラーメン店ピコピコポンが激推しです。おいしいよ。'
  }
]

export const NotSeated = Template.bind({})
NotSeated.args = {
  name: 'Table1',
  table: {
    id: 1,
    users: [...otherUsers]
  },
  seatedTableId: null,
  maxPeople: 6
}

export const Seated = Template.bind({})
Seated.args = {
  name: 'Table2',
  table: {
    id: 1,
    users: [...otherUsers, user]
  },
  seatedTableId: 1,
  maxPeople: 6
}

export const SeatedOtherTable = Template.bind({})
SeatedOtherTable.args = {
  name: 'Table3',
  table: {
    id: 1,
    users: [...otherUsers]
  },
  seatedTableId: 2,
  maxPeople: 6
}
