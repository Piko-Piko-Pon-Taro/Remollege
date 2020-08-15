<template>
  <v-card :color="$const.MAIN_COLOR" class="mx-auto" max-width="400">
    <v-img
      :src="require('@/assets/image/building' + building.num + '.png')"
      class="white--text align-end"
      height="200px"
    />

    <v-card-title class="pb-0">{{ building.num }}号館</v-card-title>

    <v-card-actions>
      <ActionButton :to="'/buildings/' + building.id" text="ENTER" />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  components: {
    ActionButton: () => import('@/components/atoms/ActionButton')
  },
  props: {
    building: {
      type: Object,
      default: null
    }
  }
}
</script>
