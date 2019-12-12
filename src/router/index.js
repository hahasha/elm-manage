import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/page/login'
import Manage from '@/page/manage'
import UserList from '@/page/userList'
import SellerList from '@/page/sellerList'
import FoodList from '@/page/foodList'
import OrderList from '@/page/orderList'
import AdminList from '@/page/adminList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/manage',
    name: 'Manage',
    component: Manage
  },
  {
    path: '/manage/userList',
    name: 'UserList',
    component: UserList
  },
  {
    path: '/manage/sellerList',
    name: 'SellerList',
    component: SellerList
  },
  {
    path: '/manage/foodList',
    name: 'FoodList',
    component: FoodList
  },
  {
    path: '/manage/orderList',
    name: 'OrderList',
    component: OrderList
  },
  {
    path: '/manage/adminList',
    name: 'AdminList',
    component: AdminList
  }
]

const router = new VueRouter({
  routes
})

export default router
