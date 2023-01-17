<template>
  <v-container v-if="getCars">
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
            <p class="text-dialog">Zamówienie: <span>{{ this.currentOrder.numberOrder }}</span></p>

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
                      v-model="currentOrder.productType"
                      color="teal"
                      :rules="required"
                      readonly
                      label="Rodzaj towaru"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="currentOrder.productWeight"
                      color="teal"
                      :rules="required"
                      type="number"
                      readonly
                      label="Waga towaru - kg"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="currentOrder.productWidth"
                      color="teal"
                      :rules="required"
                      type="number"
                      readonly
                      label="Szerokość towaru - cm"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="currentOrder.productHeight"
                      color="teal"
                      :rules="required"
                      type="number"
                      readonly
                      label="Wysokość towaru - cm"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="currentOrder.productLength"
                      color="teal"
                      :rules="required"
                      type="number"
                      readonly
                      label="Długość towaru - cm"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="currentOrder.receptionPlace"
                      color="teal"
                      :rules="required"
                      readonly
                      label="Miejsce odbioru"
                  ></v-text-field>
                </v-col>
                <!--                <v-col-->
                <!--                    cols="12"-->
                <!--                    sm="6"-->
                <!--                    md="4"-->
                <!--                >-->
                <!--                  <v-menu-->
                <!--                      v-model="menuReceipt"-->
                <!--                      :close-on-content-click="false"-->
                <!--                      :nudge-right="40"-->
                <!--                      transition="scale-transition"-->
                <!--                      offset-y-->
                <!--                      min-width="auto"-->
                <!--                  >-->
                <!--                    <template v-slot:activator="{ on, attrs }">-->
                <!--                      <v-text-field-->
                <!--                          v-model="currentOrder.receptionDate"-->
                <!--                          label="Termin odbioru"-->
                <!--                          prepend-icon="mdi-calendar"-->
                <!--                          readonly-->
                <!--                          color="teal"-->
                <!--                      ></v-text-field>-->
                <!--                    </template>-->
                <!--                  </v-menu>-->
                <!--                  <v-menu-->
                <!--                      v-model="menuTime"-->
                <!--                      :close-on-content-click="false"-->
                <!--                      :nudge-right="40"-->
                <!--                      transition="scale-transition"-->
                <!--                      offset-y-->
                <!--                      max-width="290px"-->
                <!--                      min-width="290px"-->
                <!--                  >-->
                <!--                    <template v-slot:activator="{ on, attrs }">-->
                <!--                      <v-text-field-->
                <!--                          v-model="timeStartOrder"-->
                <!--                          label="Godzina rozpoczęcia zlecenia"-->
                <!--                          prepend-icon="mdi-clock-time-four-outline"-->
                <!--                          readonly-->
                <!--                          v-bind="attrs"-->
                <!--                          v-on="on"-->
                <!--                      ></v-text-field>-->
                <!--                    </template>-->
                <!--                    <v-time-picker-->
                <!--                        v-if="menuTime"-->
                <!--                        v-model="timeStartOrder"-->
                <!--                        full-width-->
                <!--                        format="24hr"-->
                <!--                    ></v-time-picker>-->
                <!--                  </v-menu>-->
                <!--                </v-col>-->
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="currentOrder.deliveryPlace"
                      color="teal"
                      :rules="required"
                      readonly
                      label="Miejsce docelowe"
                  ></v-text-field>
                </v-col>
                <!--                <v-col-->
                <!--                    cols="12"-->
                <!--                    sm="6"-->
                <!--                    md="4"-->
                <!--                >-->
                <!--                  <v-menu-->
                <!--                      v-model="menuDelivery"-->
                <!--                      :close-on-content-click="false"-->
                <!--                      :nudge-right="40"-->
                <!--                      transition="scale-transition"-->
                <!--                      offset-y-->
                <!--                      min-width="auto"-->
                <!--                  >-->
                <!--                    <template v-slot:activator="{ on, attrs }">-->
                <!--                      <v-text-field-->
                <!--                          v-model="currentOrder.deliveryDate"-->
                <!--                          label="Termin dostarczenia"-->
                <!--                          prepend-icon="mdi-calendar"-->
                <!--                          readonly-->
                <!--                          color="teal"-->
                <!--                      ></v-text-field>-->
                <!--                    </template>-->
                <!--                  </v-menu>-->
                <!--                </v-col>-->
              </v-row>
            </v-container>
          </v-card-text>

          <div v-if="refreshCars"></div>

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
                      :rules="required"
                      :items="items"
                      item-color="teal"
                      class="margin-select"
                      label="Wybierz samochód"
                      @change="selectedCar($event)"
                      v-model="select"
                  ></v-select>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="currentCar.type"
                      color="teal"
                      label="Typ"
                      readonly
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
                      type="number"
                      label="Ładowność - kg"
                      readonly
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
                      type="number"
                      label="Dopuszczlna szerokość - cm"
                      readonly
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
                      type="number"
                      label="Dopuszczalna wysokość - cm"
                      readonly
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
                      readonly
                      type="number"
                      label="Dopuszczalna długość - cm"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-menu
                      v-model="menuTime"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                          v-model="timeStartOrder"
                          label="Godzina rozpoczęcia zlecenia"
                          prepend-icon="mdi-clock-time-four-outline"
                          readonly
                          :rules="required"
                          color="teal"
                          v-bind="attrs"
                          v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                        v-if="menuTime"
                        v-model="timeStartOrder"
                        full-width
                        format="24hr"
                        color="teal"
                    ></v-time-picker>
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
        v-model="snackBarErrorValidation"
        right
        height="100"
        color="error"
        rounded
        elevation="8"
    >
      Błąd! Auto nie zmieści zamówienia!
    </v-snackbar>
    <v-snackbar
        v-model="snackbarSuccess"
        right
        height="100"
        color="green"
        rounded
        elevation="8"
    >
      Gratulacje! Poprawnie przydzieliłeś samochód!
    </v-snackbar>
  </v-container>
