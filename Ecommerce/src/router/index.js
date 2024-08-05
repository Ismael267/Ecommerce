import { createRouter, createWebHistory } from 'vue-router'

import CartView from '../views/CartView.vue'
import CheckoutView from '@/views/CheckoutView.vue'
import ProductsView from "../views/ProductsView.vue"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'products',
      component:ProductsView
    },

    {
      path: '/cart',
      name: 'cart',
      component: CartView,
     
    },
    {
      path: '/checkout',
      name: 'checkout',
      component:CheckoutView
    
      
     
    }

  ]
})

export default router
