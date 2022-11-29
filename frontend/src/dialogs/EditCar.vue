<template>
  <v-container>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        class="fill-height"
    >
      <v-dialog
          v-model="dialogCar"
          max-width="700"
          persistent
      >
        <v-card>
          <v-card-title>
            <p class="text-dialog">Edycja samochodu<span></span></p>

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
                      v-model="currentCar.brand"
                      color="teal"
                      :rules="required"
                      label="Marka"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="currentCar.type"
                      color="teal"
                      :rules="required"
                      label="Typ"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="currentCar.capacity"
                      color="teal"
                      :rules="required"
                      type="number"
                      label="Ładowność - kg"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="currentCar.maxWidth"
                      color="teal"
                      :rules="required"
                      type="number"
                      label="Dopuszczlna szerokość - cm"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="currentCar.maxHeight"
                      color="teal"
                      :rules="required"
                      type="number"
                      label="Dopuszczalna wysokość - cm"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-select
                      dense
                      class="margin-select"
                      v-model="currentCar.status"
                      color="teal"
                      :rules="required"
                      label="Status"
                      :items="items"
                      item-color="teal"
                  ></v-select>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="currentCar.numberCar"
                      color="teal"
                      :rules="required"
                      label="Rejstracja samochodu"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-file-input
                      v-model="newImg"
                      truncate-length="15"
                      label="Zdjęcie"
                      color="teal"
                  ></v-file-input>
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
                  @click="editCar"
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
      Gratulacje! Poprawnie edytowałeś samochód!
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: "EditCar",
  props: ['dialogCar', 'currentCar'],
  data() {
    return {
      valid: true,
      menu: false,
      snackBarError: false,
      snackbarSuccess: false,
      dialogValue: this.dialogCar,
      items: ['wolny', 'zajęty'],
      newImg: null,
      required: [
        v => !!v || 'Pole jest wymagane',
      ]
    }
  },
  methods: {
    closeDialog() {
      this.dialogValue = false
      this.$emit('update:dialogCar', this.dialogValue)
      this.$refs.form.resetValidation()
    },
    editCar() {
      if (this.$refs.form.validate()) {
        const formData = new FormData();
        if (this.newImg !== null) {
          formData.append('img', this.newImg, this.newImg.name)
        }
        formData.append('brand', this.currentCar.brand)
        formData.append('type', this.currentCar.type)
        formData.append('numberCar', this.currentCar.numberCar)
        formData.append('capacity', this.currentCar.capacity)
        formData.append('maxWidth', this.currentCar.maxWidth)
        formData.append('maxHeight', this.currentCar.maxHeight)
        formData.append('status', this.currentCar.status)
        this.$store.dispatch('updateCar', [this.currentCar._id, formData])
            .then(() => {
              this.$store.dispatch('getCars')
            })
        this.newImg = null;
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

.margin-select {
  margin-top: 1.4em
}
</style>
