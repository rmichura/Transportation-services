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

    <history-order :dialog.sync="dialog" :current-order="currentOrder"/>

  </v-container>
</template>

<script>
import HistoryOrder from "@/dialogs/HistoryOrder";

export default {
  name: "TheHistory",
  components: {HistoryOrder},
  data() {
    return {
      step: 1,
      orders: [],
      selectedRow: null,
      currentOrder: [],
      dialog: false,
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

</style>
