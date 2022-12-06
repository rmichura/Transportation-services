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
            v-if="isCancel"
            step="3"
            color="red"
            :complete="step > 2"
        >
          Wycena transportu
        </v-stepper-step>

        <v-stepper-step
            v-else
            step="3"
            color="green"
            :complete="step > 2"
        >
          Wycena transportu
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
            step="4"
            color="green"
            :complete="step > 3"
        >
          Zamówienie realizowane
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
            step="5"
            color="green"
            :complete="step > 4"
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
          <td>{{ order.receptionPlace }}</td>
          <td>{{ order.deliveryPlace }}</td>
          <td>{{ order.receptionDate }}</td>
          <td v-if="order.status === 'created'" v-bind:show="action = true">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    icon
                    @click="openDialog(index)"
                    v-bind="attrs"
                    v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>Edytuj zamówienie</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    icon
                    @click="removeOrder(index)"
                    v-bind="attrs"
                    v-on="on"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Usuń zamówienie</span>
            </v-tooltip>
          </td>
          <td v-else-if="order.status === 'priced'" v-bind:show="action = true">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    icon
                    @click="openDialog(index)"
                    v-bind="attrs"
                    v-on="on"
                >
                  <v-icon>mdi-check</v-icon>
                </v-btn>
              </template>
              <span>Akceptuj zamówienie</span>
            </v-tooltip>
          </td>
          <td v-else-if="action"></td>
        </tr>
        </tbody>
      </template>
    </v-data-table>

    <edit-order :dialog.sync="dialog" :edited-order="editedOrder"/>

    <accept-or-cancel :current-order="currentOrder" :dialog-accept.sync="dialogAccept"/>

  </v-container>
</template>

<script>
import AcceptOrCancel from "@/dialogs/AcceptOrCancel";
import EditOrder from "@/dialogs/EditOrder";

export default {
  name: "StateOrder",
  components: {EditOrder, AcceptOrCancel},
  data() {
    return {
      step: 0,
      orders: [],
      action: false,
      selectedRow: null,
      dialog: false,
      dialogAccept: false,
      editedOrder: [],
      currentOrder: [],
      isCancel: false,
      numberOrder: '',
      headers: [
        {text: 'Rodzaj towaru', value: 'productType'},
        {text: 'Miejsce odbioru', value: 'receptionPlace'},
        {text: 'Miejsce docelowe', value: 'deliveryPlace'},
        {text: 'Termin odbioru', value: 'receptionDate'},
      ],
      headersAction: [
        {text: 'Rodzaj towaru', value: 'productType'},
        {text: 'Miejsce odbioru', value: 'receptionPlace'},
        {text: 'Miejsce docelowe', value: 'deliveryPlace'},
        {text: 'Termin odbioru', value: 'receptionDate'},
        {text: 'Edytuj/Usuń'}
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
        if (data.status !== 'finished' && data.receptionDate && data.deliveryDate) {
          data.receptionDate = data.receptionDate.toString().split('T')[0]
          data.deliveryDate = data.deliveryDate.toString().split('T')[0]
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
      } else if (this.orders[index].status === 'priced') {
        this.step = 3
        this.selectedRow = index;
        this.isCancel = false
        this.numberOrder = this.orders[index].numberOrder
      } else if (this.orders[index].status === 'canceled') {
        this.step = 3
        this.selectedRow = index;
        this.numberOrder = this.orders[index].numberOrder
        this.isCancel = true
      } else {
        this.step = 4
        this.selectedRow = index;
        this.numberOrder = this.orders[index].numberOrder
      }
    },
    openDialog(index) {
      this.editedOrder = this.orders[index]
      this.currentOrder = this.orders[index]
      if (this.orders[index].status === 'priced') {
        this.dialogAccept = true
      } else {
        this.dialog = true
      }
    },
    removeOrder(index) {
      this.$store.dispatch('removeOrder', index)
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
