<template>
  <v-row class="fill-height">
    <div v-if="getCars"></div>
    <div v-if="getOrders"></div>
    <div v-if="setCars"></div>
    <div v-if="setOrders"></div>
    <v-col>
      <v-sheet height="64">
        <v-toolbar
            flat
        >
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="80vh">
        <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            type="category"
            category-show-all
            :categories="carsCategory"
            :events="events"
            :event-color="getEventColor"
            @change="fetchEvents"
        ></v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "EmployeeScheduler",
  data: () => ({
    focus: '',
    events: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    // names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    ordersName: [],
    // categories: ['John Smith', 'Tori Walker', 'Mark'],
    carsCategory: [],
    orders: []
  }),
  mounted() {
    this.$refs.calendar.checkChange()
  },
  computed: {
    getCars() {
      return this.$store.dispatch('getCars')
    },
    getOrders() {
      return this.$store.dispatch('getAllOrders')
    },
    setCars() {
      this.carsCategory = [];
      const cars = this.$store.getters.cars
      cars.forEach(data => {
        this.carsCategory.push(data.numberCar)
      })
    },
    setOrders() {
      this.ordersName = [];
      this.orders = [];
      const orders = this.$store.getters.allOrders
      orders.forEach(data => {
        if (data.status === 'in_progress') {
          this.orders.push(data)
          this.ordersName.push(data.productType)
        }
      })
    }
  },
  methods: {
    getEventColor(event) {
      return event.color
    },
    fetchEvents({start}) {
      const events = []

      const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${start.date}T23:59:59`)

      for (let i = 0; i < this.ordersName.length; i++) {
        const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const secondTimestamp = this.orders[i].durationTransportation * 3600000
        const second = new Date(first.getTime() + secondTimestamp)

        events.push({
          name: this.ordersName[i],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: true,
          category: this.carsCategory[this.rnd(0, this.carsCategory.length - 1)], //
        })
      }
      this.events = events
      console.log(this.events)
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
  },
}
</script>

<style scoped>

</style>
