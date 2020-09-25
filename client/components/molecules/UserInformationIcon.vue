<template>
              <div>
              <span @click.stop="user && (dialog = true)">
                  <UserIcon
                    :src="user ? user.img : undefined"
                    :icon="user ? undefined : 'mdi-selection-ellipse'"
                    :name="user ? user.name : null"
                  />
              </span>
              <v-dialog v-if="user" v-model="dialog" width="600">
                <ProfileCard
                  :name="user.name"
                  :image="user.img"
                  :profile="user.profile"
                />
              </v-dialog>

              </div>
</template>

<script>
export default {
  components: {
    UserIcon: () => import('@/components/atoms/UserIcon'),
    ProfileCard: () => import('@/components/organisms/ProfileCard')
  },
  props: {
    user: {
      type: Object,
      default: null
    },
  },
  data() {
    return {
      dialog: false
    }
  },
}
</script>
