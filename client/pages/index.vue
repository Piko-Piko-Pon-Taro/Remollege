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
  async asyncData({ store, $auth }) {
    if ($auth.$storage.getUniversal('strategy') === 'local' && $auth.loggedIn) {
      await Promise.all([
        store.dispatch('buildings/fetchByCampusId', { campusId: 1 })
      ])
    }
  },
  beforeCreate() {
    if (
      process.client &&
      this.$auth.$storage.getUniversal('strategy') === 'waseda'
    ) {
      setTimeout(() => {
        this.$auth
          .loginWith('local', {
            headers: {
              authorization: this.$auth.$storage.getUniversal('_token.waseda')
            }
          })
          .then((result) => {
            this.$toast.success('ログインしました')
            this.$store.dispatch('buildings/fetchByCampusId', { campusId: 1 })
            this.$auth.$storage.removeUniversal('waseda.state')
            this.$auth.$storage.removeUniversal('_token.waseda')
          })
          .catch((e) => {
            this.$toast.error('ログインできませんでした')
          })
      }, 1000)
    }
  }
}
</script>
