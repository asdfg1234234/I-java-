import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView }
]

// hash 模式：无需服务端配置，dist 直接静态托管 / 双击打开也能用
export default createRouter({
  history: createWebHashHistory(),
  routes
})
