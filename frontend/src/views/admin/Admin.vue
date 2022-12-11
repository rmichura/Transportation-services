<template>
  <v-container class="fill-height color-container">
    <v-row class="justify-center">
      <v-sheet
          elevation="8"
          height="420"
          width="300"
          class="sheet"
      >
        <p><span>W</span>yceń zamówienia<span>!</span></p>
        <v-row class="justify-center margin-top-6em">
          <v-btn
              class="white--text"
              color="teal"
              elevation="7"
              large
              @click="goToOrdersManagement"
          >
            Wycena zamówień
          </v-btn>
        </v-row>
      </v-sheet>
      <v-sheet
          elevation="8"
          height="420"
          width="300"
          class="sheet-white"
      >
        <p><span>Z</span>arządzaj użytkownikami<br> i pracownikami<span>!</span></p>
        <v-row class="justify-center margin-top-6em">
          <v-btn
              class="white--text"
              color="grey"
              elevation="7"
              large
              @click="goToUsersManagement"
          >
            Obsługa użytkowników
          </v-btn>
        </v-row>
      </v-sheet>
      <v-sheet
          elevation="8"
          height="420"
          width="300"
          class="sheet"
      >
        <p><span>D</span>odaj nowe samochody<span>!</span></p>
        <v-row class="justify-center margin-top-6em">
          <v-btn
              class="white--text"
              color="teal"
              elevation="7"
              large
              @click="goToCarsManagement"
          >
            Dodawanie samochodu
          </v-btn>
        </v-row>
      </v-sheet>
      <v-sheet
          elevation="8"
          height="420"
          width="300"
          class="sheet-white"
      >
        <p><span>D</span>odaj nowych kierowców<span>!</span></p>
        <v-row class="justify-center margin-top-6em">
          <v-btn
              class="white--text"
              color="grey"
              elevation="7"
              large
              @click="goToDriversManagement"
          >
            Dodawanie kierowców
          </v-btn>
        </v-row>
      </v-sheet>
    </v-row>
  </v-container>
</template>

<script>
import router from "@/router";

export default {
  name: "Admin",
  data() {
    return {}
  },
  methods: {
    goToOrdersManagement() {
      router.push('admin/management/orders')
    },
    goToUsersManagement() {
      router.push('admin/management/users')
    },
    goToCarsManagement() {
      router.push('admin/management/cars')
    },
    goToDriversManagement() {
      router.push('admin/management/drivers')
    }
  }
}
</script>

<style scoped>
.sheet {
  margin: 1em 3em 1em 0;
  background-color: #eeeeee;
}

.sheet p {
  font-size: 2em;
  font-family: Arial, serif;
  text-align: center;
  margin-top: 2.5em;
}

.sheet-white {
  margin: 1em 3em 1em 0;
  background-color: #fafafa;
}

.sheet-white p {
  font-size: 2em;
  font-family: Arial, serif;
  text-align: center;
  margin-top: 2.5em;
}

.margin-top-6em {
  margin-top: 6em;
}

span {
  color: teal;
}

.color-container {
  background-color: #fafafa;
}
</style>
