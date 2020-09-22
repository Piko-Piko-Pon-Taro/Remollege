<template>
  <v-container>
    <v-card
      :dark="false"
      class="elevation-12"
      width="45%"
      min-width="300px"
      height="50%"
      style="margin: 10% auto;"
    >
      <v-toolbar :color="$const.MAIN_COLOR" dark flat>
        <v-icon style="margin: auto;" x-large>
          mdi-school
        </v-icon>
      </v-toolbar>
      <v-toolbar :color="$const.MAIN_COLOR" dark flat>
        <v-toolbar-title style="margin: 0 auto 20px;" class="display-1">
          Remollege
        </v-toolbar-title>
      </v-toolbar>
      <v-form ref="userInputs" style="width: 90%; margin: auto;" class="py-5">
        <v-btn
          @click.stop="waseda()"
          :color="$const.MAIN_COLOR"
          width="94%"
          class="title py-5"
          style="margin: 0 3%"
          dark
        >
          <!-- WASEDAメールでサインイン FIXME: 早稲田生のみにするときにコメントアウトはずす -->
          <v-icon class="mr-2">
            mdi-google
          </v-icon>
          Googleでサインイン
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
