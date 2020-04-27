<template>
  <div id="app">
    <CrudForm/>
  </div>
</template>

<script>
import CrudForm from './components/Form.vue'

export default {
  name: 'App',
  components: {
    CrudForm
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
