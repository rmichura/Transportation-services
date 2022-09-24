<template>
  <v-carousel
      cycle
      hide-delimiter-background
      show-arrows-on-hover
      height="100vh"
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
          src: 'https://cdn.pixabay.com/photo/2017/08/24/16/07/truck-2677373_960_720.jpg',
        },
        {
          src: 'https://cdn.pixabay.com/photo/2017/09/16/11/11/truck-2755172_960_720.jpg',
        },
        {
          src: 'https://cdn.pixabay.com/photo/2016/11/29/01/36/cloudy-1866581_960_720.jpg',
        },
      ],
    }
  },
}
</script>
