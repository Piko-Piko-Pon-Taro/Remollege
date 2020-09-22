import { base, filename } from 'paths.macro'
import Chat from './Chat.vue'

export default {
  title: `${base.replace('/components/', '')}${filename.replace(
    '.stories',
    ''
  )}`,
  component: Chat,
  argTypes: {
    onClick: { action: 'clicked' }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Chat },
  template: '<Chat @click="onClick" v-bind="$props"/>'
})

const user1 = {id: 1, name: "ピコピコポン太郎", img: "https://storage.googleapis.com/remollege-storage/static/waseda.jpg"}
const user2 = {id: 2, name: "井上智裕", img:"https://storage.googleapis.com/remollege-storage/1599556468017sampleIcon2.png"}
const user3 = {id: 3, name: "つよし", img: "https://storage.googleapis.com/remollege-storage/1599556504706sampleIcon3.jpg"}
const user4 = {id: 4, name: "にしい", img: "https://storage.googleapis.com/remollege-storage/1599556513724sampleIcon4.jpg"}
const user5 = {id: 5, name: "たいら", img: "https://storage.googleapis.com/remollege-storage/1599556527564sampleIcon5.jpeg"}

const messages = [
  {user: user2, text: "こんにちは"},
  {user: user3, text: "こんにちは"},
  {user: user4, text: "こんにちは"},
  {user: user1, text: "こんにちは"},
  {user: user5, text: "こんにちは"}
]

export const Default = Template.bind({})
Default.args = {
  drawer: true,
  messages: messages,
  authUserId: 1
}

export const NoMessage = Template.bind({})
NoMessage.args = {
  drawer: true,
  messages: [],
  authUserId: 1
}