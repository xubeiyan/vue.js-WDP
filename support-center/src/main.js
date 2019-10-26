import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import AppLayout from './components/AppLayout.vue'
import './global-components'
import VueFetch, { $fetch } from './plugins/fetch'
import VueState from './plugins/state'
import state from './state'
import * as filters from './filters'

for (const key in filters) {
  Vue.filter(key, filters[key])
}

Vue.use(VueRouter)
Vue.use(VueFetch, {
  baseUrl: "http://localhost:3000/",
})
Vue.use(VueState, state)

async function main() {
  // 获取用户信息
  try {
    state.user = await $fetch('user')
  } catch (e) {
    console.warn(e)
  }
  // 启动应用
  new Vue({
    el: '#app',
    data: state,
    router,
    render: h => h(AppLayout),
  })
}

main()