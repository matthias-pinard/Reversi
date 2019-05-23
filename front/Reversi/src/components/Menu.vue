<template>
  <div class="menu">
      <img src="../assets/Reversi_logo3.jpg" id="main-img">
    <h1>{{ msg }}</h1>
    <div id="game-board"></div>
      <div id="current-player">Players : <span id="current-player-name"></span></div>
      <br />
      <div id="message"></div>
      <div id="console"></div>
      <div id="stats"></div>
      <div id="preference-pane">
        <div id="player-type-forms">
          <label>
            <img src="../assets/blue.png">
            Blue: <!-- Black: -->
            <select id="black-player-type" v-model="bSelected">
              <option value="Human" selected>Human </option>
              <option value="Computer">AI </option>
            </select>
          </label>
          &nbsp;&nbsp;&nbsp;
          <label>
            <img src="../assets/orange.png">
            Orange: <!-- White: -->
            <select id="white-player-type" v-model="wSelected">
              <option value="Human">Human </option>
              <option value="Computer" selected>AI </option>
            </select>
          </label>
          <br />
          <br />
          <label>
            Board size:
            <select id="board-size" v-model="sizeSelected">
              <option value="4">4x4</option>
              <option value="6">6x6</option>
              <option value="8" selected>8x8</option>
            </select>
          </label>
        </div>
        <br />
        <br />
        <button id="start-button" class="btn btn-primary" type="submit" @click='onclick(bSelected, wSelected, sizeSelected)'>Start a new game</button>
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
      wSelected: 'Computer',
      sizeSelected: '8'
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
#black-player-type, #white-player-type, #board-size {
    color: black;
    background: rgb(144,144,144);
    cursor: pointer;
}
#start-button{
    background-color: rgb(144,144,144);
    border: none;
    color: black;
    padding: 13px 25px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
}
#main-img {
  border: solid 2px rgb(144,144,144);
}
</style>
