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
        <nuxt-link v-show="$auth.loggedIn" :to="'/'">
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

        <nuxt-link v-show="!$auth.loggedIn" :to="'/login'">
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
      <nuxt-link to="/" class="ml-sm-5">
        <v-toolbar-title v-text="title" />
      </nuxt-link>
      <template v-if="$auth.loggedIn">
        <v-divider class="ml-5 d-none d-sm-flex" inset vertical></v-divider>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-card-actions
              @click="dialog = true"
              v-on="on"
              class="d-none d-sm-flex"
              style="cursor: pointer;"
            >
              <UserIcon :src="$auth.user.img" class="mr-2" />
              <p class="my-auto">{{ $auth.user.name }}</p>
            </v-card-actions>
          </template>
          <span>プロフィールを表示</span>
        </v-tooltip>
        <v-divider class="ml-4 d-none d-sm-flex" inset vertical></v-divider>
        <v-spacer class="d-flex d-sm-none"></v-spacer>
      </template>
      <Breadcrumb :items="breadcrumbs" />
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
    ProfileCard: () => import('@/components/organisms/ProfileCard'),
    Breadcrumb: () => import('@/components/organisms/Breadcrumb')
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
    breadcrumbs() {
      return this.$store.getters.breadcrumds({
        routeName: this.$route.name,
        routeParams: this.$route.params
      })
    }
  },
  methods: {
    logout() {
      this.$auth.logout()
      location.replace('/login')
    },
    updateProfile(value, file) {
      this.$store.dispatch('updateAuthUser', { user: value, file })
    }
  }
}
</script>

<style scoped>
.v-application a {
  text-decoration: none;
  color: #fff;
}
</style>
