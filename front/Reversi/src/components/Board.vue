<template>
  <div class="menu">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Board',
  data () {
    return {
      msg: 'test board'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: bold;
}
</style>
