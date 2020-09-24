<template>
  <v-card :color="$const.MAIN_COLOR" dark height="100%">
    <v-card-title class="headline pb-0">{{ name }}</v-card-title>
    <v-card-actions>
      <v-row align="center">
        <v-col>
          <ActionButton
            v-if="seatedTableId === null"
            @click="sitDown"
            :disabled="sitBtnDisabled"
            text="Take a seat"
          />
          <ActionButton
            v-else-if="seatedTableId === table.id"
            @click="leave"
            :disabled="leaveBtnDisabled"
            text="Leave"
          />
        </v-col>
        <v-col>
          <div>
            <UserIcon
              v-for="(num, i) in maxPeople"
              :key="i"
              :src="table.users[i] ? table.users[i].img : undefined"
              :icon="table.users[i] ? undefined : 'mdi-selection-ellipse'"
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
    },
    maxPeople: {
      type: Number,
      required: true
    },
    processing: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    sitBtnDisabled() {
      return this.table.users.length === this.maxPeople || this.processing
    },
    leaveBtnDisabled() {
      return this.processing
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
