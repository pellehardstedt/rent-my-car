<template>
 <div class="background">
   <h3>Header</h3>
 </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.background {
  background-color: #42b983;
}
h3 {
  margin: 40px;
}
</style>
