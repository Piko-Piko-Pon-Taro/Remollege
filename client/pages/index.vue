<template>
  <v-container>
    <v-row class="pl-3">
      <HintText text="建物を選んでね 🙋‍♂️" class="my-2" />
    </v-row>
    <v-row>
      <v-col
        v-for="building in buildings"
        :key="building.id"
        lg="3"
        md="4"
        sm="6"
        cols="12"
      >
        <BuildingCard :building="building" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {
    HintText: () => import('@/components/atoms/HintText'),
    BuildingCard: () => import('@/components/organisms/BuildingCard')
  },
  computed: {
    buildings() {
      return this.$store.getters['buildings/all']
    }
  },
  async asyncData({ store, $auth }) {
    if ($auth.loggedIn && $auth.$storage.getUniversal('strategy') === 'local') {
      await store.dispatch('fetchAllData')
    }
  },
  beforeCreate() {
    if (
      process.client &&
      this.$auth.$storage.getUniversal('strategy') === 'waseda'
    ) {
      this.$auth
        .loginWith('local', {
          headers: {
            authorization: this.$auth.$storage.getUniversal('_token.waseda')
          }
        })
        .then((result) => {
          this.$toast.success('ログインしました')
          this.$store.dispatch('fetchAllData')
          this.$auth.setRefreshToken(
            'local',
            `bearer ${result.data.refreshToken}`
          )
          // TODO: いまここ。refreshTokenを保存することはできた。次は、refreshTokenを使ってaccessTokenを30分に一回更新するところから。
        })
        .catch((e) => {
          this.$toast.error('ログインできませんでした')
          this.$auth.$storage.removeUniversal('_token.local')
          this.$auth.$storage.removeUniversal('_refresh_token.local')
        })
        .finally(() => {
          this.$auth.$storage.removeUniversal('waseda.state')
          this.$auth.$storage.removeUniversal('_token.waseda')
          this.$auth.$storage.removeUniversal('_refresh_token.waseda')
        })
    }
  }
}
</script>
