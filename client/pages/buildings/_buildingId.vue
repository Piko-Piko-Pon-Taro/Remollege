<template>
  <v-layout wrap>
    <RoomCard v-for="room in rooms" :key="room.id" :room="room" class="my-3" />
  </v-layout>
</template>

<script>
export default {
  components: {
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
