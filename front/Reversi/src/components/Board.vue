<template>
  <div class="menu">
    <h1>{{ msg }}</h1>
    <h2>Noir : {{ this.black }} &nbsp;&nbsp;&nbsp; Blanc : {{ this.white }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Board',
  data: function () {
    return {
      msg: 'Test Board'
    }
  },
  props: {
    black: { type: String },
    white: { type: String }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: bold;
}
</style>
