<template>
  <v-app>
    <!-- sidebar -->
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
          v-show="$auth.loggedIn"
          :to="'/'"
          style="text-decoration: none; color: white;"
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

        <v-dialog v-model="dialog" width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-list-item v-bind="attrs" v-on="on" v-show="$auth.loggedIn" link>
              <v-list-item-action>
                <v-icon>mdi-account</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  MY PROFILE
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <ProfileCard
            v-if="$auth.loggedIn"
            :name="$auth.user.name"
            :image="$auth.user.img"
            :profile="$auth.user.profile"
            @save="updateProfile"
            is-editable
          />
        </v-dialog>

        <nuxt-link
          v-show="!$auth.loggedIn"
          :to="'/login'"
          style="text-decoration: none; color: white;"
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
          v-show="$auth.loggedIn"
          style="color: white; text-decoration: none;"
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
    <!-- sidebar -->

    <!-- header -->
    <v-app-bar
      :clipped-left="clipped"
      :color="$const.MAIN_COLOR"
      fixed
      app
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <nuxt-link
        to="/"
        style="color: white; text-decoration: none;"
        class="ml-sm-5"
      >
        <v-toolbar-title v-text="title" />
      </nuxt-link>
      <!-- TODO: マウスホバーした時指マークにしたい -->
      <v-card-actions
        v-if="$auth.loggedIn"
        @click="dialog = true"
        class="d-none d-sm-flex"
      >
        <UserIcon :src="$auth.user.img" class="mr-2" />
        <p class="my-auto">{{ $auth.user.name }}</p>
      </v-card-actions>
      <v-spacer></v-spacer>
      <p v-if="hint" class="my-auto white black--text pa-2 rounded">
        {{ hint }}
      </p>
    </v-app-bar>
    <!-- header -->

    <!-- main -->
    <v-main :style="'background-color: ' + $const.BASE_COLOR + ';'">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <!-- main -->

    <!-- footer -->
    <v-footer :fixed="fixed" class="d-flex justify-center" dark app>
      <span class="mx-3">&copy; 2020 PikoPikoPonTaro</span>
      <span class="mx-3">ご連絡: remollege@gmail.com</span>
    </v-footer>
    <!-- footer -->
  </v-app>
</template>

<script>
export default {
  components: {
    UserIcon: () => import('@/components/atoms/UserIcon'),
    ProfileCard: () => import('@/components/organisms/ProfileCard')
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
      dialog: false
    }
  },
  computed: {
    hint() {
      let hint = ''
      switch (this.$route.name) {
        case 'index':
          hint = '建物を選んでね 🙋‍♂️'
          break
        case 'buildings-buildingId':
          hint = 'お部屋を選んでね 🙋‍♂️'
          break
        case 'rooms-roomId':
          hint = 'レッツ通話 🙋‍♂️'
          break
        default:
          break
      }
      return hint
    }
  },
  methods: {
    logout() {
      this.$auth.logout()
    },
    updateProfile(value, file) {
      this.$store.dispatch('updateAuthUser', { user: value, file })
    }
  }
}
</script>
