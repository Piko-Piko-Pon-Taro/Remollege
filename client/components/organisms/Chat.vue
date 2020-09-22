<template>
<v-navigation-drawer
      :value="value"
      @input="syncDrawer"
      clipped
      fixed
      dark
      right
      width="600"
      temporary
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            CHAT
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-card :color="$const.BASE_COLOR2" tile class="overflow-y-auto" height="800">
          <v-timeline dense align-top>
                  <v-timeline-item
                    large
                    :color="$const.BASE_COLOR2"
                    v-for="item in messages"
                    :key="item"
                    fill-dot
                  >
                    <template v-slot:icon>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-avatar v-bind="attrs"
                            v-on="on">
                            <img :src="item.user.img">
                          </v-avatar>
                        </template>
                        <span>{{item.user.name}}</span>
                      </v-tooltip>
                    </template>
                    <v-card class="elevation-2 mr-5" :width="item.text.length < 20 ? 36+item.text.length*14 : undefined" :color="item.user.id == authUserId ? $const.ACCENT_COLOR : $const.BASE_COLOR2" :light="item.user.id != authUserId">
                      <v-card-text>{{item.text}}</v-card-text>
                    </v-card>
                  </v-timeline-item>
            </v-timeline>
      </v-card>
      <MessageInput label="Chat" @send="sendMessage"/>

    </v-navigation-drawer>
</template>

<script>
export default {
  components: {
    MessageInput: () => import('@/components/molecules/MessageInput')
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    messages: {
      type: Array,
      default: false
    },
    authUserId: {
      type: Number,
      default: null
    }
  },
  methods: {
    sendMessage(value) {
      // this.messages.push({id:1, userId: 1, name: "ピコピコポン太郎", text: value, img: "https://storage.googleapis.com/remollege-storage/static/waseda.jpg"})
      this.$emit('send', value)
    },
    syncDrawer(value) {
      this.$emit('input', value)
    }
  }
}
</script>