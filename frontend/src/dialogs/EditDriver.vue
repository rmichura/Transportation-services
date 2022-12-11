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
          persistent
      >
        <v-card>
          <v-card-title>
            <p class="text-dialog">Edycja <span>kierowcy</span></p>

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
                      v-model="editedDriver.name"
                      color="teal"
                      :rules="[required.req]"
                      label="Imię"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="editedDriver.lastName"
                      color="teal"
                      :rules="[required.req]"
                      label="Nazwisko"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="editedDriver.phoneNumber"
                      color="teal"
                      :rules="[required.phone, required.req]"
                      label="Numer telefonu"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-select
                      v-model="editedDriver.driverLicense"
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
            <v-btn
                class="button-remove"
                color="red"
                elevation="3"
                large
                @click="removeDriver"
            >
              Usuń
            </v-btn>
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
                  @click="editDriver"
              >
                Zapisz
              </v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
    <v-snackbar
        v-model="snackBarError"
        right
        height="100"
        color="error"
        rounded
        elevation="8"
    >
      Błąd! Wypełnij wszystkie pola poprawnie!
    </v-snackbar>
    <v-snackbar
        v-model="snackbarSuccess"
        right
        height="100"
        color="green"
        rounded
        elevation="8"
    >
      Gratulacje! Poprawnie edytowałeś kierowcę!
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: "EditDriver",
  props: ['dialog', 'editedDriver'],
  data() {
    return {
      valid: true,
      snackBarError: false,
      snackbarSuccess: false,
      dialogValue: this.dialog,
      selectCategory: ['B', 'B+E', 'C', 'C+E', 'C1', 'C1+E'],
      required: {
        req: v => !!v || 'Pole jest wymagane',
        phone: v => /^\d{9}$/.test(v) || 'Błędny numer telefonu',
      },
    }
  },
  methods: {
    editDriver() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('updateDriver', [this.editedDriver._id, this.editedDriver])
        this.dialogValue = false
        this.$emit('update:dialog', this.dialogValue)
        this.snackbarSuccess = true
      } else {
        this.snackBarError = true
      }
    },
    closeDialog() {
      this.dialogValue = false
      this.$emit('update:dialog', this.dialogValue)
    },
    removeDriver() {
      this.$store.dispatch('removeDriver', this.editedDriver._id)
      this.closeDialog()
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

.button-remove {
  margin: -1em 1em 1em 1.5em;
  color: white;
}
</style>
