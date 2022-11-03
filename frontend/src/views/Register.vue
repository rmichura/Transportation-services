<template>
  <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      class="fill-height"
  >
    <v-container class="fill-height">
      <v-row class="justify-center">
        <v-sheet
            elevation="8"
            height="400"
            width="600"
        >
          <v-col class="emailMargin">
            <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                color="teal"
                required
            ></v-text-field>
            <v-text-field
                v-model="password"
                color="teal"
                :type="show ? 'text' : 'password'"
                :rules="[rules.required, rules.min]"
                name="input-10-1"
                label="Hasło"
            ></v-text-field>
            <v-text-field
                v-model="confirmPassword"
                color="teal"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                :rules="[rules.required, rules.min]"
                name="input-10-1"
                label="Powtórz hasło"
                @click:append="show = !show"
                @keyup.enter="creatUser"
            ></v-text-field>
            <v-row class="justify-center ma-10">
              <v-btn
                  class="white--text"
                  color="teal"
                  elevation="7"
                  large
                  @click="creatUser"
                  :disabled="!valid"
              >Zarejestruj się
              </v-btn>
            </v-row>
          </v-col>
        </v-sheet>
      </v-row>
      <v-snackbar
          v-model="snackBarError"
          right
          height="100"
          color="error"
          rounded
          elevation="8"
      >
        Błąd! Poprawnie wpisz e-mail lub hasło!
      </v-snackbar>
    </v-container>
  </v-form>
</template>

<script>
import router from "@/router"

export default {
  name: 'Register',

  data() {
    return {
      show: false,
      email: '',
      password: '',
      confirmPassword: '',
      snackBarError: false,
      valid: true,
      emailRules: [
        v => !!v || 'E-mail jest wymagany',
        v => /.+@.+\..+/.test(v) || 'E-mail musi być poprawny',
      ],
      rules: {
        required: value => !!value || 'Wymagany.',
        min: v => v.length >= 8 || 'Min 8 znaków'
      }
    }
  },
  methods: {
    async creatUser() {
      if (this.email !== '' && this.password === this.confirmPassword) {
        this.$refs.form.validate()
        await this.$store.dispatch('register', {
          email: this.email,
          password: this.password
        })
        this.goToLogin()
      } else {
        this.snackBarError = true;
      }
    },
    goToLogin() {
      router.push('/login')
    }
  },
}
</script>

<style scoped>

</style>
