<template>
  <v-card :color="$const.MAIN_COLOR" dark class="px-5 my-2" height="50px">
    <v-row>
      <UserIcon :src="img" class="mx-1 my-1" />
      <v-card-title class="py-0">{{ name }}</v-card-title>
    </v-row>
  </v-card>
</template>

<script>
export default {
  components: {
    UserIcon: () => import('@/components/atoms/UserIcon')
  },
  props: {
    name: {
      type: String,
      default: null
    },
    img: {
      type: String,
      default: null
    }
  }
}
</script>
