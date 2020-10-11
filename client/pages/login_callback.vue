<template>
  <div class="mt-16 text-center">
    ログインしています
    <v-progress-circular
      :color="$const.MAIN_COLOR"
      indeterminate
      size="30"
      class="ml-5"
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  auth: 'guest'
}
</script>
