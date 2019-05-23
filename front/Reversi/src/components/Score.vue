<template>
  <div class="dashboard">
    <h1>Score</h1>
    <div class="score_container">
      <div>
        <h2 :class=" { current_player_1 : this.current_player === 1 }">Bleu</h2>
        <div class="score_player">{{ scoreNoir }}</div>
      </div>
      <div v-if="(this.winner !== '') && (this.equality === false)">
        <h3>Gagnant : {{ this.winner }}</h3>
      </div>
      <div v-else-if="this.equality === true">
        <h3>Egalité</h3>
      </div>
      <div>
        <h2 :class=" { current_player_2 : this.current_player === 2 }">Orange</h2>
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
