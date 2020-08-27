<template>
  <v-container>
    <v-row>
      <ExitButton :to="`/buildings/${room.buildingId}`" />
      <TeacherBanner
        v-if="seatedTableId"
        :img="teacher.img"
        :name="teacher.name"
      />
    </v-row>
    <TeacherCard v-if="!seatedTableId" :teacher="teacher" class="my-5" />

    <VideoArea
      ref="videoArea"
      v-show="seatedTableId"
      :user="currentUser"
      :chatId="seatedTableId ? `${room.id}-${seatedTableId}` : null"
      @leave="leave"
    />

    <v-card :color="$const.BASE_COLOR2">
      <v-row no-gutters>
        <v-col v-for="table in room.tables" :key="table.id" cols="4">
          <TableCard
            :seatedTableId="seatedTableId"
            :table="table"
            @sitDown="sitDown"
            @leave="leave"
            class="my-3 mx-3"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  components: {
    ExitButton: () => import('@/components/atoms/ExitButton'),
    TeacherCard: () => import('@/components/organisms/TeacherCard'),
    TeacherBanner: () => import('@/components/organisms/TeacherBanner'),
    TableCard: () => import('@/components/organisms/TableCard'),
    VideoArea: () => import('@/components/organisms/VideoArea')
  },
  data() {
    return {
      teacher: {
        name: '田中愛治総長',
        img: 'teacher.jpg'
      },
      seatedTableId: null
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters['auth/user']
    },
    room() {
      return this.$store.getters['rooms/oneByRoomId'](
        Number(this.$route.params.roomId)
      )
    }
  },
  async asyncData({ store, route }) {
    await Promise.all([
      // TODO: 最初にまとめて呼べるようにしたい
      store.dispatch('auth/fetchCurrentUser'),
      store.dispatch('rooms/updateByRoomId', {
        roomId: Number(route.params.roomId)
      })
    ])
  },
  methods: {
    sitDown(value) {
      this.seatedTableId = value
      this.$refs.videoArea.makeCall()
      this.$store.dispatch('rooms/seatAtTable', {
        roomId: this.room.id,
        tableId: this.seatedTableId
      })
    },
    leave() {
      this.$store.dispatch('rooms/leaveFromTable', {
        roomId: this.room.id,
        tableId: this.seatedTableId
      })
      this.seatedTableId = null
    }
  }
}
</script>
