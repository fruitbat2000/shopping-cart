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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
