<template>
  <v-btn :to="to" class="ma-2" tile outlined x-large color="success" nuxt>
    <v-icon left>mdi-door</v-icon> EXIT
  </v-btn>
</template>

<script>
export default {
  props: {
    to: {
      type: Object,
      default: null
    }
  }
}
</script>
