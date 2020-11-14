import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入饿了吗组件及样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import 'normalize.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
  // 等价 el:'app'
}).$mount('#app')
