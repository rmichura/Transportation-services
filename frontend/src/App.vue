<template>
  <v-app>
    <navigator-bar/>
    <v-main class="color-main">
      <router-view/>
    </v-main>
    <the-footer/>
  </v-app>
</template>

<script>
import NavigatorBar from "@/components/NavigatorBar";
import TheFooter from "@/components/TheFooter";

export default {
  name: 'App',

  components: {
    TheFooter,
    NavigatorBar

  },

  data: () => ({
    //
  }),
};
</script>
<style scoped>
.color-main {
  background-color: #fafafa;
}
</style>
