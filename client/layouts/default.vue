<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      dark
    >
      <v-list dense>
        <nuxt-link
          v-if="isAuthenticated"
          :to="'/'"
          style="text-decoration: none;color:white;"
        >
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-school</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                CAMPUS TOP
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </nuxt-link>

        <nuxt-link
          v-if="!isAuthenticated"
          :to="'/login'"
          style="text-decoration: none;color:white;"
        >
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-login</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                LOGIN
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </nuxt-link>

        <nuxt-link
          :to="'/login'"
          @click.native.stop="logout"
          v-if="isAuthenticated"
          style="color:white;text-decoration: none;"
        >
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                LOGOUT
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </nuxt-link>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      :color="$const.MAIN_COLOR"
      fixed
      app
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-card-actions>
        <v-card-text class="white--text">
          <UserIcon :src="user.icon" class="mr-2" />
          {{ user.name }}
        </v-card-text>
      </v-card-actions>
    </v-app-bar>
    <v-main :style="'background-color: ' + $const.BASE_COLOR + ';'">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
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
    <v-footer :fixed="fixed" dark app>
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
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Remollege',
      user: {
        name: 'ピコピコ ぽん太郎',
        icon: 'sampleIcon1.jpg'
      }
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/token'] !== null
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout')
    }
  }
}
</script>
