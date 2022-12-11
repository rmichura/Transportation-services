<template>
  <v-container v-if="getDrivers">
    <v-row class="justify-center">
      <p class="number-order">Zarządzanie kierowca<span>mi</span></p>
    </v-row>

    <div v-if="setDriverInTable"></div>

    <v-row class="justify-end ma-1">
      <v-btn
          class="white--text"
          color="teal"
          elevation="3"
          large
          @click="openDialogAdd"
      >
        Dodaj kierowcę
      </v-btn>
    </v-row>

    <v-text-field
        v-model="search"
        label="Szukaj kierowcę"
        single-line
        hide-details
        color="teal"
    ></v-text-field>

    <v-data-table
        :headers="headers"
        :items="drivers"
        class="data-table elevation-1"
        :page.sync="page"
        :search="search"
        :items-per-page="driversPerPage"
        disable-sort
        hide-default-footer
    >
      <tbody>
      <tr :class="index === selectedRow ? 'custom-highlight-row' : ''"
          v-for="(driver, index) in drivers" :key="driver.name">
        <td>{{ driver.name }}</td>
        <td>{{ driver.lastName }}</td>
        <td>{{ driver.phoneNumber }}</td>
        <td>{{ driver.driverLicense }}</td>
      </tr>
      </tbody>

      <template v-slot:item.actions="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                icon
                @click="openDialog(item)"
                v-bind="attrs"
                v-on="on"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <span>Edytuj kierowcę</span>
        </v-tooltip>
      </template>
    </v-data-table>

    <v-pagination
        v-model="page"
        :length="pageCount"
        class="ma-2"
        color="teal"
    ></v-pagination>

    <add-driver :dialog-add.sync="dialogAdd"/>

    <edit-driver :dialog.sync="dialog" :edited-driver="currentDriver"/>

  </v-container>
</template>

<script>
import AddDriver from "@/dialogs/AddDriver.vue";
import EditDriver from "@/dialogs/EditDriver.vue";

export default {
  name: "DriversManagement",
  components: {EditDriver, AddDriver},
  data() {
    return {
      selectedRow: null,
      drivers: [],
      page: 1,
      driversPerPage: 10,
      currentDriver: [],
      search: '',
      dialog: false,
      dialogAdd: false,
      headers: [
        {text: 'Imię', value: 'name'},
        {text: 'Nazwisko', value: 'lastName'},
        {text: 'Numer telefonu', value: 'phoneNumber'},
        {text: 'Kategoria', value: 'driverLicense'},
        {text: 'Edytuj', value: 'actions'}
      ],
    }
  },
  computed: {
    getDrivers() {
      return this.$store.dispatch('getDrivers')
    },
    setDriverInTable() {
      return this.drivers = this.$store.getters.drivers
    },
    pageCount() {
      return Math.ceil(this.drivers.length / this.driversPerPage)
    },
  },
  methods: {
    openDialog(index) {
      this.currentDriver = index
      this.dialog = true;
    },
    openDialogAdd() {
      this.dialogAdd = true;
    },
  },
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
