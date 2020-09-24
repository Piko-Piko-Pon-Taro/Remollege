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
    <v-card
      :color="$const.BASE_COLOR2"
      tile
      class="overflow-y-auto"
      height="60%"
      style="resize: vertical;"
    >
      <v-timeline dense align-top>
        <v-timeline-item
          :color="$const.BASE_COLOR2"
          v-for="item in messages"
          :key="item"
          large
          fill-dot
        >
          <template v-slot:icon>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-avatar v-bind="attrs" v-on="on">
                  <img :src="item.user.img" />
                </v-avatar>
              </template>
              <span>{{ item.user.name }}</span>
            </v-tooltip>
          </template>
          <v-card
            :color="
              item.user.id == authUserId
                ? $const.ACCENT_COLOR
                : $const.BASE_COLOR2
            "
            :light="item.user.id != authUserId"
            class="elevation-2 mr-5"
            style="display: inline-block;"
          >
            <v-card-text>{{ item.text }}</v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-card>
    <MessageInput @send="sendMessage" label="Chat" />
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
      default: null
    },
    authUserId: {
      type: Number,
      default: null
    }
  },
  methods: {
    sendMessage(value) {
      this.$emit('send', value)
    },
    syncDrawer(value) {
      this.$emit('input', value)
    }
  }
}
</script>
