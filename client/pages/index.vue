<template>
  <v-container>
    <v-row no-gutters>
      <v-col v-for="building in buildings" :key="building.id" cols="3">
        <BuildingCard :building="building" class="my-3" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {
    BuildingCard: () => import('@/components/organisms/BuildingCard')
  },
  computed: {
    buildings() {
      return this.$store.getters['buildings/all']
    }
  },
  async asyncData({ store }) {
    // TODO: 最初にまとめて呼べるようにしたい
    await Promise.all([store.dispatch('buildings/fetchAll')])
  },
  async beforeCreate() {
    if (process.client) {
      try {
        switch (this.$auth.$storage.getUniversal('strategy')) {
          case 'waseda':
            const { data } = await this.$axios.post(
              '/auth/waseda',
              {},
              {
                headers: {
                  Authorization: this.$auth.$storage.getUniversal(
                    '_token.waseda'
                  )
                }
              }
            )
            this.$auth.$storage.removeUniversal('_token.waseda')
            this.$auth.$storage.setUniversal('strategy', 'local')
            this.$axios.setToken(`Bearer ${data.accessToken}`)
            this.$auth.$storage.setUniversal(
              '_token.local',
              `Bearer ${data.accessToken}`
            )
            this.$auth.$storage.setUniversal(
              '_refresh_token.local',
              `Bearer ${data.refreshToken}`
            )
            this.$auth.fetchUser()
            break
          default:
            break
        }
      } catch (e) {
        this.$auth.$storage.setState('loggedIn', false)
        this.$toast.error('ログインできませんでした。')
      }
    }
  }
}
</script>
