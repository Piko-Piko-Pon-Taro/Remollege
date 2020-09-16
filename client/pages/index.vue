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
  beforeCreate() {
    if (process.client) {
      switch (this.$auth.$storage.getUniversal('strategy')) {
        case 'waseda':
          setTimeout(() => {
            this.$auth
              .loginWith('local', {
                headers: {
                  authorization: this.$auth.$storage.getUniversal(
                    '_token.waseda'
                  )
                }
              })
              .then((result) => {
                this.$toast.success('ログインしました')
              })
              .catch((e) => {
                this.$toast.error('ログインできませんでした')
              })
          }, 1000)
          break
        default:
          break
      }
    }
  }
}
</script>
