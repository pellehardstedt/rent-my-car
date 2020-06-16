import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'

import Login from './components/Login.vue'
import Search from './components/Search.vue'
import Signup from './components/Signup.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Login },
  { path: '/home', component: Search },
  { path: '/signup', component: Signup }
]

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

new Vue({
  el: '#app',
    router,
  render: h => h(App)
});
