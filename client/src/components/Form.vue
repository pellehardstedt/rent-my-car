<template>
  <div>
    <form @submit.prevent="getUser">
      <h1>This is the form</h1>
      <div>Get user: </div>
      <div>{{this.name}}</div>
      <button>
        GET
      </button>
    </form>
    <button v-on:click="sendPost">POST</button>
    <div>{{this.new}}</div>
  </div>
</template>

<script>

const axios = require('axios');

export default {
  name: 'Form',
  data: () => ({
    name: "poqekt",
    new: ""
  }),
  props: [],
  methods: {
    async getUser() {
      this.name = await axios.get("http://localhost:8080/api/users/pelle")
    },
    async sendPost() {
      this.new = await axios.post("http://localhost:8080/api/users/newnewnewn")
    }
  }
}
</script>
