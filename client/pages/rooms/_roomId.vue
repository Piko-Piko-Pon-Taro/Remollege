<template>
  <v-container>
    <v-row>
      <ExitButton :to="'/buildings/' + buildingId" />
      <TeacherBanner
        v-if="seatedTableId"
        :img="teacher.img"
        :name="teacher.name"
      />
    </v-row>
    <TeacherCard v-if="!seatedTableId" :teacher="teacher" class="my-5" />

    <VideoArea
      v-show="seatedTableId"
      :user="currentUser"
      :roomId="
        seatedTableId ? String(roomId) + '-' + String(seatedTableId) : null
      "
      @leave="leave"
    />

    <v-card :color="$const.BASE_COLOR2">
      <v-row no-gutters>
        <v-col v-for="k in 15" :key="k" cols="4">
          <TableCard
            :seatedTableId="seatedTableId"
            :table="tables[k - 1]"
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
    }
  },
  async asyncData({ store, route, error }) {
    await Promise.all([
      // TODO: 最初にまとめて呼べるようにしたい
      store.dispatch('auth/getCurrentUser')
    ])
    const roomId = route.params.roomId
    const buildingId = 1 // あとでDBから取ってくる
    // const tables = this.$api.get('/rooms/' + roomId + '/tables/', {headers:{
    // Authorization: `Bearer ${this.token}`
    // }})
    const tables = Array(16)
      .fill(0)
      .map((value, index) => {
        if (index === 3) {
          return {
            id: index + 1,
            users: [
              { id: 2, name: '井上 智裕', img: 'sampleIcon2.png' },
              { id: 3, name: '渡辺 豪志', img: 'sampleIcon3.jpg' }
              // { id: 4, name: '西井 祐貴', img: 'sampleIcon4.jpg' },
              // { id: 5, name: '平 和也', img: 'sampleIcon5.jpeg' }
            ]
          }
        } else {
          return {
            id: index + 1,
            users: []
          }
        }
      })
    return { buildingId, roomId, tables }
  },
  methods: {
    sitDown(value) {
      this.seatedTableId = value
      this.tables.forEach((table, index) => {
        if (table.id === this.seatedTableId) {
          this.tables[index].users.push(this.currentUser)
        }
      })
    },
    leave() {
      this.tables.forEach((table, index) => {
        if (table.id === this.seatedTableId) {
          table.users.forEach((user, index2) => {
            if (user.id === this.currentUser.id) {
              this.tables[index].users.splice(index2, 1)
            }
          })
        }
      })
      this.seatedTableId = null
    }
  }
}
</script>
