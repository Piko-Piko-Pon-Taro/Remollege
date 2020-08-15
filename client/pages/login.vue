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
        <v-toolbar-title
          v-if="types.active == 'login'"
          :style="'margin: auto;'"
          class="display-1"
        >
          Remollegeへサインイン
        </v-toolbar-title>
        <v-toolbar-title
          v-else-if="types.active == 'signup'"
          :style="'margin: auto;font-size: 16px;'"
          class="display-1"
        >
          Remollegeへサインアップ
        </v-toolbar-title>
      </v-toolbar>
      <v-form ref="userInputs" style="width: 90%;margin:auto;" class="py-5">
        <v-text-field
          v-if="types.active == 'signup'"
          v-model="user.name"
          :rules="[rules.required, rules.nameMax]"
          :maxlength="$const.VALIDATE.nameMax"
          label="Name"
          name="name"
          prepend-inner-icon="mdi-account-box"
          type="text"
          counter
          validate-on-blur
          outlined
        />
        <v-text-field
          v-model="user.email"
          :rules="[rules.required, rules.emailMax, rules.isValidEmail]"
          :maxlength="$const.VALIDATE.emailMax"
          label="Email"
          name="email"
          prepend-inner-icon="mdi-email"
          type="text"
          counter
          validate-on-blur
          outlined
        />
        <v-text-field
          id="password"
          v-model="user.password"
          :rules="[rules.required, rules.passwordMin, rules.passwordMax]"
          :maxlength="$const.VALIDATE.passwordMax"
          :append-icon="passwordDisplay ? 'mdi-eye' : 'mdi-eye-off'"
          :type="passwordDisplay ? 'text' : 'password'"
          @click:append="passwordDisplay = !passwordDisplay"
          label="Password"
          name="password"
          prepend-inner-icon="mdi-lock"
          counter
          validate-on-blur
          outlined
        />
        <v-btn
          v-if="types.active == 'login'"
          @click.stop="login()"
          :color="$const.ACCENT_COLOR"
          rounded
          width="70%"
          style="margin: 10px 15%;"
          class="title py-5"
          dark
        >
          Login
        </v-btn>
        <v-btn
          v-else-if="types.active == 'signup'"
          @click.stop="signup()"
          :color="$const.ACCENT_COLOR"
          rounded
          width="70%"
          style="margin: 10px 15%;"
          class="title py-5"
          dark
        >
          Signup
        </v-btn>
        <v-divider class="my-3" />
        <div v-if="types.active == 'login'" style="text-align: center;">
          <p>パスワードをお忘れですか？</p>
        </div>
        <div v-if="types.active == 'login'" style="text-align: center;">
          <p>
            アカウントをお持ちではないですか？
            <v-btn
              @click.stop="toggleType()"
              :color="$const.ACCENT_COLOR"
              class="white--text"
            >
              今すぐ作成
            </v-btn>
          </p>
        </div>
        <div v-if="types.active == 'signup'" style="text-align: center;">
          <p>
            既にアカウントをお持ちですか？
            <v-btn
              @click.stop="toggleType()"
              :color="$const.ACCENT_COLOR"
              class="white--text"
            >
              サインイン
            </v-btn>
          </p>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      passwordDisplay: false,
      types: {
        active: 'login',
        inactive: 'signup'
      },
      user: {
        name: '',
        email: '',
        password: ''
      },
      rules: {
        required: (value) => this.$validate.required(value),
        nameMax: (value) =>
          this.$validate.maxLength(value, this.$const.VALIDATE.nameMax),
        emailMax: (value) =>
          this.$validate.maxLength(value, this.$const.VALIDATE.emailMax),
        passwordMin: (value) =>
          this.$validate.minLength(value, this.$const.VALIDATE.passwordMin),
        passwordMax: (value) =>
          this.$validate.maxLength(value, this.$const.VALIDATE.passwordMax),
        isValidEmail: (value) => this.$validate.isValidEmail(value)
      }
    }
  },
  methods: {
    login() {
      if (!this.$refs.userInputs.validate()) {
        this.success = false
      }
    },
    signup() {
      if (!this.$refs.userInputs.validate()) {
        this.success = false
      }
    },
    toggleType() {
      const tmp = this.types.active
      this.types.active = this.types.inactive
      this.types.inactive = tmp
    }
  }
}
</script>
