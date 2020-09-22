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
      :user="$auth.user"
      @leave="leave"
      @chat="chatDrawer = !chatDrawer"
      :naviValue="naviValue"
      @navi="(value) => {naviValue = value}"
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

    <Chat :value="chatDrawer" @input="toggleChat" :messages="chats" :authUserId="$auth.user.id" @send="sendChat"/>

  </v-container>
</template>

<script>
export default {
  components: {
    ExitButton: () => import('@/components/atoms/ExitButton'),
    TeacherCard: () => import('@/components/organisms/TeacherCard'),
    TeacherBanner: () => import('@/components/organisms/TeacherBanner'),
    TableCard: () => import('@/components/organisms/TableCard'),
    VideoArea: () => import('@/components/organisms/VideoArea'),
    Chat: () => import('@/components/organisms/Chat')
  },
  data() {
    return {
      teacher: {
        name: '田中愛治総長',
        img:
          'https://storage.googleapis.com/remollege-storage/1599556564604teacher.jpg'
      },
      seatedTableId: null,
      chatDrawer: false,
      naviValue: undefined
      // chat: ''
    }
  },
  computed: {
    room() {
      return this.$store.getters['rooms/oneByRoomId'](this.$route.params.roomId)
    },
    chats() {
      return this.$store.getters['chats/all']
    }
  },
  async asyncData({ store, route }) {
    await Promise.all([
      // TODO: 最初にまとめて呼べるようにしたい
      store.dispatch('rooms/updateByRoomId', {
        roomId: route.params.roomId
      })
    ])
  },
  mounted() {
    this.socket = this.$nuxtSocket({})
    this.socket.emit('enter', {
      roomId: this.room.id
    })
  },
  created() {
    if (process.client) {
      // リロード用
      window.addEventListener('beforeunload', this.leave) // eslint-disable-line
    }
  },
  destroyed() {
    if (process.client) { // eslint-disable-line
      // リロード用
      window.removeEventListener('beforeunload', this.leave)
    }
  },
  beforeRouteLeave(to, from, next) {
    // ブラウザバック・ページ遷移した時用
    this.leave()
    this.$refs.videoArea.peer.disconnect()
    next()
  },
  methods: {
    sitDown(value) {
      this.seatedTableId = value
      this.$refs.videoArea.initChat(
        this.$route.params.roomId + '-' + this.seatedTableId
      )
      this.socket.emit('sitDown', {
        roomId: this.room.id,
        tableId: this.seatedTableId,
        userId: this.$auth.user.id
      })
    },
    sendChat(value) {
      // 空白のみの場合何もしない
      if (!value.trim()) return

      // 時刻を作る
      let now = new Date() // 現在時刻（世界標準時）を取得
      now.setTime(now.getTime() + 1000 * 60 * 60 * 9) // 日本時間に変換
      now = now
        .toJSON()
        .split('T')[1]
        .slice(0, 5) // 時刻のみを取得

      // メッセージオブジェクトを作る
      const chat = {
        user: {
          id: this.$auth.user.id,
          name: this.$auth.user.name,
          img: this.$auth.user.img
        },
        text: value.trim(),
        time: now
      }

      // サーバー側にメッセージを送信する
      this.socket.emit('sendChat', { tableId: this.seatedTableId, chat })
    },
    leave() {
      this.$refs.videoArea.closeCall()
      this.socket.emit('standUp', {
        roomId: this.room.id,
        tableId: this.seatedTableId,
        userId: this.$auth.user.id
      })
      this.seatedTableId = null
      this.$store.dispatch('chats/reset')
    },
    toggleChat(value) {
      this.chatDrawer = value
      if (value == false) {
        this.naviValue = null
      }
    }
  }
}
</script>
