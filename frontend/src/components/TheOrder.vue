<template>
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
                color="teal"
                label="Rodzaj towaru"
                prepend-icon="mdi-help-rhombus-outline"
            ></v-text-field>
            <v-text-field
                color="teal"
                label="Waga towaru - kg"
                prepend-icon="mdi-weight-kilogram"
            ></v-text-field>
            <v-text-field
                color="teal"
                label="Miejsce odbioru"
                prepend-icon="mdi-map-marker"
            ></v-text-field>
            <v-text-field
                color="teal"
                label="Miejsce docelowe"
                prepend-icon="mdi-map-marker-outline"
            ></v-text-field>
          </v-col>
          <v-col
              cols="5"
              class="ma-2"
          >
            <v-text-field
                color="teal"
                label="Szerokość towaru - cm"
                prepend-icon="mdi-arrow-expand-horizontal"
            ></v-text-field>
            <v-text-field
                color="teal"
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
          >
            Zamów transport
          </v-btn>
        </v-row>
      </v-sheet>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "TheOrder",
  data() {
    return {
      date: '',
      menu: false,
    }
  },
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
