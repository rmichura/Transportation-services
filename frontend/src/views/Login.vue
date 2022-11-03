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
                required
                color="teal"
            ></v-text-field>
            <v-text-field
                v-model="password"
                color="teal"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                :rules="[rules.required, rules.min]"
                name="input-10-1"
                label="Hasło"
                @click:append="show = !show"
                @keyup.enter="loginUser"
            ></v-text-field>
            <v-row class="justify-center">
              <span class="without-account">
                Jeśli nie masz konta, zarejestruj się
              <router-link to="/register">click me</router-link>
                </span>
            </v-row>
            <v-row class="justify-center ma-16">
              <v-btn
                  class="white--text"
                  color="teal"
                  elevation="7"
                  large
                  @click="loginUser"
                  :disabled="!valid"
              >Zaloguj się
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
        Błąd! Nie istnieje takie konto!
      </v-snackbar>
      <v-snackbar
          v-model="snackBarErrorData"
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
import router from "@/router";

export default {
  name: 'Login',

  data() {
    return {
      show: false,
      email: '',
      password: '',
      valid: true,
      snackBarError: false,
      snackBarErrorData: false,
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
    async loginUser() {
      if (this.email !== '') {
        this.$refs.form.validate()
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        })
        if (localStorage.getItem('token')) {
          this.goTo()
        } else {
          this.snackBarError = true;
        }
      } else {
        this.snackBarErrorData = true;
      }
    },
    goTo() {
      if (this.$store.getters.yourRole === "employee") {
        router.push('/employee')
      } else if (this.$store.getters.yourRole === "admin") {
        router.push('/admin');
      } else {
        router.push('/customer')
      }
    }
  },
}
</script>

<style>

.emailMargin {
  margin-top: 2em;
}

.without-account {
  text-align: center;
  margin-left: 0.5em;
  margin-right: 0.5em;
  margin-top: 1em;
}

</style>
