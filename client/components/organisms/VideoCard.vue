<template>
  <v-card
    :color="$const.BASE_COLOR"
    class="mx-auto elevation-0"
    max-width="300"
    max-height="240"
    dark
  >
    <video
      :id="id"
      :key="id"
      :width="videoWidth"
      :height="videoHeight"
      :srcObject.prop="stream"
      :muted="muted"
      autoplay
    />
    <!-- <v-card-title>{{ name }}</v-card-title> -->
  </v-card>
</template>

<script>
export default {
  props: {
    id: {
      type: String
    },
    videoWidth: {
      type: Number,
      default: 300
    },
    videoHeight: {
      type: Number,
      default: 240
    },
    name: {
      type: String,
      default: null
    },
    stream: {
      type: MediaStream,
      default: null
    },
    muted: {
      type: Boolean,
      default: true
    }
  }
}
</script>
