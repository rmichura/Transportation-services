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
          persistent
          max-width="700"
      >
        <v-card>
          <v-card-title>
            <p class="text-dialog">Dodawanie kierowcy</p>

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
                      v-model="driver.name"
                      color="teal"
                      label="Imię"
                      :rules="[required.req]"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="driver.lastName"
                      color="teal"
                      label="Nazwisko"
                      :rules="[required.req]"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="driver.phoneNumber"
                      color="teal"
                      label="Numer telefonu"
                      :rules="[required.phone, required.req]"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-select
                      v-model="driver.driverLicense"
                      color="teal"
                      label="Kategoria"
                      :rules="[required.req]"
                      dense
                      class="navigation"
                      :items="selectCategory"
                      item-color="teal"
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
                  @click="addNewDriver"
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
      Gratulacje! Poprawnie dodałeś kierowcę.
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
  </v-container>
</template>

<script>
export default {
  name: "AddDriver",
  props: ['dialogAdd'],
  data() {
    return {
      valid: true,
      dialogValue: this.dialogAdd,
      snackbarSuccess: false,
      snackBarError: false,
      driver: {},
      selectCategory: ['B', 'B+E', 'C', 'C+E', 'C1', 'C1+E'],
      required: {
        req: v => !!v || 'Pole jest wymagane',
        phone: v => /^\d{9}$/.test(v) || 'Błędny numer telefonu',
      },
    }
  },
  methods: {
    closeDialog() {
      this.dialogValue = false
      this.$emit('update:dialogAdd', this.dialogValue)
      this.$refs.form.resetValidation()
      this.driver = {};
    },
    addNewDriver() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('saveDriver', this.driver).then(() => {
          this.$store.dispatch('getDrivers')
        })
        this.closeDialog()
        this.snackbarSuccess = true
      } else {
        this.snackBarError = true
      }
    },
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
