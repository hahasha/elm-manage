import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/page/login'
import Manage from '@/page/manage'
import UserList from '@/page/userList'
import shopList from '@/page/shopList'
import FoodList from '@/page/foodList'
import OrderList from '@/page/orderList'
import AdminList from '@/page/adminList'
import AddShop from '@/page/addShop'
import AddGoods from '@/page/addGoods'
import Home from '@/page/home'

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
    component: Manage,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: []
      },
      {
        path: '/userList',
        name: 'UserList',
        component: UserList,
        meta: ['数据管理', '用户列表']
      },
      {
        path: '/shopList',
        name: 'shopList',
        component: shopList,
        meta: ['数据管理', '商家列表']
      },
      {
        path: '/foodList',
        name: 'FoodList',
        component: FoodList,
        meta: ['数据管理', '食品列表']
      },
      {
        path: '/orderList',
        name: 'OrderList',
        component: OrderList,
        meta: ['数据管理', '订单列表']
      },
      {
        path: '/adminList',
        name: 'AdminList',
        component: AdminList,
        meta: ['数据管理', '管理员列表']
      },
      {
        path: '/addShop',
        name: 'AddShop',
        component: AddShop,
        meta: ['添加数据', '添加商铺']
      },
      {
        path: '/addGoods',
        name: 'AddGoods',
        component: AddGoods,
        meta: ['添加数据', '添加商品']
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
