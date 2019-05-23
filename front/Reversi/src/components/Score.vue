<template>
  <div class="dashboard">
    <h1>Score</h1>
    <div class="score_container">
      <div v-if="winner !== 'Blue'">
        <h2 class="current_player_1">Blue</h2>
        <div class="score_player">{{ scoreNoir }}</div>
      </div>
      <div v-else>
        <h2 class="current_player_1_win">Blue</h2>
        <div class="score_player">{{ scoreNoir }}</div>
      </div>
      <div v-if="(this.winner !== '') && (this.equality === false)">
        <img src="../assets/52183.gif">
        <h3>Winner : {{ this.winner }}</h3>
      </div>
      <div v-else-if="this.equality === true">
        <h3>Draw</h3>
      </div>
      <div v-if="winner !== 'Orange'">
        <h2 class="current_player_2">Orange</h2>
        <div class="score_player">{{ scoreBlanc }}</div>
      </div>
      <div v-else>
        <h2 class="current_player_2_win">Orange</h2>
        <div class="score_player">{{ scoreBlanc }}</div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
    props: {
        current_player: { type: Number },
        scoreNoir: { type: Number },
        scoreBlanc: { type: Number },
        blackPlayer: { type: String },
        whitePlayer: { type: String },
        winner: { type: String },
        equality: { type: Boolean }
    }
};
</script>

<style src="@/style/score.css"></style>
