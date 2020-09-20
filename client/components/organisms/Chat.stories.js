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

const messages = [
  {id:1, userId: 2, name: "井上智裕", text: "こんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちは", img: "https://storage.googleapis.com/remollege-storage/1599556468017sampleIcon2.png"},
  {id:1, userId: 3, name: "わたなべつよし", text: "こんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちは", img: "https://storage.googleapis.com/remollege-storage/1599556504706sampleIcon3.jpg"},
  {id:1, userId: 4, name: "にしい", text: "こんにちは", img: "https://storage.googleapis.com/remollege-storage/1599556513724sampleIcon4.jpg"},
  {id:1, userId: 5, name: "たいら", text: "こんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちは", img: "https://storage.googleapis.com/remollege-storage/1599556527564sampleIcon5.jpeg"},
  {id:1, userId: 1, name: "ピコピコポン太郎", text: "こんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちは", img: "https://storage.googleapis.com/remollege-storage/static/waseda.jpg"},
  {id:1, userId: 2, name: "井上智裕", text: "こんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちは", img: "https://storage.googleapis.com/remollege-storage/1599556468017sampleIcon2.png"},
  {id:1, userId: 3, name: "わたなべつよし", text: "こんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちは", img: "https://storage.googleapis.com/remollege-storage/1599556504706sampleIcon3.jpg"},
  {id:1, userId: 4, name: "にしい", text: "こんにちは", img: "https://storage.googleapis.com/remollege-storage/1599556513724sampleIcon4.jpg"},
  {id:1, userId: 5, name: "たいら", text: "こんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちは", img: "https://storage.googleapis.com/remollege-storage/1599556527564sampleIcon5.jpeg"},
  { id: 1, userId: 1, name: "ピコピコポン太郎", text: "こんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちは", img: "https://storage.googleapis.com/remollege-storage/static/waseda.jpg" },
  {id:1, userId: 2, name: "井上智裕", text: "こんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちは", img: "https://storage.googleapis.com/remollege-storage/1599556468017sampleIcon2.png"},
  {id:1, userId: 3, name: "わたなべつよし", text: "こんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちは", img: "https://storage.googleapis.com/remollege-storage/1599556504706sampleIcon3.jpg"},
  {id:1, userId: 4, name: "にしい", text: "こんにちは", img: "https://storage.googleapis.com/remollege-storage/1599556513724sampleIcon4.jpg"},
  {id:1, userId: 5, name: "たいら", text: "こんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちは", img: "https://storage.googleapis.com/remollege-storage/1599556527564sampleIcon5.jpeg"},
  {id:1, userId: 1, name: "ピコピコポン太郎", text: "こんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちは", img: "https://storage.googleapis.com/remollege-storage/static/waseda.jpg"},
]

export const Default = Template.bind({})
Default.args = {
  drawer: true,
  messages: messages
}

export const NoMessage = Template.bind({})
NoMessage.args = {
  drawer: true,
  messages: []
}