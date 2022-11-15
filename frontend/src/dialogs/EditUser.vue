<template>
  <v-container>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        class="fill-height"
    >
      <v-dialog
          v-model="dialog"
          max-width="700"
      >
        <v-card>
          <v-card-title>
            <p class="text-dialog">Edycja użytownika</p>
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
                      v-model="currentUser.email"
                      color="teal"
                      label="Email"
                      readonly
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="currentUser.name"
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
                      v-model="currentUser.lastName"
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
                      v-model="currentUser.address"
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
                      :rules="[rules.min]"
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
                      :rules="[rules.min]"
                      @click:append="show = !show"
                  ></v-text-field>
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
                  @click="updateUser"
              >
                Zapisz
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
      Gratulacje! Poprawnie zaktualizowałeś dane.
    </v-snackbar>
    <v-snackbar
        v-model="snackBarError"
        right
        height="100"
        color="error"
        rounded
        elevation="8"
    >
      Błąd! Poprawnie wpisz hasło!
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: "EditUser",
  props: ['dialog', 'currentUser'],
  data() {
    return {
      valid: true,
      dialogValue: this.dialog,
      show: false,
      newPassword: '',
      confirmPassword: '',
      snackbarSuccess: false,
      snackBarError: false,
      rules: {
        min: v => v.length >= 8 || 'Min 8 znaków',
      }
    }
  },
  methods: {
    closeDialog() {
      this.dialogValue = false
      this.newPassword = '';
      this.confirmPassword = '';
      this.$emit('update:dialog', this.dialogValue)
    },
    updateUser() {
      if (this.newPassword === this.confirmPassword) {
        this.currentUser.password = this.newPassword
        this.$store.dispatch("updateUser", this.currentUser)
        this.closeDialog()
        this.snackbarSuccess = true;
      } else {
        this.snackBarError = true;
      }
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
