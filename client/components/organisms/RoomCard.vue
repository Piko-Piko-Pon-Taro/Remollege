<template>
  <v-card
    :color="$const.MAIN_COLOR"
    class="mx-auto"
    max-width="400"
    height="100%"
    dark
  >
    <v-img :src="room.img" class="white--text align-end" height="200px" />

    <v-card-title class="pb-0">{{ room.name }}</v-card-title>

    <v-card-actions>
      <ActionButton :to="'/rooms/' + room.id" text="ENTER" />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  components: {
    ActionButton: () => import('@/components/atoms/ActionButton')
  },
  props: {
    room: {
      type: Object,
      default: null
    }
  }
}
</script>
