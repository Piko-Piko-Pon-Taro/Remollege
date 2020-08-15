<template>
  <v-card :color="$const.MAIN_COLOR" dark>
    <v-card-title class="headline pt-3 pb-0">Table</v-card-title>
    <v-card-actions>
      <ActionButton
        v-if="seatedTableId === null"
        @click="sitDown"
        text="Take a seat"
        class="mr-10"
      />
      <ActionButton
        v-else-if="seatedTableId === table.id"
        @click="leave"
        text="Leave"
        class="mr-10"
      />
      <div style="margin: 0 0 0 auto">
        <UserIcon
          v-for="i in 6"
          :key="i"
          :src="table.users[i - 1] ? table.users[i - 1].img : undefined"
          :icon="table.users[i - 1] ? undefined : 'mdi-selection-ellipse'"
          class="mx-1 px-0"
        />
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  components: {
    ActionButton: () => import('@/components/atoms/ActionButton'),
    UserIcon: () => import('@/components/atoms/UserIcon')
  },
  props: {
    table: {
      type: Object,
      default: null
    },
    seatedTableId: {
      type: Number,
      default: null
    }
  },
  methods: {
    sitDown() {
      this.$emit('sitDown', this.table.id)
    },
    leave() {
      this.$emit('leave')
    }
  }
}
</script>
