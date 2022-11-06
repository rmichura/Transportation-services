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
            height="500"
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
                  v-model="receptionVenue"
                  color="teal"
                  :rules="required"
                  label="Miejsce odbioru"
                  prepend-icon="mdi-map-marker"
              ></v-text-field>
              <v-text-field
                  v-model="destination"
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
                      v-model="date"
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
                    v-model="date"
                    @input="menu = false"
                    color="teal"
                ></v-date-picker>
              </v-menu>
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
      date: '',
      menu: false,
      valid: true,
      snackBarError: false,
      snackbarSuccess: false,
      productType: '',
      productWeight: '',
      productWidth: '',
      productHeight: '',
      receptionVenue: '',
      destination: '',
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
          receptionVenue: this.receptionVenue,
          destination: this.destination,
          status: "created",
          deadline: this.date,
          user: currentUser
        })
        this.$refs.form.reset()
        this.snackbarSuccess = true
      } else {
        this.snackBarError = true
      }
    },
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
