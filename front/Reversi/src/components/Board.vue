<template>
  <div>
    <div class="board-container">
      <div class="board">
        <div v-for="(row, x) in board" :key="x">
          <div
            class="cell"
            v-for="(cell, y) in row"
            :key="y"
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
import Reversi from "../../../../logic/built/reversi";
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
    const rev = require("../../../../logic/built/reversi").Reversi;
    this.reversi = new rev(8);
    this.board = this.reversi.board.slice();
    this.displayPossibleMovement();
  },

  methods: {
    play(x, y) {
      const playable = this.possibilies.find(function(element) {
        return element.x === x && element.y === y;
      });
      this.reversi.play(playable, this.currentPlayer)
      this.board = this.reversi.board.slice();
      this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
      this.displayPossibleMovement()
    },

    displayPossibleMovement() {
      this.possibilies = this.reversi.get_possible_movement(this.currentPlayer).slice();
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
