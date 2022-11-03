<template>
  <v-container v-if="getOrders" class="">
    <v-row class="justify-center">
      <p class="number-order">Twoja historia zakończonych <span>zamówień</span></p>
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
        :headers="headers"
        :items="orders"
        hide-default-footer
        disable-sort
        item-key="name"
        class="data-table elevation-1"
        v-if="setOrderInTable"
    >
      <template v-slot:body="{ items }">
        <tbody>
        <tr :class="index === selectedRow ? 'custom-highlight-row' : ''" @click="selectOrder(index)"
            v-for="(order, index) in orders" :key="order.name">
          <td>{{ order.productType }}</td>
          <td>{{ order.receptionVenue }}</td>
          <td>{{ order.destination }}</td>
          <td>{{ order.deadline }}</td>
          <td>
            <v-btn
                icon
                @click="openDialog(index)"
            >
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </td>
        </tr>
        </tbody>
      </template>
    </v-data-table>


    <v-dialog
        v-model="dialog"
        max-width="700"
    >
      <v-card>
        <v-card-title>
          <p class="text-dialog">Zamówienie: <span>{{ this.currentOrder.numberOrder }}</span></p>
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
                    label="Rodzaj towaru"
                    readonly
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
                    type="number"
                    label="Waga towaru - kg"
                    readonly
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    v-model="currentOrder.receptionVenue"
                    color="teal"
                    label="Miejsce odbioru"
                    readonly
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    v-model="currentOrder.destination"
                    color="teal"
                    label="Miejsce docelowe"
                    readonly
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
                    type="number"
                    label="Szerokość towaru - cm"
                    readonly
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
                    type="number"
                    label="Wysokość towaru - cm"
                    readonly
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
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
                        v-model="currentOrder.deadline"
                        label="Termin dostarczenia"
                        prepend-icon="mdi-calendar"
                        readonly
                        color="teal"
                    ></v-text-field>
                  </template>
                </v-menu>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
                  class="priceField"
              >
                <v-text-field
                    dark
                    v-model="currentOrder.orderPrice"
                    color="white"
                    class="white--text"
                    type="number"
                    label="Cena za usługę - zł"
                    readonly
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <div class="buttons-dialog">
            <v-btn
                class="white--text ma-2"
                color="teal"
                elevation="3"
                large
                @click="dialog = false"
            >
              Zamknij
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "TheHistory",
  data() {
    return {
      step: 1,
      orders: [],
      selectedRow: null,
      currentOrder: '',
      dialog: false,
      menu: false,
      headers: [
        {text: 'Rodzaj towaru', value: 'productType'},
        {text: 'Miejsce odbioru', value: 'receptionVenue'},
        {text: 'Miejsce docelowe', value: 'destination'},
        {text: 'Termin dostarczenia', value: 'deadline'},
        {text: 'Więcej'}
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
        if (data.status === 'finished' && data.deadline) {
          data.deadline = data.deadline.toString().split('T')[0]
          this.orders.push(data)
        }
      })
      return this.orders
    },
    getFirstOrder() {
      if (this.orders.length > 0) {
        this.step = 4
        return this.selectOrder(0)
      }
    }
  },
  methods: {
    selectOrder(index) {
      this.selectedRow = index;
    },
    openDialog(index) {
      this.currentOrder = this.orders[index]
      this.dialog = true
    },
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

.priceField {
  background-color: teal;
  border-radius: 8px;
}
</style>
