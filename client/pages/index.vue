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
  data() {
    return {
      buildings: [
        {
          id: 1,
          num: 52
        },
        {
          id: 2,
          num: 53
        },
        {
          id: 3,
          num: 54
        },
        {
          id: 4,
          num: 55
        },
        {
          id: 5,
          num: 56
        },
        {
          id: 6,
          num: 57
        },
        {
          id: 7,
          num: 58
        },
        {
          id: 8,
          num: 59
        },
        {
          id: 9,
          num: 60
        },
        {
          id: 10,
          num: 61
        },
        {
          id: 11,
          num: 62
        },
        {
          id: 12,
          num: 63
        }
      ]
    }
  },
  async asyncData({ store }) {
    // TODO: 最初にまとめて呼べるようにしたい
    await Promise.all([store.dispatch('auth/getCurrentUser')])
  }
}
</script>
