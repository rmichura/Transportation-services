<template>
  <v-app-bar
      app
      color="teal"
      dark
  >
    <router-link to="/" class="teal--text">
      <v-btn
          text
          v-if="!auth"
      >
        <span class="mr-2">Transportation services</span>
      </v-btn>
    </router-link>

    <router-link to="/customer" class="teal--text">
      <v-btn
          text
          v-if="auth && role === 'user'"
      >
        <span class="mr-2">Transportation services</span>
      </v-btn>
    </router-link>

    <router-link to="/employee" class="teal--text">
      <v-btn
          text
          v-if="auth && role === 'employee'"
      >
        <span class="mr-2">Transportation services</span>
      </v-btn>
    </router-link>

    <router-link to="/admin" class="teal--text">
      <v-btn
          text
          v-if="auth && role === 'admin'"
      >
        <span class="mr-2">Transportation services</span>
      </v-btn>
    </router-link>

    <v-spacer></v-spacer>

    <router-link to="/login" class="teal--text">
      <v-btn
          text
          v-if="!auth"
      >
        <span class="mr-2">Zaloguj się</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </router-link>

    <router-link :to="`/employee/account`" class="teal--text">
      <v-btn
          text
          v-if="auth && role === 'employee'"
      >
        <span class="mr-2">Moje konto</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </router-link>

    <router-link to="/customer/account" class="teal--text">
      <v-btn
          text
          v-if="auth && role === 'user'"
      >
        <span class="mr-2">Moje konto</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </router-link>

    <router-link to="/admin/account" class="teal--text">
      <v-btn
          text
          v-if="auth && role === 'admin'"
      >
        <span class="mr-2">Moje konto</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </router-link>

    <router-link to="/" class="teal--text">
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
    return {

    }
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
