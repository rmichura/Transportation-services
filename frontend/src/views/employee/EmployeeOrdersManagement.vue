<template>
  <v-container v-if="getOrders">
    <v-row class="justify-center">
      <p class="number-order">Obsługa zamówi<span>eń</span></p>
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
      <template v-slot:body="{ items }">
        <tbody>
        <tr :class="index === selectedRow ? 'custom-highlight-row' : ''"
            v-for="(order, index) in orders" :key="order.name">
          <td>{{ order.numberOrder }}</td>
          <td>{{ order.productType }}</td>
          <td>{{ order.receptionPlace }}</td>
          <td>{{ order.deliveryPlace }}</td>
          <td v-if="order.status === 'in_progress'">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    icon
                    @click="openDialog(index)"
                    v-bind="attrs"
                    v-on="on"
                >
                  <v-icon>mdi-dots-horizontal</v-icon>
                </v-btn>
              </template>
              <span>Obsługa zamówienia</span>
            </v-tooltip>
          </td>
          <td v-else>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    icon
                    @click="orderFinish(index)"
                    v-bind="attrs"
                    v-on="on"
                >
                  <v-icon>mdi-clipboard-check-outline</v-icon>
                </v-btn>
              </template>
              <span>Zakończ zamówienie</span>
            </v-tooltip>
          </td>
        </tr>
        </tbody>
      </template>
    </v-data-table>

    <v-pagination
        v-model="page"
        :length="pageCount"
        class="ma-2"
        color="teal"
    ></v-pagination>

    <order-management :dialog.sync="dialog" :current-order="currentOrder"/>

  </v-container>
</template>

<script>
import OrderManagement from "@/dialogs/OrderManagement";

export default {
  name: "EmployeeOrdersManagement",
  components: {OrderManagement},
  data() {
    return {
      selectedRow: null,
      orders: [],
      dialog: false,
      page: 1,
      ordersPerPage: 10,
      search: '',
      currentOrder: [],
      headers: [
        {text: 'Numer zamówienia', value: 'numberOrder'},
        {text: 'Rodzaj towaru', value: 'productType'},
        {text: 'Miejsce odbioru', value: 'receptionPlace'},
        {text: 'Miejsce docelowe', value: 'deliveryPlace'},
        {text: 'Więcej'}
      ],
    }
  },
  computed: {
    getOrders() {
      return this.$store.dispatch('getAllOrders')
    },
    setOrderInTable() {
      let allOrder = this.$store.getters.allOrders
      this.orders = []
      allOrder.forEach(data => {
        if (data.status === 'in_progress' || data.status === 'in_road' && data.receptionDate && data.deliveryDate) {
          data.receptionDate = data.receptionDate.toString().split('T')[0]
          data.deliveryDate = data.deliveryDate.toString().split('T')[0]
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
      this.currentOrder = this.orders[index]
      this.dialog = true;
    },
    orderFinish(index) {
      const formData = new FormData();
      const id = this.orders[index]._id
      let idCar = null;
      this.orders[index].status = 'finished'
      formData.append('status', 'wolny')
      this.orders.forEach(data => {
        if (data._id === id) {
          idCar = data.car
        }
      })
      this.$store.dispatch('updateOrder', [id, this.orders[index]])
      this.$store.dispatch('updateCar', [idCar, formData]).then(() => {
        this.$store.dispatch('getCars')
      })
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
  margin-top: 5vh;
}

.custom-highlight-row {
  background-color: #eeeeee;
}

.v-data-table::v-deep th {
  font-size: 0.5em !important;
}
</style>
