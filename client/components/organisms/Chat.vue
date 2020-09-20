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
          <v-timeline light dense>
              <v-virtual-scroll
                :items="messages"
                :item-height="100"
                height="800"
              >
                <template v-slot="{ item }">
                  <v-timeline-item
                    large
                    fill-dot
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
                    <v-card class="elevation-2 mr-5" :width="item.text.length < 20 ? item.text.length*21 : undefined">
                      <v-card-text>{{item.text}}</v-card-text>
                    </v-card>
                  </v-timeline-item>
                </template>
              </v-virtual-scroll>
            </v-timeline>
<!-- <v-timeline dense>
      <v-timeline-item
        v-for="n in 2"
        :key="n"
      >
      <template v-slot:icon>
        <v-avatar>
          <img src="https://storage.googleapis.com/remollege-storage/static/waseda.jpg">
        </v-avatar>
      </template>
      <template v-slot:opposite>
        <span>ピコピコポン太郎</span>
      </template>
        <span slot="opposite">Tus eu perfecto</span>
        <v-card class="elevation-2" :color="$const.ACCENT_COLOR">
          <v-card-title class="headline">Lorem ipsum</v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline> -->

      </v-card>

    </v-navigation-drawer>
</template>

<script>
export default {
  components: {
    ActionButton: () => import('@/components/atoms/ActionButton')
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
  }
}
</script>