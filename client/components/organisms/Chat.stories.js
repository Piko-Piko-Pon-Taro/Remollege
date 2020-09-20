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
  {id:1, userId: 2, name: "ピコピコポン太郎", text: "こんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちは", img: "https://storage.googleapis.com/remollege-storage/static/waseda.jpg"},
  {id:1, userId: 2, name: "ピコピコポン太郎", text: "こんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちは", img: "https://storage.googleapis.com/remollege-storage/static/waseda.jpg"},
  {id:1, userId: 2, name: "ピコピコポン太郎", text: "こんにちは", img: "https://storage.googleapis.com/remollege-storage/static/waseda.jpg"},
  {id:1, userId: 2, name: "ピコピコポン太郎", text: "こんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちは", img: "https://storage.googleapis.com/remollege-storage/static/waseda.jpg"},
  {id:1, userId: 2, name: "ピコピコポン太郎", text: "こんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちは", img: "https://storage.googleapis.com/remollege-storage/static/waseda.jpg"},
  {id:1, userId: 2, name: "ピコピコポン太郎", text: "こんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちは", img: "https://storage.googleapis.com/remollege-storage/static/waseda.jpg"},
  {id:1, userId: 2, name: "ピコピコポン太郎", text: "こんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちは", img: "https://storage.googleapis.com/remollege-storage/static/waseda.jpg"},
  {id:1, userId: 2, name: "ピコピコポン太郎", text: "こんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちは", img: "https://storage.googleapis.com/remollege-storage/static/waseda.jpg"},
  {id:1, userId: 2, name: "ピコピコポン太郎", text: "こんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちは", img: "https://storage.googleapis.com/remollege-storage/static/waseda.jpg"},
  {id:1, userId: 2, name: "ピコピコポン太郎", text: "こんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちは", img: "https://storage.googleapis.com/remollege-storage/static/waseda.jpg"},
  {id:1, userId: 2, name: "ピコピコポン太郎", text: "こんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちは", img: "https://storage.googleapis.com/remollege-storage/static/waseda.jpg"},
  {id:1, userId: 2, name: "ピコピコポン太郎", text: "こんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちは", img: "https://storage.googleapis.com/remollege-storage/static/waseda.jpg"},
  {id:1, userId: 2, name: "ピコピコポン太郎", text: "こんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちは", img: "https://storage.googleapis.com/remollege-storage/static/waseda.jpg"},
  {id:1, userId: 1, name: "ピコピコポン太郎", text: "こんにちは", img: "https://storage.googleapis.com/remollege-storage/static/waseda.jpg"},
  {id:1, userId: 2, name: "ピコピコポン太郎", text: "こんにちは", img: "https://storage.googleapis.com/remollege-storage/static/waseda.jpg"},
]

export const Default = Template.bind({})
Default.args = {
  drawer: true,
  messages: messages
}
