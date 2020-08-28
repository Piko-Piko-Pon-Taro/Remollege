<template>
  <div>
    <p>room {{ this.roomId }}</p>
    <v-text-field v-model="message" @keydown.enter="send" label="Message" />
    <v-btn @click="send" large>
      Send
    </v-btn>
    <v-list-item v-for="(message, i) in messages" :key="i">
      <p>{{ message }}</p>
    </v-list-item>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      messages: []
    }
  },
  computed: {
    roomId() {
      const min = 1
      const max = 5
      return Math.floor(Math.random() * (max + 1 - min)) + min
    }
  },
  async asyncData({ store }) {
    // TODO: 最初にまとめて呼べるようにしたい
    await Promise.all([store.dispatch('auth/fetchCurrentUser')])
  },
  mounted() {
    this.socket = this.$nuxtSocket({})
    /* Listen for events: */
    this.socket.on('sendToEveryone', (data, cb) => {
      /* Handle event */
      this.messages.push(data.message)
    })
  },
  methods: {
    send() {
      /* Emit events */
      this.socket.emit(
        'send',
        {
          message: this.message
        },
        (res) => {
          /* Handle response, if any */
        }
      )
    }
  }
}
</script>
