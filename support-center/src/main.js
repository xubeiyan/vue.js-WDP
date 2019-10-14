import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import AppLayout from './components/AppLayout.vue'
import './global-components'
import VueFetch from './plugins/fetch'
import VueState from './plugins/state'
import state from './state'

Vue.use(VueRouter)
Vue.use(VueFetch, {
  baseUrl: "http://localhost:3000/",
})
Vue.use(VueState, state)

new Vue({
  el: '#app',
  data: state,
  render: h => h(AppLayout),
  // 将路由提供给应用
  router
});


