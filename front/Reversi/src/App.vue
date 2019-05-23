<template>
  <div id="app">
    <Menu v-if="state === 0" :onclick="play"></Menu>
    <Board v-if="state ===1" :blackPlayer="blackPlayer" :whitePlayer="whitePlayer" :boardSize="boardSize"></Board>
  </div>
</template>

<script>
import Menu from './components/Menu'
import Board from './components/Board'

export default {
  name: 'App',
  components: {
    Menu,
    Board
  },
  data: function () {
    return {
      state: 0,
      blackPlayer: '',
      whitePlayer: '',
      boardSize: 8
    }
  },
  methods: {
    play: function (black, white, size) {
      this.blackPlayer = black
      this.whitePlayer = white
      this.boardSize = Number(size)
      this.state = 1
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(144,144,144);
  margin-top: 60px;
}
body {
  background-color: rgb(35,35,35);
}
</style>
