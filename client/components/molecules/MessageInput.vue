<template>
  <div>
    <v-textarea
      v-model="value"
      filled
      row="1"
      row-height="5"
      clear-icon="mdi-close-circle"
      clearable
      :label="label"
      type="text"
      auto-grow
      @click:clear="clear"
    >
      <template v-slot:append>
        <v-btn
          :disabled="value ? false : true"
          icon
          :color="$const.ACCENT_COLOR"
          @click.stop="send"
        >
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </template>
    </v-textarea>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: null
    }
  },
  data: () => {
    return {
      value: null
    }
  },
  methods: {
    send() {
      this.$emit('send', this.value)
      this.clear()
    },
    clear() {
      this.value = ''
    }
  }
}
</script>
