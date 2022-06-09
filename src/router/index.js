import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import auth from '@/middleware/auth'
import CustomerList from '../components/Customers.vue'
import AppDashboard from '../components/Dashboard.vue'
import LoginPage from '../components/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: AppDashboard,
    meta: {
     middleware: [auth],
     },
  },
  {
    path: '/customers',
    name: 'customerlist',
    component: CustomerList,
    meta: {
      middleware: auth,
      },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
