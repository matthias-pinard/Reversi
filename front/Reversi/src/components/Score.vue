<template>
  <div class="dashboard">
    <h1>Score</h1>
    <div class="score_container">
      <div>
        <h2 :class=" { current_player : this.current_player === 1 }">Bleu</h2>
        <div class="score_player">{{ scoreNoir }}</div>
      </div>
      <div>
        <h2 :class=" { current_player : this.current_player === 2 }">Orange</h2>

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
        whitePlayer: { type: String }
    }
};
</script>

<style src="@/style/score.css"></style>
