<template>
  <v-dialog
      v-model="dialogAccept"
      max-width="700"
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
              text
              color="teal"
              @click="orderCanceled"
          >
            Anuluj zamówienie
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
</template>

<script>
export default {
  name: "AcceptOrCancel",
  props: ['currentOrder', 'dialogAccept'],
  data() {
    return {
      menu: false,
      dialogAcceptValue: this.dialogAccept,
    }
  },
  methods: {
    orderCanceled() {
      this.currentOrder.status = 'canceled'
      this.$store.dispatch('updateOrder', [this.currentOrder._id, this.currentOrder])
      this.closeDialog()
    },
    orderAccepted() {
      this.currentOrder.status = 'in_progress'
      this.$store.dispatch('updateOrder', [this.currentOrder._id, this.currentOrder])
      this.closeDialog()
    },
    closeDialog() {
      this.dialogAcceptValue = false
      this.$emit('update:dialogAccept', this.dialogAcceptValue)
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

.buttons-dialog {
  margin-right: 1em;
  margin-bottom: 1em;
  margin-top: -1em;
}

.priceField {
  background-color: teal;
  border-radius: 8px;
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
