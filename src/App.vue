<template>
  <div id="app">
    <TMap />
  </div>
</template>

<script>
// import VMap from './components/VMap'
// import GMap from './components/GMap';
import TMap from './components/TMap';

export default {
  name: 'App',
  components: {
    TMap,
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
