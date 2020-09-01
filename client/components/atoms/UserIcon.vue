<template>
  <v-list-item-avatar :size="size">
    <v-img v-if="src" :src="require('@/assets/image/' + src)" />
    <v-icon v-else-if="icon" :size="size">
      {{ icon }}
    </v-icon>
    <v-icon v-else :size="size">
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
      type: Number,
      default: 40
    }
  }
}
</script>
