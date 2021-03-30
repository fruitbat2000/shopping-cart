<template>
  <div class="cart">
    <p v-if="!cart || cart.length < 1" class="cart__empty">You have nothing in your cart currently. <router-link to="/">Go to Products</router-link>?</p>
    <div v-else>
      <ul class="cart__list">
        <li v-for="(item, i) in cart" :key="i">
          <cart-item :item="item"></cart-item>
        </li>
      </ul>
      <button class="cart__checkout">Checkout</button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import CartItem from '@/components/CartItem.vue'

export default {
  name: 'Cart',
  components: {
    CartItem
  },
  setup () {
    const store = useStore()
    const cart = computed(() => store.state.cart.cart)
    const productList = computed(() => store.state.products.productList)

    if (!productList.value.length) {
      store.dispatch('products/getProductList')
    }

    return {
      cart
    }
  }
}
</script>
