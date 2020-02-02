import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index'
import Home from '../views/Home'
import Order from '../views/Order'
import Me from '../views/Me'
import Address from '../views/Address'
import City from '../views/City'
import Login from '../views/Login'
import Search from '../views/Search'
import Shop from '../views/Shops/Shop'
import Goods from '../views/Shops/Goods'
import Comments from '../views/Shops/Comments'
import Seller from '../views/Shops/Seller'
import MyAddress from '../views/Orders/MyAddress'
import AddAddress from '../views/Orders/AddAddress'
import Settlement from '../views/Orders/Settlement'
import Remark from '../views/Orders/Remark'
import Pay from '../views/Orders/Pay'
import OrderInfo from '../views/Orders/OrderInfo'
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    //name: 'index',
    //component: Index
    // 按需加载
    //component: () => import('../views/index.vue'),
    component: Index,
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: '/home',
        name: 'home',
        //component: () => import('../views/Home.vue')
        component: Home
      },
      {
        path: '/order',
        name: 'order',
        //component: () => import('../views/Order.vue')
        component: Order
      },
      {
        path: '/me',
        name: 'me',
        //component: () => import('../views/Me.vue')
        component: Me
      },
      {
        path: '/address',
        name: 'address',
        //component: () => import('../views/Address.vue')
        component: Address
      },
      {
        path: '/city',
        name: 'city',
        //component: () => import('../views/City.vue')
        component: City
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    //component: () => import('../views/Login')
    component: Login
  },
  {
    path: '/search',
    name: 'search',
    //component: () => import('../views/Search.vue')
    component: Search
  },
  {
    path: '/shop',
    name: 'shop',
    redirect: '/goods',
    //component: () => import('../views/Shops/Shop.vue'),
    component: Shop,
    children: [
      {
        path: '/goods',
        name: 'goods',
        //component: () => import('../views/Shops/Goods.vue')
        component: Goods
      },
      {
        path: '/comments',
        name: 'comments',
        //component: () => import('../views/Shops/Comments.vue')
        component: Comments
      },
      {
        path: '/seller',
        name: 'seller',
        //component: () => import('../views/Shops/Seller.vue')
        component: Seller
      }
    ]
  },
  {
    path: '/myAddress',
    name: 'myAddress',
    //component: () => import('../views/Orders/MyAddress.vue')
    component: MyAddress
  },
  {
    path: '/addAddress',
    name: 'addAddress',
    //component: () => import('../views/Orders/AddAddress.vue')
    component: AddAddress
  },
  {
    path: '/settlement',
    name: 'settlement',
    //component: () => import('../views/Orders/Settlement.vue')
    component: Settlement
  },
  {
    path: '/remark',
    name: 'remark',
    //component: () => import('../views/Orders/Remark.vue')
    component: Remark
  },
  {
    path: '/pay',
    name: 'pay',
    //component: () => import('../views/Orders/Pay.vue')
    component: Pay
  },
  {
    path: '/orderInfo',
    name: 'orderInfo',
    //component: () => import('../views/Orders/OrderInfo.vue')
    component: OrderInfo
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes

  /*
  strict: true 如果设置了strict 为true ，则表示在严格模式下，
  在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。
  这能保证所有的状态变更都能被调试工具跟踪到
   */
})

export default router
