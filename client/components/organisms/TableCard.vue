<template>
  <v-card :color="$const.MAIN_COLOR" dark height="100%">
    <v-card-title class="headline pb-0">Table{{ table.id }}</v-card-title>
    <v-card-actions>
      <v-row align="center">
        <v-col md="4" sm="5" cols="12" class="py-sm-3 py-0">
          <ActionButton
            v-if="seatedTableId === null"
            @click="sitDown"
            text="Take a seat"
          />
          <ActionButton
            v-else-if="seatedTableId === table.id"
            @click="leave"
            text="Leave"
          />
        </v-col>
        <v-spacer />
        <v-col md="6" sm="5" cols="12" class="py-sm-3 py-0">
          <v-row no-gutters class="mx-sm-3 mr-5 ml-n2">
            <v-col v-for="i in 6" :key="i" xl="2" md="4" sm="6" cols="2">
              <UserIcon
                :src="table.users[i - 1] ? table.users[i - 1].img : undefined"
                :icon="table.users[i - 1] ? undefined : 'mdi-selection-ellipse'"
                :name="table.users[i - 1] ? table.users[i - 1].name : null"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-spacer />
      </v-row>
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
