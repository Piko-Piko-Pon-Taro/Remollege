<template>
  <v-card max-width="600" class="mx-auto">
    <v-img src="https://cdn.vuetifyjs.com/images/lists/ali.png" height="250px">
      <v-row class="fill-height">
        <UserIcon :src="image" size="200" class="mx-auto" />
      </v-row>
    </v-img>

    <v-list two-line color="$const.BASE_COLOR2">
      <v-list-item>
        <v-list-item-icon>
          <v-icon :color="iconColor || $const.ACCENT_COLOR">mdi-account</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-subtitle>名前</v-list-item-subtitle>
          <v-list-item-title v-if="!isBeingEdited">{{ name }}</v-list-item-title>
          <v-list-item-title v-if="isBeingEdited">
            <v-text-field
              v-model="_name"
              filled
              flat
              dense
          /></v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon :color="iconColor || $const.ACCENT_COLOR">mdi-email</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-subtitle>プロフィール</v-list-item-subtitle>
          <v-list-item-content v-if="!isBeingEdited">{{ text }}</v-list-item-content>
          
      <v-textarea
        v-model="_text"
        auto-grow
        filled
        color="deep-purple"
        rows="1"
        v-if="isBeingEdited"
      />
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="mx-auto" v-if="isEditable">

      <v-btn class="ml-auto" v-if="!isBeingEdited" :color="iconColor || $const.ACCENT_COLOR" dark @click.stop="isBeingEdited = true; _name = name; _text = text;">
        プロフィールを編集
      </v-btn>
      <v-btn class="ml-auto" v-if="isBeingEdited" :color="iconColor || $const.ACCENT_COLOR" dark @click.stop="isBeingEdited = false">
        編集を取り消し
      </v-btn>
      <v-btn v-if="isBeingEdited" :color="iconColor || $const.ACCENT_COLOR" dark @click.stop="upload">
        アイコン画像をアップロード
      </v-btn>
      <v-btn v-if="isBeingEdited" :color="iconColor || $const.ACCENT_COLOR" dark @click.stop="save">
        編集を保存
      </v-btn>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  components: {
    ActionButton: () => import('@/components/atoms/ActionButton'),
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
    text: {
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
      isBeingEdited: false
    }
  },
  methods: {
    save() {
      this.isBeingEdited = false
      this.name = this._name
      this.text = this._text
    },
    upload() {
      this.isBeingEdited = false
      this.name = this._name
      this.text = this._text
    }
  }
}
</script>
