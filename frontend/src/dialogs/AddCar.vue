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
          persistent
          max-width="700"
      >
        <v-card>
          <v-card-title>
            <p class="text-dialog">Dodawanie samochodu</p>

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
                      v-model="car.type"
                      color="teal"
                      label="Typ"
                      :rules="required"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="car.numberCar"
                      color="teal"
                      label="Tablica rejestracyjna"
                      :rules="required"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="car.capacity"
                      color="teal"
                      label="Ładowność - kg"
                      type="number"
                      :rules="required"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="car.maxWidth"
                      color="teal"
                      label="Dopuszczalna szerokość - cm"
                      type="number"
                      :rules="required"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="car.maxHeight"
                      color="teal"
                      label="Dopuszczalna wysokość - cm"
                      type="number"
                      :rules="required"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="car.maxLength"
                      color="teal"
                      label="Dopuszczalna długość - cm"
                      type="number"
                      :rules="required"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-file-input
                      v-model="car.img"
                      truncate-length="15"
                      label="Zdjęcie"
                      :rules="required"
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
                  @click="addNewCar"
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
      Gratulacje! Poprawnie dodałeś samochód.
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
  name: "AddCar",
  props: ['dialog'],
  data() {
    return {
      valid: true,
      dialogValue: this.dialog,
      snackbarSuccess: false,
      snackBarError: false,
      car: {},
      required: [
        v => !!v || 'Pole jest wymagane',
      ],
    }
  },
  methods: {
    closeDialog() {
      this.dialogValue = false
      this.$emit('update:dialog', this.dialogValue)
      this.$refs.form.resetValidation()
      this.car = {};
    },
    addNewCar() {
      const formData = new FormData();
      formData.append('img', this.car.img, this.car.img.name)
      formData.append('type', this.car.type)
      formData.append('numberCar', this.car.numberCar)
      formData.append('capacity', this.car.capacity)
      formData.append('maxWidth', this.car.maxWidth)
      formData.append('maxHeight', this.car.maxHeight)
      formData.append('maxLength', this.car.maxLength)
      formData.append('status', 'wolny')

      if (this.$refs.form.validate()) {
        this.$store.dispatch('saveCar', formData).then(() => {
          this.$store.dispatch('getCars')
        })
        this.closeDialog()
        this.snackbarSuccess = true
      } else {
        this.snackBarError = true
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
