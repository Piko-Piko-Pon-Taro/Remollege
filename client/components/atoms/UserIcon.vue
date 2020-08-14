<template>
  <v-list-item-avatar>
    <v-img v-if="src" :src="require('@/assets/image/' + src)" />
    <v-icon v-else :size="size" :large="size == undefined">
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
    size: {
      type: Number,
      default: undefined
    }
  }
}
</script>
