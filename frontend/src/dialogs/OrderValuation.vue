<template>
  <v-container>
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
                    v-model="currentOrder.productWidth"
                    color="teal"
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
                    v-model="currentOrder.productHeight"
                    color="teal"
                    type="number"
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
                    type="number"
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
                    label="Miejsce odbioru"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-menu
                    v-model="menuReceipt"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="currentOrder.receptionDate"
                        label="Termin odbioru"
                        prepend-icon="mdi-calendar"
                        readonly
                        color="teal"
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                      v-model="currentOrder.receptionDate"
                      @input="menuReceipt = false"
                      color="teal"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    v-model="currentOrder.deliveryPlace"
                    color="teal"
                    label="Miejsce docelowe"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-menu
                    v-model="menuDelivery"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="currentOrder.deliveryDate"
                        label="Termin dostarczenia"
                        prepend-icon="mdi-calendar"
                        readonly
                        color="teal"
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                      v-model="currentOrder.deliveryDate"
                      @input="menuDelivery = false"
                      color="teal"
                  ></v-date-picker>
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
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
                  class="priceField"
              >
                <v-text-field
                    dark
                    v-model="currentOrder.distanceTransportation"
                    color="white"
                    class="white--text"
                    type="number"
                    label="Dystans z punktu a do b - km"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
                  class="priceField"
              >
                <v-text-field
                    dark
                    v-model="currentOrder.durationTransportation"
                    color="white"
                    class="white--text"
                    type="number"
                    label="Zajmie to - h"
                ></v-text-field>
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
                @click="orderAccepted"
            >
              Ackeptuj
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
        v-model="snackbarSuccess"
        right
        height="100"
        color="success"
        rounded
        elevation="8"
    >
      Gratulacje! Zamówienie zostało zaakceptowane.
    </v-snackbar>
    <v-snackbar
        v-model="snackBarError"
        right
        height="100"
        color="error"
        rounded
        elevation="8"
    >
      Błąd! Wszystkie pola są wymagane!
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: "OrderValuation",
  props: ['dialog', 'currentOrder'],
  data() {
    return {
      menuDelivery: false,
      menuReceipt: false,
      dialogAcceptValue: this.dialog,
      snackbarSuccess: false,
      snackBarError: false
    }
  },
  methods: {
    orderAccepted() {
      if (this.currentOrder.orderPrice && this.currentOrder.distanceTransportation && this.currentOrder.durationTransportation) {
        this.currentOrder.status = 'priced'
        this.$store.dispatch('updateOrder', [this.currentOrder._id, this.currentOrder])
        this.snackbarSuccess = true;
        this.closeDialog()
      } else {
        this.snackBarError = true;
      }
    },
    closeDialog() {
      this.dialogAcceptValue = false
      this.$emit('update:dialog', this.dialogAcceptValue)
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

.buttons-dialog {
  margin-right: 1em;
  margin-bottom: 1em;
  margin-top: -1em;
}

.priceField {
  background-color: teal;
}

.text-dialog {
  font-size: 1.1em;
  margin-left: 0.5em;
  font-family: Arial, serif;
}

.text-dialog span {
  color: teal;
}
</style>
