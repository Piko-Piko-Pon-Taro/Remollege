<template>
  <v-card :color="$const.MAIN_COLOR" class="mx-auto" max-width="400" dark>
    <v-img
      :src="require('@/assets/image/' + teacher.img)"
      class="white--text align-end"
      height="200px"
    />
    <v-card-title class="pb-0">{{ teacher.name }}</v-card-title>
  </v-card>
</template>

<script>
export default {
  props: {
    teacher: {
      type: Object,
      default: null
    }
  }
}
</script>
