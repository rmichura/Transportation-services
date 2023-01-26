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
                Zamknij
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
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange'],
    ordersName: [],
    carsCategory: [],
    cars: [],
    orders: [],
    ordersInRoad: [],
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
      this.ordersInRoad = []
      const orders = this.$store.getters.allOrders
      orders.forEach(data => {
        if (data.status === 'in_progress') {
          this.orders.push(data)
          this.ordersName.push(data.productType)
        } else if (data.status === 'in_road') {
          this.ordersInRoad.push(data)
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

      const min = new Date(`${start.date}T08:00:00`)
      const max = new Date(`${start.date}T09:00:00`)
      const now = new Date(`${start.date}T11:00:00`)

      this.sortOrdersByDate();

      for (let i = 0; i < this.ordersName.length; i++) {
        let firstTimestamp = null
        if (now > min) {
          firstTimestamp = now.getTime() + 900000
        } else {
          firstTimestamp = this.rnd(min.getTime(), max.getTime())
        }
        let first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const secondTimestamp = this.orders[i].durationTransportation * 3600000
        let second = new Date(first.getTime() + secondTimestamp)
        let carsCount = []
        let selectedRnd = null
        let countBusyCarNumber = []

        this.validationsCarToOrders(carsCount)

        carsCount = [...new Set(carsCount)]
        selectedRnd = this.rnd(0, carsCount.length - 2)
        selectedCar = this.cars[selectedRnd].numberCar
        arraySelectedCars.push(selectedCar)

        const union = [...carsCount, ...arraySelectedCars]
        const intersection = carsCount.filter(i => arraySelectedCars.includes(i))
        const difference = union.filter(i => !intersection.includes(i))

        if (this.ordersInRoad.length > 0 && i === 0) {
          this.addCarsWhichAreInRoadToEvent(countBusyCarNumber, events, start)
        }

        for (let i = 0; i < events.length; i++) {
          if (events[i].category === arraySelectedCars[i] && arraySelectedCars[i] === selectedCar) {
            selectedRnd = this.rnd(0, difference.length - 1)
            selectedCar = difference[selectedRnd]
          }
        }

        events.forEach(data => {
          if (data.category === selectedCar) {
            selectedRnd = this.rnd(0, difference.length - 1)
            selectedCar = difference[selectedRnd]
          }
        })

        if (this.ordersInRoad.length > 0) {
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

          if (arraySelectedCars.length >= carsCount.length) {
            let orderTimes = [];

            this.ordersTimeDuration(events, orderTimes)

            orderTimes.sort((a, b) => {
              return b.orderTime - a.orderTime;
            })
            let shortestOrder;
            orderTimes = [...new Map(orderTimes.map(item => [item.numberCar, item])).values()]
            shortestOrder = orderTimes.slice(-((arraySelectedCars.length + this.ordersInRoad.length) - carsCount.length))
            if (shortestOrder.length > 1) {
              shortestOrder.sort((a, b) => {
                return a.orderTime - b.orderTime;
              })

              if (now > shortestOrder[0]?.endTime.getTime()) {
                firstTimestamp = now.getTime() + 900000
                first = new Date(firstTimestamp - (firstTimestamp % 900000))
                second = new Date(first.getTime() + secondTimestamp)
              }

              selectedCar = shortestOrder[shortestOrder.length - 1].numberCar
              if (now < shortestOrder[shortestOrder.length - 1].endTime.getTime()) {
                first = new Date(shortestOrder[shortestOrder.length - 1].endTime.getTime() + 1800000)
                second = new Date(first.getTime() + secondTimestamp)
              }

            } else {
              selectedCar = shortestOrder[0].numberCar
              first = new Date(shortestOrder[0].endTime.getTime() + 1800000)
              second = new Date(first.getTime() + secondTimestamp)
            }
          } else {
            let orderTimes = [];

            this.ordersTimeDuration(events, orderTimes)

            this.sortOrdersByTime(orderTimes)

            const lookup = orderTimes.reduce((a, e) => {
              a[e.numberCar] = ++a[e.numberCar] || 0;
              return a;
            }, {});
            let elementsToRemove = orderTimes.filter(e => lookup[e.numberCar])
            let orderTimesWithoutDuplicates = orderTimes.filter(x => !elementsToRemove.includes(x));
            if (arraySelectedCars.length + 1 >= carsCount.length) {
              if (orderTimesWithoutDuplicates.length >= arraySelectedCars.length + 1) {
                selectedCar = orderTimesWithoutDuplicates[0]?.numberCar
                first = new Date(orderTimesWithoutDuplicates[0]?.endTime.getTime() + 1800000)
                second = new Date(first.getTime() + secondTimestamp)
              }

              if (now > orderTimesWithoutDuplicates[0]?.endTime.getTime()) {
                firstTimestamp = now.getTime() + 900000
                first = new Date(firstTimestamp - (firstTimestamp % 900000))
                second = new Date(first.getTime() + secondTimestamp)
              }
            } else {
              if (arraySelectedCars.length < orderTimesWithoutDuplicates.length && this.orders.length > 1) {
                selectedCar = orderTimesWithoutDuplicates[0]?.numberCar
                if (now > orderTimesWithoutDuplicates[0]?.endTime.getTime()) {
                  firstTimestamp = now.getTime() + 900000
                  first = new Date(firstTimestamp - (firstTimestamp % 900000))
                  second = new Date(first.getTime() + secondTimestamp)
                } else {
                  first = new Date(orderTimesWithoutDuplicates[0]?.endTime.getTime() + 1800000)
                  second = new Date(first.getTime() + secondTimestamp)
                }
              }
            }
          }
        } else {
          if (arraySelectedCars.length + this.ordersInRoad.length <= carsCount.length) {
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

          if (arraySelectedCars.length + this.ordersInRoad.length > carsCount.length) {
            let orderTimes = [];
            let shortestOrder;

            this.ordersTimeDuration(events, orderTimes)

            if (carsCount.length <= 2) {
              this.sortOrdersByTime(orderTimes)

              if (orderTimes.length === this.ordersName.length - 1) {
                selectedCar = orderTimes[1]?.numberCar
                first = new Date(orderTimes[i - 1]?.endTime.getTime() + 1800000)
                second = new Date(first.getTime() + secondTimestamp)
              } else {
                selectedCar = orderTimes[i - 2]?.numberCar
                first = new Date(orderTimes[i - 2]?.endTime.getTime() + 1800000)
                second = new Date(first.getTime() + secondTimestamp)
              }
            } else {
              orderTimes.sort((a, b) => {
                return b.orderTime - a.orderTime;
              })
              orderTimes.splice(0, 1)
              orderTimes = [...new Map(orderTimes.map(item => [item.numberCar, item])).values()]
              if (this.ordersInRoad.length === 1) {
                shortestOrder = orderTimes.slice(-((arraySelectedCars.length) - carsCount.length))
              } else {
                shortestOrder = orderTimes.slice(-((arraySelectedCars.length + this.ordersInRoad.length) - carsCount.length))
              }
              selectedCar = shortestOrder[0].numberCar
              first = new Date(shortestOrder[0].endTime.getTime() + 1800000)
              second = new Date(first.getTime() + secondTimestamp)
            }
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
      this.addCarsBusyToEvent(events)
      this.events = events
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    sortOrdersByDate() {
      this.orders.sort((a, b) => {
        return a.deliveryDate - b.deliveryDate;
      })
    },
    sortOrdersByTime(orderTimes) {
      orderTimes.sort((a, b) => {
        return a.orderTime - b.orderTime;
      })
    },
    addCarsBusyToEvent(events) {
      if (this.carsBusy.length > 0) {
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
    },
    addCarsWhichAreInRoadToEvent(countBusyCarNumber, events, start) {
      for (let i = 0; i < this.ordersInRoad.length; i++) {
        let allCars = [...this.cars, ...this.carsBusy]
        allCars.forEach(data => {
          if (this.ordersInRoad[i].car === data._id) {
            countBusyCarNumber.push(data.numberCar)
            countBusyCarNumber = [...new Set(countBusyCarNumber)]
            let startTime = new Date(`${start.date}T${this.ordersInRoad[i].startTimeOrder}`)
            events.push({
              name: this.ordersInRoad[i].productType + ' -W drodze',
              color: 'grey',
              start: startTime,
              end: new Date(startTime.getTime() + this.ordersInRoad[i].durationTransportation * 3600000),
              order: this.ordersInRoad[i],
              timed: true,
              category: data.numberCar,
              outside: false
            })
          }
        })
      }
    },
    validationsCarToOrders(carsCount) {
      let index = null
      for (let j = 0; j < this.carsCategory.length; j++) {
        this.orders.forEach(data => {
          if (this.cars[j]?.maxHeight >= data.productHeight && this.cars[j]?.maxLength >= data.productLength
              && this.cars[j]?.maxWidth >= data.productWidth && this.cars[j]?.capacity >= data.productWeight) {
            index = this.cars[j].numberCar
          }
        })
        carsCount.push(index)
      }
    },

    ordersTimeDuration(events, orderTimes) {
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
    }
  },
}
</script>

<style scoped>

</style>
