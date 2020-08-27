<template>
  <div id="app">
    <Universe/>
  </div>
</template>

<script>
import Universe from './components/Universe.vue'

export default {
  name: 'App',
  components: {
    Universe
  }
}
</script>

<style>

body {
  background-color: #6287ac;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
