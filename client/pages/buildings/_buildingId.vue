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
  asyncData({ store, route, error }) {
    const buildingId = route.params.buildingId
    const buildingNum = 51 + Number(buildingId)
    const rooms = Array(16)
      .fill(0)
      .map((value, index) => {
        const roomId = (buildingId - 1) * 16 + index + 1
        const roomIdInBuilding = roomId % 16 || 16
        return {
          id: roomId,
          name:
            buildingNum +
            '-' +
            Math.ceil(roomIdInBuilding / 4) +
            '0' +
            (roomIdInBuilding % 4 || 4)
        }
      })
    return { buildingId, rooms }
  }
}
</script>
