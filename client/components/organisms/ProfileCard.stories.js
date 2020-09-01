import { base, filename } from 'paths.macro';
import ProfileCard from './ProfileCard.vue';

export default {
  title: `${base.replace("/components/","")}${filename.replace(".stories", "")}`,
  component: ProfileCard,
  argTypes: {
    onClick: { action: 'clicked' }
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ProfileCard },
  template: '<ProfileCard @click="onClick" v-bind="$props"/>',
});

export const MyProfileCard = Template.bind({});
MyProfileCard.args = {
  name: "ピコピコぽん太郎",
  image: "sampleIcon1.jpg",
  text: "先進理工学部家系学科3年生です。",
  isEditable: true
};
