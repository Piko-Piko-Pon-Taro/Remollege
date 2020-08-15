import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$api = axios.create({
  baseURL: 'http://localhost:3000/'
})
