<template>
  <v-container class="fill-height color-container">
    <v-row class="justify-center">
      <v-sheet
          elevation="8"
          height="420"
          width="300"
          class="sheet-orders"
      >
        <p><span>Z</span>arządzanie zamówieniami<span>!</span></p>
        <v-row class="justify-center margin-top-6em">
          <v-btn
              class="white--text"
              color="teal"
              elevation="7"
              large
              @click="goToOrdersManagement"
          >
            Zamówienia
          </v-btn>
        </v-row>
      </v-sheet>
      <v-sheet
          elevation="8"
          height="420"
          width="300"
          class="sheet-management-orders"
      >
        <p><span>Z</span>arządzanie użytkownikami<span>!</span></p>
        <v-row class="justify-center margin-top-6em">
          <v-btn
              class="white--text"
              color="grey"
              elevation="7"
              large
              @click="goToUsersManagement"
          >
            Użytkownicy
          </v-btn>
        </v-row>
      </v-sheet>
      <v-sheet
          elevation="8"
          height="420"
          width="300"
          class="sheet-management-orders"
      >
        <p><span>Z</span>arządzanie pracownikami<span>!</span></p>
        <v-row class="justify-center margin-top-6em">
          <v-btn
              class="white--text"
              color="grey"
              elevation="7"
              large
              @click="goToEmployeesManagement"
          >
            Pracownicy
          </v-btn>
        </v-row>
      </v-sheet>
      <v-sheet
          elevation="8"
          height="420"
          width="300"
          class="sheet-management-cars"
      >
        <p><span>Z</span>arządzanie samochodami<span>!</span></p>
        <v-row class="justify-center margin-top-6em">
          <v-btn
              class="white--text"
              color="teal"
              elevation="7"
              large
              @click="goToCarsManagement"
          >
            Samochody
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
    goToEmployeesManagement() {
      router.push('admin/management/employees')
    },
    goToCarsManagement() {
      router.push('admin/management/cars')
    }
  }
}
</script>

<style scoped>
.sheet-orders {
  margin: 1em 3em 1em 0;
  background-color: #eeeeee;
}

.sheet-orders p {
  font-size: 2em;
  font-family: Arial, serif;
  text-align: center;
  margin-top: 2.5em;
}

.sheet-management-orders {
  margin: 1em 3em 1em 0;
  background-color: #fafafa;
}

.sheet-management-orders p {
  font-size: 2em;
  font-family: Arial, serif;
  text-align: center;
  margin-top: 2.5em;
}

.sheet-management-cars {
  margin: 1em 3em 1em 0;
  background-color: #eeeeee;
}

.sheet-management-cars p {
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
