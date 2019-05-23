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

    <Score :current_player="currentPlayer" :scoreNoir="scoreNoir" :scoreBlanc="scoreBlanc" :blackPlayer="blackPlayer" :whitePlayer="whitePlayer" :winner="winner"></Score>
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
      scoreBlanc: 2,
      whiteBlocked: false,
      blackBlocked: false,
      highestScore: 0,
      winner: ""
    };
  },

  mounted: function() {
    const rev = require("../../../../logic/built/reversi").Reversi;
    this.reversi = new rev(this.boardSize);
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
      this.scoreNoir = this.reversi.get_score(1)
      this.scoreBlanc = this.reversi.get_score(2)
      this.displayPossibleMovement()
    },

    displayPossibleMovement() {
      this.possibilies = this.reversi.get_possible_movement(this.currentPlayer).slice()

      if (this.possibilies.length === 0 && this.currentPlayer === 1){
        if (this.whiteBlocked === true) {
          this.highestScore = Math.max(this.reversi.get_score(BLACK), this.reversi.get_score(WHITE))
          this.winner = (this.reversi.get_score(BLACK) === this.highestScore) ? "Noir" : "Blanc";
        }
        this.blackBlocked = true;
        this.currentPlayer = 2;
        if (!(this.blackBlocked && this.whiteBlocked)) {
          this.displayPossibleMovement();
        }
      } else if (this.possibilies.length === 0 && this.currentPlayer === 2){
        if (this.blackBlocked === true) {
          this.highestScore = Math.max(this.reversi.get_score(BLACK), this.reversi.get_score(WHITE))
          this.winner = (this.reversi.get_score(BLACK) === this.highestScore) ? "Noir" : "Blanc";
        }
        this.whiteBlocked = true;
        this.currentPlayer = 1;
        if (!(this.blackBlocked && this.whiteBlocked)) {
          this.displayPossibleMovement();
        }
      } else {
        this.blackBlocked = false;
        this.whiteBlocked = false;
      }
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
  },

  props: {
     boardSize: { type: Number },
     blackPlayer: { type: String },
     whitePlayer: { type: String }
  }
};
</script>


<style src="@/style/board.css"></style>
