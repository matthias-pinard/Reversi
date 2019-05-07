<template>
  <div id="app">
    <h1>Reversi</h1>
    <Plateau/>
  </div>
</template>

<script>
import Plateau from './components/Plateau'


export default {
  name: 'App',
  components: {
    Plateau,
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