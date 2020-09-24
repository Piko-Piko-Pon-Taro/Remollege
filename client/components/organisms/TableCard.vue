<template>
  <v-card :color="$const.MAIN_COLOR" dark height="100%">
    <v-card-title class="headline pb-0">{{ name }}</v-card-title>
    <v-card-actions>
      <v-row align="center">
        <v-col>
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
        <v-col>
          <div>
            <UserIcon
              v-for="i in 6"
              :key="i"
              :src="table.users[i - 1] ? table.users[i - 1].img : undefined"
              :icon="table.users[i - 1] ? undefined : 'mdi-selection-ellipse'"
              class="mx-1"
            />
          </div>
        </v-col>
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
    name: {
      type: String,
      default: null
    },
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
