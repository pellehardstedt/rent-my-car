<template>
  <div class="all">
    <input v-on:keyup="getUser" v-model="message" placeholder="Search">
    <br/>
    <li v-for="item in this.result" :key="item.name"> {{ item.name }}</li>

    <div>Get all users: </div>
    <li v-for="item in this.items" :key="item.name"> {{ item.name }}</li>

    <button v-on:click="getAllUsers">
      Get All Users
    </button>
    <br/>
    <br/>
    <input v-model="newUser" placeholder="Input new user">
    <button v-on:click="sendPost">Post new username</button>
    <div>{{this.new}}</div>
  </div>
</template>

<script>

const axios = require('axios');

export default {
  name: 'Form',
  data: () => ({
    message: "",
    result: [],
    new: "",
    items: []
  }),
  props: [],
  methods: {
    async getUser() {
      if(this.message === "") {
        this.result = []
      } else {
        let url = "http://localhost:8080/api/user/" + this.message
        let gotResult = await axios.get(url)
        this.result = gotResult.data
      }
    },
    async getAllUsers() {
      let list = await axios.get("http://localhost:8080/api/user/")
      this.items = list.data
    },
    async sendPost() {
      let url = "http://localhost:8080/api/user/" + this.newUser
      let ok = await axios.post(url)
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
