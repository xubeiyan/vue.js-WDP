import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import FAQ from './components/FAQ.vue'
import Login from './components/Login.vue'

const routes = [
    // 路由放在这里
    { path: '/', name: 'home', component: Home },
    { path: '/faq', name: 'faq', component: FAQ },
    { path: '/login', name: 'login', component: Login },
]

const router = new VueRouter({
    routes,
})

export default router