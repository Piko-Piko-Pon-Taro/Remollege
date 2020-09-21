<template>
  <v-container>
    <v-row class="px-3">
      <v-spacer></v-spacer>
      <v-card outlined class="pa-3">早稲田大学 西早稲田キャンパス</v-card>
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
          this.$auth.$storage.removeUniversal('_refresh_token.waseda')
        })
        .catch((e) => {
          this.$toast.error('ログインできませんでした')
        })
    }
  }
}
</script>
