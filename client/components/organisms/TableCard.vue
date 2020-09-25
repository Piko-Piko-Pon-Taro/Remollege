<template>
  <v-card :color="$const.MAIN_COLOR" dark height="100%">
    <v-card-title class="headline pb-0">{{ name }}</v-card-title>
    <v-card-actions>
      <v-row align="center">
        <v-col md="4" sm="5" cols="12" class="py-sm-3 py-0">
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
        <v-spacer />
        <v-col md="6" sm="5" cols="12" class="py-sm-3 py-0">
          <v-row no-gutters class="mx-sm-3 mr-5 ml-n2">
            <v-col
              v-for="(num, i) in maxPeople"
              :key="i"
              xl="2"
              md="4"
              sm="6"
              cols="2"
            >
              <span @click.stop="table.users[i] && (dialog = true)">
                  <UserIcon
                    :src="table.users[i] ? table.users[i].img : undefined"
                    :icon="table.users[i] ? undefined : 'mdi-selection-ellipse'"
                    :name="table.users[i] ? table.users[i].name : null"
                  />
              </span>
              <v-dialog v-if="table.users[i]" v-model="dialog" width="600">
                <ProfileCard
                  :name="table.users[i].name"
                  :image="table.users[i].img"
                  :profile="table.users[i].profile"
                  @save="updateProfile"
                />
              </v-dialog>
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
    UserIcon: () => import('@/components/atoms/UserIcon'),
    ProfileCard: () => import('@/components/organisms/ProfileCard')
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
  data() {
    return {
      dialog: false
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
    },
    updateProfile(value, file) {
      this.$store.dispatch('updateAuthUser', { user: value, file })
    }
  }
}
</script>
