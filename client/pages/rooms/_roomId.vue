<template>
  <v-container>
    <ExitButton :to="'/buildings/' + buildingId" />
    <TeacherCard :teacher="teacher" class="my-5" />
    <v-row no-gutters>
      <v-col v-for="k in 15" :key="k" cols="4">
        <v-card class="pa-2">
          <TableCard
            :seatedTableId="seatedTableId"
            :table="tables[k - 1]"
            @sitDown="sitDown"
            @standUp="standUp"
            class="my-3"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {
    ExitButton: () => import('@/components/atoms/ExitButton'),
    TeacherCard: () => import('@/components/organisms/TeacherCard'),
    TableCard: () => import('@/components/organisms/TableCard')
  },
  data() {
    return {
      teacher: {
        name: '田中愛治総長',
        img: 'teacher.jpg'
      },
      seatedTableId: null,
      user: {
        id: 1,
        name: 'ピコピコ ぽん太郎',
        img: 'sampleIcon1.jpg'
      }
    }
  },
  asyncData({ store, route, error }) {
    const roomId = route.params.roomId
    const buildingId = 1 // あとでDBから取ってくる
    const tables = Array(16)
      .fill(0)
      .map((value, index) => {
        if (index === 3) {
          return {
            id: index + 1,
            users: [
              { id: 2, name: '井上 智裕', img: 'sampleIcon2.png' },
              { id: 3, name: '渡辺 豪志', img: 'sampleIcon3.jpg' },
              { id: 4, name: '西井 祐貴', img: 'sampleIcon4.jpg' },
              { id: 5, name: '平 和也', img: 'sampleIcon5.jpeg' }
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
          this.tables[index].users.push(this.user)
        }
      })
    },
    standUp() {
      this.tables.forEach((table, index) => {
        if (table.id === this.seatedTableId) {
          table.users.forEach((user, index2) => {
            if (user.id === this.user.id) {
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
