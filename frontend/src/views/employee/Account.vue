<template>
  <v-container class="fill-height" v-if="setUser">
    <v-row class="justify-center">
      <v-sheet
          elevation="8"
          height="420"
          width="220"
          color="teal"
      >
        <v-row class="justify-center marginTop">
          <v-icon size="70" color="white">mdi-account</v-icon>
          <div>
            <v-text-field
                v-model="user.email"
                solo
                class="marginTextField"
                readonly
            ></v-text-field>
          </div>
        </v-row>
      </v-sheet>
      <v-sheet
          elevation="8"
          height="420"
          width="500"
          class="marginLeft"
      >
        <v-container>
          <v-row>
            <v-text-field
                label="Name"
                v-model="user.name"
                class="ma-2"
                color="teal"
            ></v-text-field>
            <v-text-field
                label="Surname"
                v-model="user.lastName"
                class="ma-2"
                color="teal"
            ></v-text-field>
          </v-row>
          <v-text-field
              label="Address"
              v-model="user.address"
              class="ma-2"
              color="teal"
          ></v-text-field>
          <v-text-field
              label="New Password"
              v-model="newPassword"
              class="ma-2"
              color="teal"
              :type="show ? 'text' : 'password'"
              :rules="[rules.min]"
          ></v-text-field>
          <v-text-field
              label="Confirm Password"
              v-model="confirmPassword"
              class="ma-2"
              color="teal"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              :rules="[rules.min]"
              @click:append="show = !show"
          ></v-text-field>
          <v-row class="justify-center ma-5">
            <v-btn
                class="white--text"
                color="teal"
                elevation="7"
                large
                @click="updateUser"
            >
              Zaktualizuj dane
            </v-btn>
          </v-row>
        </v-container>
      </v-sheet>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Account",
  data() {
    return {
      user: '',
      newPassword: '',
      confirmPassword: '',
      show: false,
      showConfirm: false,
      rules: {
        min: v => v.length >= 8 || 'Min 8 znaków'
      }
    }
  },
  computed: {
    setUser() {
      this.user = JSON.parse(localStorage.getItem('user'))
      return this.$store.dispatch('getCurrentUser')
    }
  },
  methods: {
    async updateUser() {
      if (this.newPassword === this.confirmPassword) {
        await this.$store.dispatch("updateUser", {
          name: this.user.name,
          lastName: this.user.lastName,
          address: this.user.address,
          password: this.newPassword
        })
        this.newPassword = '';
        this.confirmPassword = '';
      }
      await this.$store.dispatch('getCurrentUser')
    }
  }
}
</script>

<style scoped>
.marginLeft {
  margin-left: 2em;
}

.marginTop {
  margin-top: 4em;
}

.marginTextField {
  margin-top: 2em;
}
</style>
