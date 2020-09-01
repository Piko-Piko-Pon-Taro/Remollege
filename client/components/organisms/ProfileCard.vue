<template>
  <v-card :color="$const.MAIN_COLOR" width="600px" dark>
    <v-card-title>
      <span class="headline">プロフィール設定</span>
    </v-card-title>
    <UserIcon :src="image" :size="'200'"/>

  </v-card>
</template>

<script>
export default {
  components: {
    ActionButton: () => import('@/components/atoms/ActionButton'),
    UserIcon: () => import('@/components/atoms/UserIcon')
  },
  props: {
    name: {
      type: String,
      default: null
    },
    image: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: null
    },
    isEditable: {
      type: Boolean,
      default: false
    }
  }
}
</script>
