<template>
  <v-container v-if="getDrivers">
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
                  <v-text-field
                      v-model="currentCar.maxLength"
                      color="teal"
                      :rules="required"
                      type="number"
                      label="Dopuszczalna długość - cm"
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

          <div v-if="refreshDriver"></div>
          <div v-if="getCurrentDriver"></div>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-select
                      dense
                      color="teal"
                      :items="itemDrivers"
                      item-color="teal"
                      class="margin-select"
                      label="Wybierz kierowcę"
                      @change="selectedDriver($event)"
                      v-model="select"
                  ></v-select>
                </v-col>
                <template v-if="driver.assignedToCar === 'true' || select !== null">
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        color="teal"
                        label="Imię"
                        v-model="driver.name"
                        readonly
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        color="teal"
                        label="Nazwisko"
                        v-model="driver.lastName"
                        readonly
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        color="teal"
                        label="Numer telefonu"
                        v-model="driver.phoneNumber"
                        readonly
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="driver.driverLicense"
                        color="teal"
                        label="Kategoria"
                        readonly
                    ></v-text-field>
                  </v-col>
                </template>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-btn
                class="button-remove"
                color="red"
                elevation="3"
                large
                @click="removeCar"
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
  props: ['dialogCar', 'currentCar', 'currentDriver'],
  data() {
    return {
      valid: true,
      menu: false,
      snackBarError: false,
      snackbarSuccess: false,
      dialogValue: this.dialogCar,
      items: ['wolny', 'zajęty'],
      newImg: null,
      driver: [],
      drivers: [],
      select: null,
      itemDrivers: [],
      required: [
        v => !!v || 'Pole jest wymagane',
      ]
    }
  },
  computed: {
    getDrivers() {
      return this.$store.dispatch('getDrivers')
    },
    refreshDriver() {
      this.drivers = this.$store.getters.drivers
      this.itemDrivers = [];
      this.drivers.forEach(data => {
        if (data.assignedToCar === 'false') {
          this.itemDrivers.push([data.name + " " + data.lastName])
        }
      })
      return this.itemDrivers
    },
    getCurrentDriver() {
      this.driver = this.currentDriver
    }
  },
  methods: {
    closeDialog() {
      this.dialogValue = false
      this.$emit('update:dialogCar', this.dialogValue)
      this.$refs.form.resetValidation()
      this.select = null;
    },
    editCar() {
      if (this.$refs.form.validate()) {
        const formData = new FormData();
        if (this.newImg !== null) {
          formData.append('img', this.newImg, this.newImg.name)
        }
        formData.append('type', this.currentCar.type)
        formData.append('numberCar', this.currentCar.numberCar)
        formData.append('capacity', this.currentCar.capacity)
        formData.append('maxWidth', this.currentCar.maxWidth)
        formData.append('maxHeight', this.currentCar.maxHeight)
        formData.append('maxLength', this.currentCar.maxLength)
        formData.append('status', this.currentCar.status)
        if (this.driver.driver) {
          formData.append('driver', this.driver.driver)
        }
        this.$store.dispatch('updateCar', [this.currentCar._id, formData])
            .then(() => {
              this.$store.dispatch('getCars')
            })
        this.$store.dispatch('updateDriver', [this.driver._id, {assignedToCar: 'true'}])
        this.newImg = null;
        this.closeDialog()
        this.snackbarSuccess = true;
      } else {
        this.snackBarError = true;
      }
    },
    removeCar() {
      this.$store.dispatch('removeCar', this.currentCar._id)
      this.$store.dispatch('updateDriver', [this.driver._id, {assignedToCar: 'false'}])
      this.closeDialog()
    },
    selectedDriver(value) {
      this.driver = [];
      this.drivers.forEach(data => {
        if (value[0].split(" ")[0] === data.name && value[0].split(" ")[1] === data.lastName) {
          this.driver.push(data)
          this.driver = this.driver[0]
          this.driver.driver = data._id
        }
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

.button-remove {
  margin: -1em 1em 1em 1.5em;
  color: white;
}

.margin-select {
  margin-top: 1.4em
}
</style>
