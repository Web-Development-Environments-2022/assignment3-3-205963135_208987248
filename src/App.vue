<template>
  <div
    id="app"
    :style="{
      'background-image': 'url(' + require('./assets/background.png') + ')',
    }"
  >
    <NavigationBar></NavigationBar>
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";
export default {
  name: "App",
  components: {
    NavigationBar,
  },
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: normal 400 16px/24px "Source Sans Pro", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  font-size:large;
}
</style>
