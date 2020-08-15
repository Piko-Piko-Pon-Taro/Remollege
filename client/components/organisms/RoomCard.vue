<template>
  <v-card :color="$const.MAIN_COLOR" class="mx-auto" max-width="400" dark>
    <v-img
      :src="require('@/assets/image/classroom1.jpg')"
      class="white--text align-end"
      height="200px"
    />

    <v-card-title class="pb-0">{{ room.name }}教室</v-card-title>

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
