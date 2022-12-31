<template>
  <v-container class="fill-height color-container">
    <v-row class="justify-center">
      <v-sheet
          elevation="8"
          height="420"
          width="300"
          class="sheet-white"
      >
        <p><span>Z</span>arządzaj użytkownikami<span>!</span></p>
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
        <p><span>O</span>bsłuż nowe zamówienia<span>!</span></p>
        <v-row class="justify-center margin-top-6em">
          <v-btn
              class="white--text"
              color="teal"
              elevation="7"
              large
              @click="goToOrdersManagement"
          >
            Obsługa zamówień
          </v-btn>
        </v-row>
      </v-sheet>
      <v-sheet
          elevation="8"
          height="420"
          width="300"
          class="sheet-white"
      >
        <p><span>S</span>prawdź harmonogram dnia<span>!</span></p>
        <v-row class="justify-center margin-top-6em">
          <v-btn
              class="white--text"
              color="grey"
              elevation="7"
              large
              @click="goToScheduler"
          >
            Harmonogram
          </v-btn>
        </v-row>
      </v-sheet>
    </v-row>
  </v-container>
</template>

<script>
import router from "@/router";

export default {
  name: "Employee",
  data() {
    return {}
  },
  methods: {
    goToOrdersManagement() {
      router.push('employee/management/orders')
    },
    goToUsersManagement() {
      router.push('employee/management/users')
    },
    goToScheduler() {
      router.push('employee/scheduler')
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
