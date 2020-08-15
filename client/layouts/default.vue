<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" :color="$const.MAIN_COLOR" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-card-actions>
        <v-card-text class="white--text">
          <UserIcon :src="user.icon" class="mr-2" />
          {{ user.name }}
        </v-card-text>
      </v-card-actions>
    </v-app-bar>
    <v-content :style="'background-color: ' + $const.BASE_COLOR + ';'">
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2020 PikoPikoPonTaro</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  components: {
    UserIcon: () => import('@/components/atoms/UserIcon')
  },
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-school',
          title: 'CAMPUS TOP',
          to: '/'
        },
        {
          icon: 'mdi-logout',
          title: 'Logout',
          to: '/login'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Remollege',
      user: {
        name: 'ピコピコ ぽん太郎',
        icon: 'sampleIcon1.jpg'
      }
    }
  }
}
</script>
