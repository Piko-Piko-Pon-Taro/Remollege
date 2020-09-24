<template>
  <v-container>
    <v-row class="pl-1">
      <ExitButton :to="`/buildings/${room.buildingId}`" class="mr-3" />
      <HintText text="レッツ通話 🙋‍♂️" class="my-2 mr-3" />
      <TeacherBanner
        v-if="seatedTableId"
        :img="teacher.img"
        :name="teacher.name"
        class="ml-2"
      />
    </v-row>
    <TeacherCard v-if="!seatedTableId" :teacher="teacher" class="mt-3 mb-5" />

    <VideoArea
      ref="videoArea"
      v-show="seatedTableId"
      :user="$auth.user"
      :tables="room.tables"
      :seatedTableId="seatedTableId"
      @leave="leave"
      @chat="chatDrawer = !chatDrawer"
      :naviValue="naviValue"
      @navi="
        (value) => {
          naviValue = value
        }
      "
    />

    <v-card :color="$const.BASE_COLOR2">
      <v-row class="mx-0">
        <v-col
          v-for="(table, i) in room.tables"
          :key="i"
          md="4"
          sm="6"
          cols="12"
        >
          <TableCard
            :processing="processing"
            :maxPeople="6"
            :seatedTableId="seatedTableId"
            :table="table"
            :name="`Table${i + 1}`"
            @sitDown="sitDown"
            @leave="leave"
          />
        </v-col>
      </v-row>
    </v-card>

    <Chat
      :value="chatDrawer"
      @input="toggleChat"
      :messages="chats"
      :authUserId="$auth.user.id"
      @send="sendChat"
    />
  </v-container>
</template>

<script>
export default {
  components: {
    ExitButton: () => import('@/components/atoms/ExitButton'),
    HintText: () => import('@/components/atoms/HintText'),
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
      naviValue: undefined,
      processing: false
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
    await store.dispatch('fetchAllData')
    await store.dispatch('rooms/updateByRoomId', {
      roomId: route.params.roomId
    })
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
    async sitDown(value) {
      this.processing = true
      this.seatedTableId = value
      await this.$refs.videoArea.initChat(
        this.$route.params.roomId + '-' + this.seatedTableId
      )
      await this.socket.emit('sitDown', {
        roomId: this.room.id,
        tableId: this.seatedTableId,
        userId: this.$auth.user.id
      })
      this.processing = false
    },
    async leave() {
      this.processing = true
      await this.$refs.videoArea.closeCall()
      await this.socket.emit('standUp', {
        roomId: this.room.id,
        tableId: this.seatedTableId,
        userId: this.$auth.user.id
      })
      await this.$store.dispatch('chats/reset')
      this.seatedTableId = null
      this.processing = false
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
    toggleChat(value) {
      this.chatDrawer = value
      if (value === false) {
        this.naviValue = null
      }
    }
  }
}
</script>
