import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/layout'
import Article from '@/views/article'
import Publish from '@/views/publish'
import Material from '@/views/material'
import Comment from '@/views/comment'
import Setting from '@/views/setting'
import Echarts from '@/views/echarts'
import Fans from '@/views/fans'

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
      { path: '/', name: 'home', component: Home },
      { path: '/article', name: 'article', component: Article },
      { path: '/publish', name: 'publish', component: Publish },
      { path: '/material', name: 'material', component: Material },
      { path: '/comment', name: 'comment', component: Comment },
      { path: '/setting', name: 'setting', component: Setting },
      { path: '/echarts', name: 'echarts', component: Echarts },
      { path: '/fans', name: 'fans', component: Fans }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由导航拦截器 所有页面导航经过这里
// to
// from
// next: 放行方法
router.beforeEach((to, from, next) => {
  // console.log('我是导航守卫')
  // console.log(to)
  // console.log(from)
  // 如果不是登录页面 跳转到登录页面
  // 如果登录了 则允许通过
  // 允许通过
  // next() 只有这个猜允许通过
  const user = window.localStorage.getItem('user')
  if (to.path !== '/login') {
    if (user) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

/* 组件里使用的this.$router 就是这玩意儿  */
export default router
