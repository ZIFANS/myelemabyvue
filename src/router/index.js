import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    //name: 'index',
    //component: Index
    // 按需加载
    component: () => import('../views/index.vue'),
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('../views/Order.vue')
      },
      {
        path: '/me',
        name: 'me',
        component: () => import('../views/Me.vue')
      },
      {
        path: '/address',
        name: 'address',
        component: () => import('../views/Address.vue')
      },
      {
        path: '/city',
        name: 'city',
        component: () => import('../views/City.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/shop',
    name: 'shop',
    redirect: '/goods',
    component: () => import('../views/Shops/Shop.vue'),
    children: [
      {
        path: '/goods',
        name: 'goods',
        component: () => import('../views/Shops/Goods.vue')
      },
      {
        path: '/comments',
        name: 'comments',
        component: () => import('../views/Shops/Comments.vue')
      },
      {
        path: '/seller',
        name: 'seller',
        component: () => import('../views/Shops/Seller.vue')
      }
    ]
  }
]

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
