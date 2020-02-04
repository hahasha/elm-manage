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
import UserDistribution from '@/page/userDistribution'
import TextEdit from '@/page/textEdit'
import Setting from '@/page/setting'
import Illustration from '@/page/illustration'
import Home from '@/page/home'

Vue.use(VueRouter)
// 重写push方法（解决两次push同一个地址报错的情况）
const orginalPush = VueRouter.prototype.push
VueRouter.prototype.push = function(location) {
  return orginalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/manage',
    component: Manage,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
        meta: []
      },
      {
        path: 'userList',
        name: 'UserList',
        component: UserList,
        meta: ['数据管理', '用户列表']
      },
      {
        path: 'shopList',
        name: 'shopList',
        component: shopList,
        meta: ['数据管理', '商家列表']
      },
      {
        path: 'foodList',
        name: 'FoodList',
        component: FoodList,
        meta: ['数据管理', '食品列表']
      },
      {
        path: 'orderList',
        name: 'OrderList',
        component: OrderList,
        meta: ['数据管理', '订单列表']
      },
      {
        path: 'adminList',
        name: 'AdminList',
        component: AdminList,
        meta: ['数据管理', '管理员列表']
      },
      {
        path: 'addShop',
        name: 'AddShop',
        component: AddShop,
        meta: ['添加数据', '添加商铺']
      },
      {
        path: 'addGoods',
        name: 'AddGoods',
        component: AddGoods,
        meta: ['添加数据', '添加商品']
      },
      {
        path: 'userDistribution',
        name: 'UserDistribution',
        component: UserDistribution,
        meta: ['图表', '用户分布']
      },
      {
        path: 'textEdit',
        name: 'TextEdit',
        component: TextEdit,
        meta: ['编辑', '文本编辑']
      },
      {
        path: 'setting',
        name: 'Setting',
        component: Setting,
        meta: ['设置', '管理员设置']
      },
      {
        path: 'illustration',
        name: 'Illustration',
        component: Illustration,
        meta: ['说明', '说明']
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
