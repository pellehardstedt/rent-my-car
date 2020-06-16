<template>
  <div class="all">
    <h1> Login </h1>
    <router-link to="/home">
      <button>Login</button>
    </router-link>
    <br><br/>
    <h2>Sign Up Here</h2>
    <router-link to="/signup">
      <button>Sign Up</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.all {
  margin: 40px;
}
</style>
