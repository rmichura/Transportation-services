<template>
  <v-container v-if="getCars">
    <v-row class="justify-end ma-2">
      <v-btn
          text
          color="teal"
          class="ma-2"
          large
          @click="openDrawer"
      >
        Szukaj
      </v-btn>
      <v-btn
          class="white--text ma-2"
          color="teal"
          elevation="7"
          large
          @click="openDialog"
      >
        Dodaj samochód
      </v-btn>
    </v-row>

    <v-navigation-drawer
        v-model="drawer"
        temporary
        left
        app
        width="250"
    >
      <v-select
          dense
          class="navigation"
          label="Typ"
          color="teal"
          :items="selectType"
          v-model="selectedType"
          item-color="teal"
      ></v-select>

      <v-select
          dense
          label="Ładowność"
          color="teal"
          class="ma-2"
          :items="selectCapacity"
          v-model="selectedCapacity"
          item-color="teal"
      ></v-select>

      <v-select
          dense
          label="Status"
          class="ma-2"
          color="teal"
          :items="selectStatus"
          v-model="selectedStatus"
          item-color="teal"
      ></v-select>

      <v-btn
          class="white--text margin-left-2em"
          color="teal"
          @click="search"
      >
        Szukaj
      </v-btn>

    </v-navigation-drawer>

    <div v-if="refreshCars"></div>

    <v-row class="justify-center">
      <v-sheet
          v-for="(car, index) in cars" :key="car.name"
          elevation="8"
          height="320"
          width="300"
          class="sheet"
          type="button"
          @click="openDialogCar(index)"
      >
        <v-img
            height="200"
            width="320"
            :src="`http://127.0.0.1:8887/backend/${car.img}`"
        >
        </v-img>
        <p>{{ car.type }} * {{ car.capacity }}kg * {{ car.status }}</p>
      </v-sheet>
    </v-row>

    <add-car :dialog.sync="dialog"/>

    <edit-car :dialog-car.sync="dialogCar" :current-car="currentCar" :current-driver="currentDriver"/>

  </v-container>
</template>

<script>
import AddCar from "@/dialogs/AddCar";
import EditCar from "@/dialogs/EditCar";

export default {
  name: "CarsManagement",
  components: {EditCar, AddCar},
  data() {
    return {
      drawer: false,
      dialog: false,
      dialogCar: false,
      currentCar: [],
      currentDriver: [],
      cars: [],
      selectCapacity: [],
      selectType: [],
      selectStatus: [],
      selectedCapacity: null,
      selectedType: null,
      selectedStatus: null,
    }
  },
  computed: {
    getCars() {
      return this.$store.dispatch('getCars')
    },
    refreshCars() {
      this.cars = this.$store.getters.cars
    }
  },
  methods: {
    openDialogCar(index) {
      this.currentCar = this.cars[index]
      if (this.currentCar.driver) {
        this.$store.dispatch('getDriver', this.currentCar.driver).then(() => {
          this.currentDriver = this.$store.getters.driver
        })
      }
      this.dialogCar = true
    },
    openDialog() {
      this.dialog = true;
    },
    openDrawer() {
      this.selectCapacity = []
      this.selectType = []
      this.selectStatus = []
      this.cars.forEach(data => {
        this.selectCapacity.push(data.capacity)
        this.selectType.push(data.type)
        this.selectStatus.push(data.status)
      })
      this.drawer = true
    },
    search() {
      this.drawer = false
      const selected = [];
      if (this.selectCapacity === null && this.selectedType === null && this.selectedStatus === null) {
        this.cars = this.$store.getters.cars
      } else {
        this.cars.forEach((car) => {
          if (car.capacity === this.selectCapacity || car.type === this.selectedType
              || car.status === this.selectedStatus) {
            selected.push(car)
          }
        })
        this.cars = selected
      }
      this.resetSearch()
    },
    resetSearch() {
      this.selectedCapacity = null
      this.selectedType = null
      this.selectedStatus = null
    }
  }
}
</script>

<style scoped>

.sheet {
  margin: 1em 3em 1em 0;
}

.sheet p {
  font-size: 1.2em;
  font-family: Arial, serif;
  text-align: center;
  margin-top: 2em;
  background-color: teal;
  color: white;
}

.sheet:hover {
  background-color: #eeeeee;
  border: #eeeeee solid;
}

.margin-left-2em {
  margin-left: 4em;
}

.navigation {
  margin-top: 5em;
  margin-left: 8px;
  margin-right: 8px;
}

</style>