</template>

<script>

export default {
  name: "OrderManagement",
  props: ['dialog', 'currentOrder'],
  data() {
    return {
      valid: true,
      menuDelivery: false,
      menuReceipt: false,
      snackBarError: false,
      snackBarErrorValidation: false,
      snackbarSuccess: false,
      dialogValue: this.dialog,
      select: null,
      cars: [],
      currentCar: [],
      items: [],
      menuTime: '',
      timeStartOrder: '',
      required: [
        v => !!v || 'Pole jest wymagane',
      ]
    }
  },
  computed: {
    getCars() {
      return this.$store.dispatch('getCars')
    },
    refreshCars() {
      this.cars = this.$store.getters.cars
      this.items = [];
      this.cars.forEach(data => {
        if (data.status === 'wolny') {
          this.items.push(data.numberCar)
        }
      })
      return this.items
    }
  },
  methods: {
    editOrder() {
      if (this.$refs.form.validate()) {
        if (this.validationsOrderToCar()) {
          const formData = new FormData();
          const orders = this.$store.getters.allOrders
          let sumTime = 0;
          this.currentOrder.car = this.currentCar._id
          this.currentOrder.startTimeOrder = this.timeStartOrder
          this.currentOrder.status = 'in_road'
          this.$store.dispatch('updateOrder', [this.currentOrder._id, this.currentOrder])
          formData.append('status', 'zajęty')
          orders.forEach(data => {
            if (data.car === this.currentCar._id) {
              sumTime += data.durationTransportation
            }
          })
          if (sumTime >= 8) {
            this.$store.dispatch('updateCar', [this.currentCar._id, formData]).then(() => {
              this.$store.dispatch('getCars')
            })
          }
          this.closeDialog()
          this.snackbarSuccess = true
        }
      } else {
        this.snackBarError = true
      }
    },
    closeDialog() {
      this.dialogValue = false
      this.$emit('update:dialog', this.dialogValue)
      this.$refs.form.resetValidation()
      this.currentCar = [];
      this.timeStartOrder = null;
      this.select = null;
    },
    selectedCar(value) {
      this.currentCar = [];
      this.cars.forEach(data => {
        if (data.numberCar === value && data.status === 'wolny') {
          this.currentCar.push(data)
          this.currentCar = this.currentCar[0]
        }
      })
    },
    validationsOrderToCar() {
      if (this.currentCar.capacity >= this.currentOrder.productWeight &&
          this.currentCar.maxWidth >= this.currentOrder.productWidth &&
          this.currentCar.maxHeight >= this.currentOrder.productHeight &&
          this.currentCar.maxLength >= this.currentOrder.productLength) {
        return true
      } else {
        this.snackBarErrorValidation = true
        return false
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

.margin-select {
  margin-top: 1.4em
}

.simulate-button {
  margin: -1em 1em 1em 1.5em;
  color: white;
}
</style>
