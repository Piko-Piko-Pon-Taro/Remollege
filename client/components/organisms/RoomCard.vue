<template>
  <v-card :color="$const.MAIN_COLOR" class="mx-auto" max-width="400">
    <v-img
      :src="require('@/assets/image/classroom1.jpg')"
      class="white--text align-end"
      height="200px"
    />

    <v-card-title class="pb-0">{{ room.name }}教室</v-card-title>

    <v-card-actions>
      <v-btn :to="'/rooms/' + room.id" color="orange" text nuxt>
        ENTER
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    room: {
      type: Object,
      default: null
    }
  }
}
</script>
