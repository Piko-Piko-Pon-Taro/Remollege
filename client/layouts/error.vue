<template>
  <v-card outlined max-width="500" class="mx-auto mt-10 text-center">
    <v-img
      src="https://storage.googleapis.com/remollege-storage/static/waseda.jpg"
    ></v-img>
    <v-card-text class="text-center pa-10">
      <h1 class="mb-5">
        {{ error.statusCode === 404 ? pageNotFound : otherError }}
      </h1>
      <NuxtLink to="/">
        トップページへ戻る
      </NuxtLink>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  data() {
    return {
      pageNotFound: 'ごめんなさいページがありません🥺',
      otherError: 'ごめんなさいエラーが起きてしまいました🥺'
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
