import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '',
    component: Layout,
    children: [
      { path: '/', name: 'home', component: Home }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
