<template>
  <div id="app">
    <GMap />
  </div>
</template>

<script>
// import VMap from './components/VMap'
import GMap from './components/GMap';

export default {
  name: 'App',
  components: {
    GMap,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
