<template>
  <v-card
    :color="$const.BASE_COLOR"
    :max-width="videoWidth"
    :max-height="videoHeight"
    class="mx-auto elevation-0"
    style="position:relative"
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
    <v-card
      class="rounded-0 elevation-0"
      style="
      display: inline-block;
      background-color: rgba(20, 20, 20, 0.60);
      position:absolute;
      left:0;
      bottom:0;
      "
    >
      <div class="px-2 py-2 d-flex align-center" style="height:20px">
        <v-icon v-if="!isMicOn" small style="color:red"
          >mdi-microphone-off</v-icon
        >
        <div>{{ user ? user.name : '' }}</div>
      </div>
    </v-card>
  </v-card>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: null
    },
    videoWidth: {
      type: Number,
      default: 300
    },
    videoHeight: {
      type: Number,
      default: 240
    },
    user: {
      type: Object,
      default: null
    },
    stream: {
      type: MediaStream,
      default: null
    },
    isMicOn: {
      type: Boolean,
      default: true
    },
    isCamOn: {
      type: Boolean,
      default: true
    },
    muted: {
      type: Boolean,
      default: true
    }
  }
}
</script>
