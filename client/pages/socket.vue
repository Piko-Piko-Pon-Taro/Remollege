<template>
  <div>
    <v-text-field v-model="text" @keydown.enter="send" label="Message" />
    <v-btn @click="send" large>
      Send
    </v-btn>
  </div>
</template>

<script>
// export default {
//   data() {
//     return {
//       socketId: null,
//       message: '',
//       messageLogs: [],
//       text: '',
//       name: '',
//       room: '',
//     }
//   },
//   mounted() {
//     this.socket = this.$nuxtSocket({})
//     this.socket.emit('addUser', { name: this.name, room: this.room }, data => {
//       if (typeof data === 'string') {
//         console.error(data)
//       } else {
//         user.id = data.userId
//         // this.setUser(user) // mutation
//       }
//     })
//   },
//   methods: {
//     send () {
//       this.socket.emit('createMessage', {
//         text: this.text,
//         id: this.$store.state.user.id
//       }, data => {
//         if (typeof data === 'string') {
//           console.error(data)
//         } else {
//           this.text = ''
//         }
//       })
//     }
//   }
// }
</script>
