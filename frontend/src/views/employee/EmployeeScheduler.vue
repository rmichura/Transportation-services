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
            @click:event="showDetail"
            @change="fetchEvents"
        ></v-calendar>
        <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
        >
          <v-card
              color="grey lighten-4"
              min-width="350px"
              flat
          >
            <v-toolbar
                :color="selectedEvent.color"
                dark
            >
              <v-toolbar-title>{{ selectedEvent.name }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <span>Miejsce odbioru: <b>{{ receptionPlace }}</b>
                <br> Miejsce dostarczenia: <b>{{ deliveryPlace }}</b></span>
            </v-card-text>
            <v-card-actions>
              <v-btn
                  text
                  color="secondary"
                  @click="selectedOpen = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
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
    ordersName: [],
    carsCategory: [],
    cars: [],
    orders: [],
    selectedElement: null,
    selectedOpen: false,
    selectedEvent: {},
    deliveryPlace: '',
    receptionPlace: '',
    carsBusy: [],
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
      this.cars = [];
      this.carsBusy = [];
      const cars = this.$store.getters.cars
      cars.forEach(data => {
        if (data.status === 'wolny') {
          this.cars.push(data)
        } else {
          this.carsBusy.push(data)
        }
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
    showDetail({nativeEvent, event}) {
      try {
        const open = () => {
          this.selectedEvent = event
          this.deliveryPlace = this.selectedEvent.order.deliveryPlace
          this.receptionPlace = this.selectedEvent.order.receptionPlace
          this.selectedElement = nativeEvent.target
          requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }
        nativeEvent.stopPropagation()
      } catch (error) {
      }
    },
    fetchEvents({start}) {
      const events = []
      let selectedCar = null;
      let arraySelectedCars = [];

      const min = new Date(`${start.date}T05:00:00`)
      const max = new Date(`${start.date}T07:00:00`)

      for (let i = 0; i < this.ordersName.length; i++) {
        const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        let first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const secondTimestamp = this.orders[i].durationTransportation * 3600000
        let second = new Date(first.getTime() + secondTimestamp)
        const carsCount = []
        let index = null
        let selectedRnd = null

        for (let j = 0; j < this.carsCategory.length; j++) {
          this.orders.forEach(data => {
            if (this.cars[j]?.maxHeight >= data.productHeight && this.cars[j]?.maxLength >= data.productLength
                && this.cars[j]?.maxWidth >= data.productWidth && this.cars[j]?.capacity >= data.productWeight) {
              index = this.cars[j].numberCar
            }
          })
          carsCount.push(index)
        }
        carsCount.pop()
        selectedRnd = this.rnd(0, carsCount.length - 2)
        selectedCar = this.cars[selectedRnd].numberCar
        arraySelectedCars.push(selectedCar)

        const union = [...carsCount, ...arraySelectedCars]
        const intersection = carsCount.filter(i => arraySelectedCars.includes(i))
        const difference = union.filter(i => !intersection.includes(i))

        for (let i = 0; i < events.length; i++) {
          if (events[i].category === arraySelectedCars[i] && arraySelectedCars[i] === selectedCar) {
            selectedRnd = this.rnd(0, difference.length - 1)
            selectedCar = difference[selectedRnd]
            first = new Date(events[i].end.getTime() + 1800000)
            second = new Date(first.getTime() + secondTimestamp)
          }
        }

        events.forEach(data => {
          if (data.category === selectedCar) {
            first = new Date(data.end.getTime() + 1800000)
            second = new Date(first.getTime() + secondTimestamp)
            selectedRnd = this.rnd(0, difference.length - 1)
            selectedCar = difference[selectedRnd]
          }
        })


        if (arraySelectedCars.length <= carsCount.length) {
          for (let i = 0; i < events.length; i++) {
            if (events[i].category === selectedCar) {
              difference.forEach(data => {
                if (events[i].category !== data) {
                  selectedCar = data
                }
              })
            }
          }
        }


        if (arraySelectedCars.length > carsCount.length) {
          const orderTimes = [];
          for (let i = 0; i < events.length; i++) {
            if (events[i].timed) {
              orderTimes.push({
                orderTime: events[i].end - events[i].start,
                numberCar: events[i].category,
                startTime: events[i].start,
                endTime: events[i].end,
                timed: events[i].timed
              })
            }
          }
          orderTimes.reverse()
          let shortestOrder = orderTimes.slice(-(arraySelectedCars.length - carsCount.length))
          selectedCar = shortestOrder[0].numberCar
          first = new Date(shortestOrder[0].endTime.getTime() + 1800000)
          second = new Date(first.getTime() + secondTimestamp)
        }

        if (this.carsBusy.length > 0 && i === 1) {
          for (let i = 0; i < this.carsBusy.length; i++) {
            let carBusy = [...this.carsBusy]
            events.push({
              name: 'Zajęty',
              color: 'red',
              start: new Date(),
              end: new Date(),
              timed: false,
              category: carBusy[i].numberCar,
              outside: false
            })
          }
        }

        events.push({
          name: this.ordersName[i],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: true,
          category: selectedCar,
          order: this.orders[i],
          outside: false
        })
      }
      this.events = events
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
  },
}
</script>

<style scoped>

</style>
