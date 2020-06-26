<template>
  <div class="all">
    <h1> Login </h1>

    <p>
      <label for="username"></label>
      <input id="username" v-model="username" placeholder="username">
    </p>

    <p>
      <label for="password"></label>
      <input id="password" v-model="password" placeholder="password">
    </p>
    <button>Login</button>
    <router-link to="/home">
      <button>Home</button>
    </router-link>
    <br><br/>
    <h2>Sign Up Here</h2>
    <router-link to="/signup">
      <button>Sign Up</button>
    </router-link>
  </div>
</template>

<script>

const axios = require('axios');

export default {
  name: 'Login',
  props: {},
  data() {
    return {
      username: null,
      password: null
    }
  },
  methods: {
    async loginPOST() {
      await axios.post("/api/auth/signin", {username: this.username, password: this.password})

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.all {
  margin: 40px;
}
</style>
