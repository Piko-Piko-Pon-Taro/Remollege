<template>
  <div class="ma-0 pa-0">
    <v-btn
      v-if="to"
      :to="to"
      :color="$const.ACCENT_COLOR"
      @click.stop="click"
      :x-large="xlarge"
      class="ma-2"
      nuxt
      depressed
      dark
    >
      <v-icon v-if="icon" left>{{ icon }}</v-icon>
      {{ text }}
    </v-btn>
    <v-btn
      v-else
      :color="$const.ACCENT_COLOR"
      @click.stop="click"
      :x-large="xlarge"
      class="ma-2"
      depressed
      dark
    >
      <v-icon v-if="icon" left>{{ icon }}</v-icon>
      {{ text }}
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: null
    },
    to: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: null
    },
    xlarge: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    click() {
      this.$emit('click')
    }
  }
}
</script>
