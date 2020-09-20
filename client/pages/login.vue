<template>
  <v-container>
    <v-card
      :dark="false"
      class="elevation-12"
      width="60%"
      height="50%"
      style="margin: 10% auto;"
    >
      <v-toolbar :color="$const.MAIN_COLOR" dark flat>
        <v-icon style="margin: auto;" x-large>
          mdi-school
        </v-icon>
      </v-toolbar>
      <v-toolbar :color="$const.MAIN_COLOR" dark flat>
        <v-toolbar-title :style="'margin: auto;'" class="display-1">
          Remollege
        </v-toolbar-title>
      </v-toolbar>
      <v-form ref="userInputs" style="width: 90%;margin:auto;" class="py-5">
        <v-btn
          @click.stop="waseda()"
          :color="$const.MAIN_COLOR"
          width="70%"
          style="margin: 10px 15%;"
          class="title py-5"
          dark
        >
          WASEDAメールでサインイン
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  methods: {
    waseda() {
      this.$auth.loginWith('waseda') // FIXME: 早稲田生のみにするときに下のに戻す
      // this.$auth.loginWith('waseda', { params: { hd: 'waseda.jp' } })
    }
  }
}
</script>
