<template>
  <v-card width="600" class="mx-auto">
    <v-img :src="require('@/assets/image/waseda.jpg')" height="250px">
      <v-row class="fill-height">
        <UserIcon
          v-if="!isBeingEdited"
          :src="image"
          size="200"
          class="mx-auto"
        />
        <UserIcon
          v-if="isBeingEdited"
          :src="imageEdited"
          size="200"
          class="mx-auto"
        >
          <v-row>
            <v-layout style="width: 100%; margin: auto;">
              <v-overlay absolute>
                <v-file-input
                  @change="handleImageAdded"
                  class="justify-center"
                  accept="image/png, image/jpeg, image/bmp"
                  prepend-icon="mdi-camera-plus-outline"
                  style="text-align: center;"
                  hide-input
                />
              </v-overlay>
            </v-layout>
          </v-row>
        </UserIcon>
      </v-row>
    </v-img>

    <v-list two-line color="$const.BASE_COLOR2">
      <v-list-item>
        <v-list-item-icon>
          <v-icon :color="iconColor || $const.ACCENT_COLOR">mdi-account</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-subtitle>名前</v-list-item-subtitle>
          <v-list-item-title v-if="!isBeingEdited">{{
            name
          }}</v-list-item-title>
          <v-list-item-title v-if="isBeingEdited">
            <v-text-field v-model="nameEdited" filled flat dense
          /></v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon :color="iconColor || $const.ACCENT_COLOR"
            >mdi-information</v-icon
          >
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-subtitle>プロフィール</v-list-item-subtitle>
          <v-list-item-content v-if="!isBeingEdited">{{
            profile
          }}</v-list-item-content>
          <v-textarea
            v-model="profileEdited"
            v-if="isBeingEdited"
            auto-grow
            filled
            color="deep-purple"
            rows="1"
          />
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="isEditable" class="mx-auto">
        <v-btn
          v-if="!isBeingEdited"
          :color="iconColor || $const.ACCENT_COLOR"
          @click.stop="setValuesToEdit"
          class="ml-auto"
          dark
        >
          プロフィールを編集
        </v-btn>
        <v-btn
          v-if="isBeingEdited"
          :color="iconColor || $const.ACCENT_COLOR"
          @click.stop="isBeingEdited = false"
          class="ml-auto mr-3"
          dark
        >
          編集を取り消し
        </v-btn>

        <v-btn
          v-if="isBeingEdited"
          :color="iconColor || $const.ACCENT_COLOR"
          @click.stop="save"
          dark
        >
          編集を保存
        </v-btn>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  components: {
    // ActionButton: () => import('@/components/atoms/ActionButton'),
    UserIcon: () => import('@/components/atoms/UserIcon')
  },
  props: {
    image: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    profile: {
      type: String,
      default: null
    },
    isEditable: {
      type: Boolean,
      default: false
    },
    iconColor: {
      type: String,
      default: null
    }
  },
  data: () => {
    return {
      isBeingEdited: false,
      profileEdited: null,
      nameEdited: null,
      imageEdited: null
    }
  },
  methods: {
    setValuesToEdit() {
      this.isBeingEdited = true
      this.imageEdited = this.image
      this.nameEdited = this.name
      this.profileEdited = this.profile
    },
    handleImageAdded(file) {
      if (file) {
        this.file = file
        this.createImage(file)
      }
    },
    createImage(file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.imageEdited = e.target.result
      }
      reader.readAsDataURL(file)
    },
    save() {
      this.isBeingEdited = false
      const value = {
        name: this.nameEdited,
        profile: this.profileEdited
      }
      this.$emit('save', value, this.file)
    }
  }
}
</script>
