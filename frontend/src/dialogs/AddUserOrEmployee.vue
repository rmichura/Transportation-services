<template>
  <v-container>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        class="fill-height"
    >
      <v-dialog
          v-model="dialogAdd"
          max-width="700"
          persistent
      >
        <v-card>
          <v-card-title>
            <p class="text-dialog">Tworzenie użytownika</p>

            <v-spacer></v-spacer>

            <v-btn
                icon
                @click="this.closeDialog"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="newUser.email"
                      color="teal"
                      :rules="[rules.required, rules.email]"
                      label="Email"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="newUser.name"
                      color="teal"
                      label="Imię"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="newUser.lastName"
                      color="teal"
                      label="Nazwisko"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="newUser.address"
                      color="teal"
                      label="Adres"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="newPassword"
                      color="teal"
                      :rules="[rules.min, rules.required]"
                      :type="show ? 'text' : 'password'"
                      label="Nowe hasło"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="confirmPassword"
                      color="teal"
                      type="password"
                      label="Potwierdź hasło"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show ? 'text' : 'password'"
                      :rules="[rules.min, rules.required]"
                      @click:append="show = !show"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-select
                      dense
                      label="Rola"
                      color="teal"
                      :items="items"
                      v-model="newUser.role"
                      :rules="[rules.required]"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <div class="buttons-dialog">
              <v-btn
                  text
                  color="teal"
                  @click="closeDialog"
              >
                Anuluj
              </v-btn>
              <v-btn
                  class="white--text ma-2"
                  color="teal"
                  elevation="3"
                  large
                  :disabled="!valid"
                  @click="addNewUser"
              >
                Dodaj
              </v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
    <v-snackbar
        v-model="snackbarSuccess"
        right
        height="100"
        color="success"
        rounded
        elevation="8"
    >
      Gratulacje! Poprawnie utworzyłeś użytkownika.
    </v-snackbar>
    <v-snackbar
        v-model="snackBarError"
        right
        height="100"
        color="error"
        rounded
        elevation="8"
    >
      Błąd! Poprawnie wpisz dane!
    </v-snackbar>
    <v-snackbar
        v-model="snackBarErrorEmail"
        right
        height="100"
        color="error"
        rounded
        elevation="8"
    >
      Błąd! Taki email już istnieje!
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: "AddUserOrEmployee",
  props: ['dialogAdd'],
  data() {
    return {
      valid: true,
      dialogValue: this.dialogAdd,
      show: false,
      newPassword: '',
      confirmPassword: '',
      snackbarSuccess: false,
      snackBarError: false,
      snackBarErrorEmail: false,
      newUser: {},
      currentEmail: null,
      rules: {
        min: v => v.length >= 8 || 'Min 8 znaków',
        required: v => !!v || 'Pole jest wymagane',
        email: v => /.+@.+\..+/.test(v) || 'E-mail musi być poprawny',
      },
      items: ['user', 'employee']
    }
  },
  methods: {
    closeDialog() {
      this.dialogValue = false
      this.newPassword = '';
      this.confirmPassword = '';
      this.newUser = {};
      this.$refs.form.resetValidation()
      this.$emit('update:dialogAdd', this.dialogValue)
    },
    addNewUser() {
      if (this.newUser.email !== undefined && this.newPassword === this.confirmPassword) {
        this.$refs.form.validate()
        this.newUser.password = this.newPassword
        this.checkTheSameEmail()
        if (this.currentEmail === null) {
          this.$store.dispatch('register', this.newUser).then(() => {
            this.$store.dispatch('getUsers')
          })
          this.snackbarSuccess = true;
          this.closeDialog()
        } else {
          this.snackBarErrorEmail = true;
        }
      } else {
        this.snackBarError = true;
      }
    },
    checkTheSameEmail() {
      this.currentEmail = null;
      let checkEmail = this.$store.getters.users
      checkEmail.forEach(data => {
        if (data.email === this.newUser.email) this.currentEmail = data.email
      })
    }
  }
}
</script>

<style scoped>
.text-dialog {
  font-size: 1.1em;
  margin-left: 0.5em;
  font-family: Arial, serif;
}

.text-dialog span {
  color: teal;
}

.buttons-dialog {
  margin-right: 1em;
  margin-bottom: 1em;
  margin-top: -1em;
}
</style>
