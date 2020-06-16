<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
// import Login from './components/Login.vue'
// import Search from './components/Search.vue'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
    // Login,
    // Search
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
