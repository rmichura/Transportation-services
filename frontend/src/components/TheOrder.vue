<template>
  <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      class="fill-height"
  >
    <v-container class="fill-height">
      <v-row class="justify-center">
        <v-sheet
            height="570"
            width="800"
            class="sheet"
            elevation="7"
        >
          <p><span>Chcesz</span> złożyć zamówienie transportu?<br> Wypełnij poniższe <span>informacje.</span></p>
          <v-row class="justify-center">
            <v-col
                cols="5"
                class="ma-2"
            >
              <v-text-field
                  v-model="productType"
                  color="teal"
                  :rules="required"
                  label="Rodzaj towaru"
                  prepend-icon="mdi-help-rhombus-outline"
              ></v-text-field>
              <v-text-field
                  v-model="productWeight"
                  color="teal"
                  :rules="required"
                  type="number"
                  label="Waga towaru - kg"
                  prepend-icon="mdi-weight-kilogram"
              ></v-text-field>
              <v-text-field
                  v-model="receptionPlace"
                  color="teal"
                  :rules="required"
                  label="Miejsce odbioru"
                  prepend-icon="mdi-map-marker"
              ></v-text-field>
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
                      v-model="receptionDate"
                      label="Termin odbioru"
                      prepend-icon="mdi-calendar"
                      readonly
                      :rules="required"
                      color="teal"
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="receptionDate"
                    @input="menuReceipt = false"
                    :allowed-dates="allowedDates"
                    color="teal"
                ></v-date-picker>
              </v-menu>
              <v-text-field
                  v-model="deliveryPlace"
                  color="teal"
                  :rules="required"
                  label="Miejsce docelowe"
                  prepend-icon="mdi-map-marker-outline"
              ></v-text-field>
            </v-col>

            <v-col
                cols="5"
                class="ma-2"
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
                      v-model="deliveryDate"
                      label="Termin dostawy"
                      prepend-icon="mdi-calendar"
                      readonly
                      :rules="required"
                      color="teal"
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="deliveryDate"
                    @input="menuDelivery = false"
                    :allowed-dates="allowedDates"
                    color="teal"
                ></v-date-picker>
              </v-menu>
              <v-text-field
                  v-model="productWidth"
                  color="teal"
                  :rules="required"
                  type="number"
                  label="Szerokość towaru - cm"
                  prepend-icon="mdi-arrow-expand-horizontal"
              ></v-text-field>
              <v-text-field
                  v-model="productHeight"
                  color="teal"
                  :rules="required"
                  type="number"
                  label="Wysokość towaru - cm"
                  prepend-icon="mdi-arrow-expand-vertical"
              ></v-text-field>

              <v-text-field
                  v-model="productLength"
                  color="teal"
                  :rules="required"
                  type="number"
                  label="Długość towaru - cm"
                  prepend-icon="mdi-arrow-collapse-right "
              ></v-text-field>
            </v-col>
            <v-btn
                class="white--text"
                color="teal"
                elevation="7"
                large
                @click="saveOrder"
                :disabled="!valid"
            >
              Zamów transport
            </v-btn>
          </v-row>
        </v-sheet>
      </v-row>
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
          color="success"
          rounded
          elevation="8"
      >
        Gratulacje! Poprawnie złożyłeś zamówienie!
      </v-snackbar>
    </v-container>
  </v-form>
</template>

<script>

export default {
  name: "TheOrder",
  data() {
    return {
      deliveryDate: '',
      receptionDate: '',
      menuDelivery: false,
      menuReceipt: false,
      valid: true,
      snackBarError: false,
      snackbarSuccess: false,
      productType: '',
      productWeight: '',
      productWidth: '',
      productHeight: '',
      productLength: '',
      receptionPlace: '',
      deliveryPlace: '',
      required: [
        v => !!v || 'Pole jest wymagane',
      ],
    }
  },
  methods: {
    async saveOrder() {
      let currentUser = this.$store.getters.currentUser
      if (this.$refs.form.validate()) {
        await this.$store.dispatch('saveOrder', {
          productType: this.productType,
          productWeight: this.productWeight,
          productWidth: this.productWidth,
          productHeight: this.productHeight,
          productLength: this.productLength,
          receptionPlace: this.receptionPlace,
          deliveryPlace: this.deliveryPlace,
          status: "created",
          deliveryDate: this.deliveryDate,
          receptionDate: this.receptionDate,
          user: currentUser
        })
        this.$refs.form.reset()
        this.snackbarSuccess = true
      } else {
        this.snackBarError = true
      }
    },
    allowedDates: val => val >= (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
  }
}
</script>

<style scoped>

.sheet p {
  margin-top: 1em;
  text-align: center;
  font-family: Arial, serif;
  font-size: 1.5em;
}

.sheet p span {
  color: teal;
}
</style>
