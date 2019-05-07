<template>
  <div class="menu">
    <img src="../assets/Reversi_logo2.jpg">
    <h1>{{ msg }}</h1>
    <div id="game-board"></div>
      <div id="current-player">Player: <span id="current-player-name"></span></div>
      <br />
      <div id="message"></div>
      <div id="console"></div>
      <div id="stats"></div>
      <div id="preference-pane">
        <div id="player-type-forms">
          <label>
            <img src="../assets/black.png">
            Black:
            <select id="black-player-type">
              <option value="human" selected>Human</option>
              <option value="computer">AI </option>
            </select>
          </label>
          &nbsp;&nbsp;&nbsp;
          <label>
            <img src="../assets/white.png">
            White:
            <select id="white-player-type">
              <option value="human">Human</option>
              <option value="computer" selected>AI </option>
            </select>
          </label>
        </div>
        <br />
        <button id="start-button" class="btn btn-primary" type="submit" @click='onclick'>Start a new game</button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      msg: 'Reversi'
    }
  },
  props: {
      onclick: { type:Function }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: bold;
}
#black-player-type, #white-player-type {
    color: rgb(144,144,144);
    background: rgb(35,35,35)
}
#start-button{
    color: rgb(144,144,144);
    background: rgb(35,35,35)
}
</style>
