<template>
  <v-container>
    <ExitButton :to="'/'" />
    <v-row no-gutters>
      <v-col v-for="room in rooms" :key="room.id" cols="3">
        <RoomCard :room="room" class="my-3" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {
    ExitButton: () => import('@/components/atoms/ExitButton'),
    RoomCard: () => import('@/components/organisms/RoomCard')
  },
  computed: {
    rooms() {
      return this.$store.getters['rooms/allByBuildingId'](
        this.$route.params.buildingId
      )
    }
  },
  async asyncData({ store, route }) {
    await Promise.all([
      // TODO: 最初にまとめて呼べるようにしたい
      store.dispatch('auth/fetchCurrentUser'),
      store.dispatch('rooms/fetchByBuildingId', {
        buildingId: route.params.buildingId
      })
    ])
  }
}
</script>
