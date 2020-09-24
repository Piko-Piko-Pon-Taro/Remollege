<template>
<v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
  <v-list-item-avatar :size="Number(size)" v-bind="name ? attrs : null"
          v-on="name ? on : null">
    <v-img v-if="src" :src="src" >
      <slot></slot>
    </v-img>
    <v-icon v-else-if="icon" :size="Number(size)">
      {{ icon }}
    </v-icon>
    <v-icon v-else :size="Number(size)">
      mdi-account-circle
    </v-icon>
  </v-list-item-avatar>
  </template>
      <span v-if="name">{{name}}</span>
    </v-tooltip>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    size: {
      type: [Number, String],
      default: 40
    },
    name: {
      type: String,
      default: null
    }
  }
}
</script>
