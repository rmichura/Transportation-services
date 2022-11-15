<template>
  <v-container v-if="getUsers">
    <v-row class="justify-center">
      <p class="number-order">Zarządzanie użytkownika<span>mi</span></p>
    </v-row>

    <div v-if="setUserInTable"></div>

    <v-row class="justify-end ma-1">
      <v-btn
          class="white--text"
          color="teal"
          elevation="3"
          large
          @click="openDialogAdd"
      >
        Dodaj użytkownika
      </v-btn>
    </v-row>

    <v-text-field
        v-model="search"
        label="Szukaj użytkownika"
        single-line
        hide-details
        color="teal"
    ></v-text-field>

    <v-data-table
        :headers="headers"
        :items="users"
        class="data-table elevation-1"
        :page.sync="page"
        :search="search"
        :items-per-page="usersPerPage"
        disable-sort
        hide-default-footer
    >
      <tbody>
      <tr :class="index === selectedRow ? 'custom-highlight-row' : ''"
          v-for="(user, index) in users" :key="user.name">
        <td>{{ user.email }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.lastName }}</td>
        <td>{{ user.address }}</td>
      </tr>
      </tbody>

      <template v-slot:item.actions="{ item }">
        <v-btn
            icon
            @click="openDialog(item)"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
            icon
            @click="removeUser(item)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-pagination
        v-model="page"
        :length="pageCount"
        class="ma-2"
        color="teal"
    ></v-pagination>

    <edit-user-and-employee :dialog.sync="dialog" :current-user="currentUser"/>

    <add-user-or-employee :dialog-add.sync="dialogAdd"/>

  </v-container>
</template>

<script>
import EditUserAndEmployee from "@/dialogs/EditUserAndEmployee";
import AddUserOrEmployee from "@/dialogs/AddUserOrEmployee";

export default {
  name: "UsersAndEmployeesManagement",
  components: {AddUserOrEmployee, EditUserAndEmployee},
  data() {
    return {
      selectedRow: null,
      users: [],
      page: 1,
      usersPerPage: 10,
      currentUser: [],
      search: '',
      dialog: false,
      dialogAdd: false,
      headers: [
        {text: 'Email', value: 'email'},
        {text: 'Imię', value: 'name'},
        {text: 'Nazwisko', value: 'lastName'},
        {text: 'Adres', value: 'address'},
        {text: 'Edytuj/Usuń', value: 'actions'}
      ],
    }
  },
  computed: {
    getUsers() {
      return this.$store.dispatch('getUsers')
    },
    setUserInTable() {
      let allUsers = this.$store.getters.users
      this.users = []
      allUsers.forEach(data => {
        if (data.role !== 'admin') {
          this.users.push(data)
        }
      })
      return this.users
    },
    pageCount() {
      return Math.ceil(this.users.length / this.usersPerPage)
    },
  },
  methods: {
    openDialog(index) {
      this.currentUser = index
      this.dialog = true;
    },
    openDialogAdd() {
      this.dialogAdd = true;
    },
    removeUser(index) {
      this.$store.dispatch('removeUser', index)
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
