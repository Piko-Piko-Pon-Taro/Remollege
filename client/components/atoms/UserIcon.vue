<template>
  <v-list-item-avatar :size="Number(size)">
    <v-img v-if="src" :src="src">
      <slot></slot>
    </v-img>
    <v-icon v-else-if="icon" :size="Number(size)">
      {{ icon }}
    </v-icon>
    <v-icon v-else :size="Number(size)">
      mdi-account-circle
    </v-icon>
  </v-list-item-avatar>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    size: {
      type: [Number, String],
      default: 40
    }
  }
}
</script>
