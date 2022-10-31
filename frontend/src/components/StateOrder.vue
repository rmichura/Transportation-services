<template>
  <v-container v-if="getOrders">
    <v-row class="justify-center">
      <p class="number-order">Zamówienie nr: <span>{{ numberOrder }}</span></p>
    </v-row>

    <div v-if="getFirstOrder"></div>

    <v-stepper value="1">
      <v-stepper-header>
        <v-stepper-step
            step="1"
            complete
            color="green"
        >
          Nie masz jeszcze zamówień
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
            step="2"
            color="green"
            :complete="step > 1"
        >
          Zamówienie utworzone
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
            step="3"
            color="green"
            :complete="step > 2"
        >
          Zamówienie realizowane
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
            step="4"
            color="green"
            :complete="step > 3"
        >
          Zamówienie dostarczone
        </v-stepper-step>
      </v-stepper-header>
    </v-stepper>

    <v-data-table
        :headers="action ? headersAction : headers"
        :items="orders"
        hide-default-footer
        disable-sort
        item-key="name"
        class="data-table elevation-1"
        v-if="setOrderInTable"
    >
      <template v-slot:body="{ items }">
        <tbody>
        <tr :class="index === selectedRow ? 'custom-highlight-row' : ''" @click="checkStatus(index)"
            v-for="(order, index) in orders" :key="order.name">
          <td>{{ order.productType }}</td>
          <td>{{ order.receptionVenue }}</td>
          <td>{{ order.destination }}</td>
          <td>{{ order.deadline }}</td>
          <td v-if="order.status === 'created'" v-bind:show="action = true">
            <v-btn
                icon
                @click="openDialog(index)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
                icon
                @click="removeOrder(index)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
          <td v-else-if="action"></td>
        </tr>
        </tbody>
      </template>
    </v-data-table>

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
          <v-card-title class="text-dialog">
            <span class="text-h5">{{ this.editedOrder.numberOrder }}</span>
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
                  @click="dialog = false"
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
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "StateOrder",
  data() {
    return {
      step: 1,
      orders: [],
      action: false,
      selectedRow: null,
      dialog: false,
      editedOrder: '',
      menu: false,
      valid: true,
      snackBarError: false,
      snackbarSuccess: false,
      numberOrder: '',
      headers: [
        {text: 'Rodzaj towaru', value: 'productType'},
        {text: 'Miejsce odbioru', value: 'receptionVenue'},
        {text: 'Miejsce docelowe', value: 'destination'},
        {text: 'Termin dostarczenia', value: 'deadline'},
      ],
      headersAction: [
        {text: 'Rodzaj towaru', value: 'productType'},
        {text: 'Miejsce odbioru', value: 'receptionVenue'},
        {text: 'Miejsce docelowe', value: 'destination'},
        {text: 'Termin dostarczenia', value: 'deadline'},
        {text: 'Edytuj/Usuń'}
      ],
      required: [
        v => !!v || 'Pole jest wymagane',
      ],
    }
  },
  computed: {
    getOrders() {
      return this.$store.dispatch('getOrders')
    },
    setOrderInTable() {
      let allOrder = this.$store.getters.orderOfCustomer
      this.orders = []
      allOrder.forEach(data => {
        if (data.status !== 'finished' && data.deadline) {
          data.deadline = data.deadline.toString().split('T')[0]
          this.orders.push(data)
        }
      })
      return this.orders
    },
    getFirstOrder() {
      if (this.orders.length > 0) {
        return this.checkStatus(0)
      }
    }
  },
  methods: {
    checkStatus(index) {
      if (this.orders[index].status === 'created') {
        this.step = 2
        this.selectedRow = index;
        this.numberOrder = this.orders[index].numberOrder
      } else {
        this.step = 3
        this.selectedRow = index;
        this.numberOrder = this.orders[index].numberOrder
      }
    },
    openDialog(index) {
      this.editedOrder = this.orders[index]
      this.dialog = true
    },
    removeOrder(index) {
      this.$store.dispatch('removeOrder', index)
    },
    editOrder() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('updateOrder', [this.editedOrder._id, this.editedOrder])
        this.dialog = false
        this.snackbarSuccess = true
      } else {
        this.snackBarError = true
      }
    }
  }
}
</script>

<style scoped>
.number-order {
  font-size: 1.7em;
  font-family: Arial, serif;
  margin-top: 8vh;
  margin-bottom: 8vh;
}

.number-order span {
  color: teal;
}

.data-table {
  font-size: 2em;
  margin-top: 10vh;
}

.custom-highlight-row {
  background-color: #eeeeee;
}

.v-data-table::v-deep th {
  font-size: 0.5em !important;
}

.text-dialog {
  margin-left: 25vw
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
