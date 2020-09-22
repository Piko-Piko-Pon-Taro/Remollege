<template>
  <p
    :style="`background-color: ${$const.BASE_COLOR2};`"
    class="black--text pa-3 rounded"
  >
    {{ text }}
  </p>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: null
    }
  }
}
</script>
