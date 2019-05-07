<template>
  <div id="app">
    <h1>Reversi</h1>
    <plateau/>
    <dashboard/>
  </div>
</template>

<script>
import Plateau from './components/Plateau'
import Dashboard from './components/Dashboard'

export default {
  name: 'App',
  components: {
    Plateau,
    Dashboard
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
h1 {
  text-align: center;
}
</style>