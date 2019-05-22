<template>
  <div>
    <div class="board-container">
      <div class="board">
        <div v-for="(row, x) in board" :key="row">
          <div
            class="cell"
            v-for="(cell, y) in row"
            :key="cell"
            :class="{ playable: checkPlayable(x, y) }"
            @click="play(x, y)"
          >
            <jeton :color="cell" v-if="cell !== 0"></jeton>
          </div>
        </div>
      </div>
    </div>

    <Score :current_player="currentPlayer" :scoreNoir="scoreNoir" :scoreBlanc="scoreBlanc"></Score>
  </div>
</template>

<script>
import Reversi from "../reversi.js";
import Jeton from "./Jeton";
import Score from "./Score";

const BLANK = 0;
const BLACK = 1;
const WHITE = 2;

export default {
  data: function() {
    return {
      reversi: null,
      currentPlayer: 1,
      possibilies: [],
      board: [],
      scoreNoir: 2,
      scoreBlanc: 2
    };
  },

  mounted: function() {
    const rev = require("../reversi").Reversi;
    this.reversi = new rev(8);
    this.board = this.reversi.board.slice();
    this.displayPossibleMovement();
  },

  methods: {
    play(x, y) {
      const playable = this.possibilies.find(function(element) {
        return element.x === x && element.y === y;
      });
      console.log(playable);
      //this.reversi.play({x: 1, y: 1}, this.currentPlayer)
      this.board[x][y] = this.currentPlayer;
      this.board = this.board.slice();
      console.log(this.board);
      this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
      if (this.currentPlayer === 2) {
          this.scoreNoir++
      }
      else {
          this.scoreBlanc++ 
      }
    },

    displayPossibleMovement() {
      this.possibilies = this.reversi.get_possible_movement(this.currentPlayer);
    },

    checkPlayable: function(x, y) {
      const playable = this.possibilies.find(function(element) {
        return element.x === x && element.y === y;
      });
      return playable;
    }
  },

  components: {
    Jeton,
    Score
  }
};
</script>


<style src="@/style/board.css"></style>
