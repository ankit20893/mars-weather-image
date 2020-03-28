<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/Weather.jpg" width="400" height="400">
    <HelloWorld msg="Welcome to Image & Weather App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Vue from 'vue'
import { BContainer, LayoutPlugin } from 'bootstrap-vue'
import { BPagination } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import VueAxios from 'vue-axios'



Vue.component('b-container', BContainer)
Vue.component('b-pagination', BPagination)
Vue.use(LayoutPlugin)
Vue.use(VueAxios, axios)

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
