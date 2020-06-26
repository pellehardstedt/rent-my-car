<template>
  <div class="all">
    <h1> Sign up here </h1>
    <form class="review-form" @submit.prevent="sendPost">
      <p>
        <label for="username">Username:</label>
        <input id="username" v-model="username" placeholder="username">
      </p>
      <p>
        <label for="email">Email:</label>
        <input id="email" v-model="email" placeholder="email">
      </p>

      <p>
        <label for="password">Password:</label>
        <input id="password" v-model="password">
      </p>


      <p>
        <input type="submit" value="Submit">
      </p>
      </form>

  </div>
</template>

<script>

const axios = require('axios');

export default {
  name: 'Signup',
  props: {},
  data() {
    return {
      username: null,
      email: null,
      password: null
    }
  },
  methods: {
    async sendPost() {
      let ok = await axios.post("/api/auth/signup", {username: this.username, email: this.email, password: this.password})
      this.new = ok.statusText
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
