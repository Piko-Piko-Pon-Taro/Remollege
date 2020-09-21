<template>
  <ActionButton :to="to" :xlarge="true" text="EXIT" icon="mdi-door" />
</template>

<script>
export default {
  components: {
    ActionButton: () => import('@/components/atoms/ActionButton')
  },
  props: {
    to: {
      type: String,
      default: null
    }
  }
}
</script>
