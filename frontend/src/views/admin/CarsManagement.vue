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
          label="Marka"
          class="navigation"
          color="teal"
          :items="selectBrand"
          v-model="selectedBrand"
          item-color="teal"
      ></v-select>

      <v-select
          dense
          label="Typ"
          class="ma-2"
          color="teal"
          :items="selectType"
          v-model="selectedType"
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
        <p>{{ car.brand }} * {{ car.type }} * {{ car.status }}</p>
      </v-sheet>
    </v-row>

    <add-car :dialog.sync="dialog"/>

    <edit-car :dialog-car.sync="dialogCar" :current-car="currentCar"/>

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
      cars: [],
      selectBrand: [],
      selectType: [],
      selectStatus: [],
      selectedBrand: null,
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
      this.dialogCar = true
    },
    openDialog() {
      this.dialog = true;
    },
    openDrawer() {
      this.selectBrand = []
      this.selectType = []
      this.selectStatus = []
      this.cars.forEach(data => {
        this.selectBrand.push(data.brand)
        this.selectType.push(data.type)
        this.selectStatus.push(data.status)
      })
      this.drawer = true
    },
    search() {
      this.drawer = false
      const selected = [];
      console.log(this.selectedBrand)
      if (this.selectedBrand === null && this.selectedType === null && this.selectedStatus === null) {
        this.cars = this.$store.getters.cars
      } else {
        this.cars.forEach((car) => {
          if (car.brand === this.selectedBrand || car.type === this.selectedType
              || car.status === this.selectedStatus) {
            selected.push(car)
          }
        })
        this.cars = selected
      }
      this.resetSearch()
    },
    resetSearch() {
      this.selectedBrand = null
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
}

.sheet:hover {
  background-color: gainsboro;
  border: teal solid;
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
