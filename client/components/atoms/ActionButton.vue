<template>
  <v-btn
    :to="to"
    :color="$const.ACCENT_COLOR"
    @click.stop="click"
    class="ma-2"
    nuxt
    depressed
  >
    <v-icon v-if="icon" left>{{ icon }}</v-icon>
    {{ text }}
  </v-btn>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: null
    },
    to: {
      type: Object,
      default: null
    },
    text: {
      type: String,
      default: null
    }
  },
  methods: {
    click() {
      this.$emit('click')
    }
  }
}
</script>
