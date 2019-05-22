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
            <select id="black-player-type" v-model="bSelected">
              <option value="Human" selected>Human </option>
              <option value="Computer">AI </option>
            </select>
          </label>
          &nbsp;&nbsp;&nbsp;
          <label>
            <img src="../assets/white.png">
            White:
            <select id="white-player-type" v-model="wSelected">
              <option value="Human">Human </option>
              <option value="Computer" selected>AI </option>
            </select>
          </label>
        </div>
        <br />
        <button id="start-button" class="btn btn-primary" type="submit" @click='onclick(bSelected, wSelected)'>Start a new game</button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data: function () {
    return {
      msg: 'Reversi',
      bSelected: 'Human',
      wSelected: 'Computer'
    }
  },
  props: {
    onclick: { type: Function }
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
