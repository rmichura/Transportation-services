<template>
  <v-carousel
      cycle
      hide-delimiter-background
      show-arrows-on-hover
      height="90vh"
  >
    <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
    >
      <v-row
          class="fill-height"
          align="center"
          justify="center"
      >
        <div class="text-h5 white--text text-center"
        >
          ------ FAST AND SAFE ------
          <div class="text-h3 white--text">Transportation services</div>
        </div>
      </v-row>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    auth() {
      return this.$store.getters.isAuth;
    }
  },
  data() {
    return {
      items: [
        {
          src: 'http://127.0.0.1:8887/frontend/src/assets/truck-2677373_960_7202.jpg'
        },
        {
          src: 'http://127.0.0.1:8887/frontend/src/assets/truck-2755172_960_7202.jpg',
        },
        {
          src: 'http://127.0.0.1:8887/frontend/src/assets/cloudy-1866581_960_7202.jpg',
        },
      ],
    }
  },
}
</script>
