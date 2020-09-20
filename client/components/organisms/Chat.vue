<template>
<v-navigation-drawer
      :value="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      dark
      right
      width="600"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            CHAT
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-card :color="$const.BASE_COLOR2" tile>
          <v-timeline light dense align-top>
              <v-virtual-scroll
                :items="messages"
                :item-height="100"
                height="800"
              >
                <template v-slot="{ item }">
                  <v-timeline-item
                    large
                    fill-dot
                    :color="$const.ACCENT_COLOR"
                  >
                    <template v-slot:icon>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-avatar v-bind="attrs"
                            v-on="on">
                            <img :src="item.img">
                          </v-avatar>
                        </template>
                        <span>{{item.name}}</span>
                      </v-tooltip>
                    </template>
                    <v-card class="elevation-2 mr-5" :width="item.text.length < 20 ? item.text.length*21 : undefined" :color="item.userId == authUserId ? $const.ACCENT_COLOR : $const.BASE_COLOR2" :dark="item.userId == authUserId">
                      <v-card-text>{{item.text}}</v-card-text>
                    </v-card>
                  </v-timeline-item>
                </template>
              </v-virtual-scroll>
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
    drawer: {
      type: Boolean,
      default: false
    },
    messages: {
      type: Array,
      default: false
    }
  },
  data () {
    return {
      authUserId: 1 // テスト用に使用
    }
  },
  methods: {
    sendMessage(value) {
      this.messages.push({id:1, userId: 1, name: "ピコピコポン太郎", text: value, img: "https://storage.googleapis.com/remollege-storage/static/waseda.jpg"})
      // this.$emit('send', this.value)
    },
  }
}
</script>