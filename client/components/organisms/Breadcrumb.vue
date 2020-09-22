<template>
  <div>
    <v-breadcrumbs
      :items="shapedItems"
      large
      class="d-none d-md-flex"
    ></v-breadcrumbs>
    <v-breadcrumbs
      :items="shapedItems.slice(-1)"
      large
      class="d-flex d-md-none"
    ></v-breadcrumbs>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: null
    }
  },
  computed: {
    shapedItems() {
      return this.items.map((i) => {
        return {
          text: i,
          disable: true
        }
      })
    }
  }
}
</script>
