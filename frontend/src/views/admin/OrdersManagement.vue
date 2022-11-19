<template>
  <v-container v-if="getOrders">
    <v-row class="justify-center">
      <p class="number-order"><span>W</span>ycena zamówien<span>ia</span></p>
    </v-row>

    <div v-if="setOrderInTable"></div>

    <v-text-field
        v-model="search"
        label="Szukaj zamówienia"
        single-line
        hide-details
        color="teal"
    ></v-text-field>

    <v-data-table
        :headers="headers"
        :items="orders"
        class="data-table elevation-1"
        :page.sync="page"
        :search="search"
        :items-per-page="ordersPerPage"
        disable-sort
        hide-default-footer
    >
      <tbody>
      <tr :class="index === selectedRow ? 'custom-highlight-row' : ''"
          v-for="(order, index) in orders" :key="order.name">
        <td>{{ order.numberOrder }}</td>
        <td>{{ order.productType }}</td>
        <td>{{ order.receptionVenue }}</td>
        <td>{{ order.destination }}</td>
        <td>{{ order.deadline }}</td>
      </tr>
      </tbody>

      <template v-slot:item.actions="{ item }">
        <v-btn
            icon
            @click="openDialog(item)"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-pagination
        v-model="page"
        :length="pageCount"
        class="ma-2"
        color="teal"
    ></v-pagination>

    <order-valuation :current-order="currentOrder" :dialog.sync="dialog"/>

  </v-container>
</template>

<script>
import OrderValuation from "@/dialogs/OrderValuation";
export default {
  name: "OrdersManagement",
  components: {OrderValuation},
  data() {
    return {
      selectedRow: null,
      orders: [],
      page: 1,
      ordersPerPage: 10,
      currentOrder: [],
      search: '',
      dialog: false,
      headers: [
        {text: 'Numer zamówienia', value: 'numberOrder'},
        {text: 'Rodzaj towaru', value: 'productType'},
        {text: 'Miejsce odbioru', value: 'receptionVenue'},
        {text: 'Miejsce docelowe', value: 'destination'},
        {text: 'Termin', value: 'deadline'},
        {text: 'Wyceń', value: 'actions'}
      ],
    }
  },
  computed: {
    getOrders() {
      return this.$store.dispatch('getAllOrders')
    },
    setOrderInTable() {
      let allOrders = this.$store.getters.allOrders
      this.orders = []
      allOrders.forEach(data => {
        if (data.status === 'created' && data.deadline) {
          data.deadline = data.deadline.toString().split('T')[0]
          this.orders.push(data)
        }
      })
      return this.orders
    },
    pageCount() {
      return Math.ceil(this.orders.length / this.ordersPerPage)
    },
  },
  methods: {
    openDialog(index) {
      this.currentOrder = index
      this.dialog = true;
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
  margin-top: 5vh;
}

.custom-highlight-row {
  background-color: #eeeeee;
}

.v-data-table::v-deep th {
  font-size: 0.5em !important;
}
</style>
