import { createRouter, createWebHashHistory } from 'vue-router'
import Products from '../views/Products.vue'

const routes = [
  {
    path: '/',
    name: 'Products',
    component: Products
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue')
  },
  {
    path: '/success',
    name: 'Success',
    component: () => import(/* webpackChunkName: "success" */ '../views/Success.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
