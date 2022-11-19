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
            <p class="text-dialog">Zamówienie: <span>{{ this.editedOrder.numberOrder }}</span></p>

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
                      v-model="editedOrder.productType"
                      color="teal"
                      :rules="required"
                      label="Rodzaj towaru"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="editedOrder.productWeight"
                      color="teal"
                      :rules="required"
                      type="number"
                      label="Waga towaru - kg"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="editedOrder.receptionVenue"
                      color="teal"
                      :rules="required"
                      label="Miejsce odbioru"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="editedOrder.destination"
                      color="teal"
                      :rules="required"
                      label="Miejsce docelowe"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="editedOrder.productWidth"
                      color="teal"
                      :rules="required"
                      type="number"
                      label="Szerokość towaru - cm"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="editedOrder.productHeight"
                      color="teal"
                      :rules="required"
                      type="number"
                      label="Wysokość towaru - cm"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="6"
                >
                  <v-menu
                      v-model="menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                          v-model="editedOrder.deadline"
                          label="Wstępny termin dostarczenia"
                          prepend-icon="mdi-calendar"
                          readonly
                          :rules="required"
                          color="teal"
                          v-bind="attrs"
                          v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="editedOrder.deadline"
                        @input="menu = false"
                        color="teal"
                    ></v-date-picker>
                  </v-menu>
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
                  @click="editOrder"
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
      Gratulacje! Poprawnie edytowałeś zamówienie!
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: "EditOrder",
  props: ['dialog', 'editedOrder'],
  data() {
    return {
      valid: true,
      menu: false,
      snackBarError: false,
      snackbarSuccess: false,
      dialogValue: this.dialog,
      required: [
        v => !!v || 'Pole jest wymagane',
      ]
    }
  },
  methods: {
    editOrder() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('updateOrder', [this.editedOrder._id, this.editedOrder])
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
