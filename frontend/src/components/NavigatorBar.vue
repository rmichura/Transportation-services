<template>
  <v-app-bar
      app
      color="teal"
      dark
  >
    <router-link to="/" class="teal--text text-decoration-none">
      <v-btn
          text
          v-if="!auth"
      >
        <span class="mr-2">Transportation services</span>
      </v-btn>
    </router-link>

    <router-link to="/customer" class="teal--text text-decoration-none">
      <v-btn
          text
          v-if="auth && role === 'user'"
      >
        <span class="mr-2">Transportation services</span>
      </v-btn>
    </router-link>

    <router-link to="/employee" class="teal--text text-decoration-none">
      <v-btn
          text
          v-if="auth && role === 'employee'"
      >
        <span class="mr-2">Transportation services</span>
      </v-btn>
    </router-link>

    <router-link to="/admin" class="teal--text text-decoration-none">
      <v-btn
          text
          v-if="auth && role === 'admin'"
      >
        <span class="mr-2">Transportation services</span>
      </v-btn>
    </router-link>

    <v-spacer></v-spacer>

    <router-link to="/login" class="teal--text text-decoration-none">
      <v-btn
          text
          v-if="!auth"
      >
        <span class="mr-2">Zaloguj się</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </router-link>

    <v-menu
        left
        bottom
        v-if="auth && role === 'employee'"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            v-bind="attrs"
            v-on="on"
            text
        >
          <v-icon class="ma-2">mdi-text-account</v-icon>
          <span class="mr-2">Panel użytkownika</span>
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <router-link :to="`/employee/order`" class="teal--text text-decoration-none">
            <v-icon class="ma-2">mdi-beaker-outline</v-icon>
            <span class="mr-2">Złóż zamówienie</span>
          </router-link>
        </v-list-item>
        <v-list-item>
          <router-link :to="`/employee/order/state`" class="teal--text text-decoration-none">
            <v-icon class="ma-2">mdi-beaker-check-outline</v-icon>
            <span class="mr-">Sprawdź zamówienie</span>
          </router-link>
        </v-list-item>
        <v-list-item>
          <router-link :to="`/employee/order/history`" class="teal--text text-decoration-none">
            <v-icon class="ma-2">mdi-history</v-icon>
            <span class="mr-2">Zobacz historię</span>
          </router-link>
        </v-list-item>
      </v-list>
    </v-menu>

    <router-link :to="`/employee/account`" class="teal--text text-decoration-none">
      <v-btn
          text
          v-if="auth && role === 'employee'"
      >
        <v-icon class="ma-2">mdi-account</v-icon>
        <span class="mr-2">Moje konto</span>
      </v-btn>
    </router-link>

    <router-link to="/customer/account" class="teal--text text-decoration-none">
      <v-btn
          text
          v-if="auth && role === 'user'"
      >
        <v-icon class="mr-2">mdi-account</v-icon>
        <span class="mr-2">Moje konto</span>
      </v-btn>
    </router-link>

    <router-link to="/admin/account" class="teal--text text-decoration-none">
      <v-btn
          text
          v-if="auth && role === 'admin'"
      >
        <v-icon class="ma-2">mdi-account</v-icon>
        <span class="mr-2">Moje konto</span>
      </v-btn>
    </router-link>

    <router-link to="/" class="teal--text text-decoration-none">
      <v-btn
          text
          v-if="auth"
          @click="logOut"
      >
        <span class="mr-2">Wyloguj się</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </router-link>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavigatorBar",
  data() {
    return {}
  },

  computed: {
    auth() {
      return this.$store.getters.isAuth;
    },
    role() {
      return this.$store.getters.yourRole;
    }
  },

  methods: {
    logOut() {
      this.$store.dispatch('logout')
    },
  }
}
</script>

<style scoped>

</style>
