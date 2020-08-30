import ActionButton from './ActionButton.vue';

export default {
  title: 'Atoms/ActionButton',
  component: ActionButton,
  argTypes: {
    icon: "mdi-door",
    text: "EXIT",
    to: "./",
    xlarge: false,
    onClick: { action: 'clicked' }
    //size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ActionButton },
  template: '<ActionButton @click="onClick" v-bind="$props"/>',
});

export const Default = Template.bind({});
Default.args = {
  icon: "mdi-door",
  text: "EXIT",
  to: "./",
  xlarge: false,
};

export const XLarge = Template.bind({});
XLarge.args = {
  icon: "mdi-door",
  text: "EXIT",
  to: "./",
  xlarge: true,
};
