<template>
  <div class="cart container">
    <h1 class="h1">Your Basket</h1>
    <p class="body">Items you have added to your basket are shown below. Adjust the quantities or remove items before continuing purchase.</p>
    <p v-if="!cart || cart.length < 1" class="cart__empty body">You have nothing in your cart currently. <router-link to="/">Go to Products</router-link>?</p>
    <div v-else>
      <ul class="cart__list">
        <li v-for="(item, i) in cart" :key="i">
          <cart-item :item="item" :ref="el => { if (el) rows[i] = el }"></cart-item>
        </li>
      </ul>
      <dl>
        <dt>Subtotal</dt>
        <dd>{{ currency(subtotal) }}</dd>
        <dt>VAT at 20%</dt>
        <dd>{{ currency(vat) }}</dd>
        <dt>Total cost</dt>
        <dd>{{ currency(subtotal + vat) }}</dd>
      </dl>
      <button @click="checkout" class="cart__checkout btn btn--primary" :class="{'cart__checkout--disabled' : !formValid}" :disabled="!formValid">Buy now</button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref, onBeforeUpdate, watchEffect } from 'vue'
import { currency } from '@/composables/currency'
import CartItem from '@/components/CartItem.vue'

export default {
  name: 'Cart',
  components: {
    CartItem
  },
  setup () {
    const store = useStore()
    const rows = ref([])
    const formValid = ref(true)
    const cart = computed(() => store.state.cart.cart)
    const productList = computed(() => store.state.products.productList)

    if (!productList.value.length) {
      store.dispatch('products/getProductList')
    }

    const subtotal = computed(() => {
      let total = 0
      cart.value.forEach(item => {
        total += item.price * item.quantity
      })
      return total
    })

    const vat = computed(() => {
      return subtotal.value / 100 * 20
    })

    watchEffect(() => {
      let valid = true
      rows.value.forEach(row => {
        if (!row.valid) {
          valid = false
        }
      })

      formValid.value = valid
    }, { flush: 'post' })

    const checkout = () => {
      store.dispatch('cart/checkout').then(() => {
        store.dispatch('cart/clearCart')
        console.log('checkout complete, navigate to thank-you page')
      })
    }

    onBeforeUpdate(() => {
      rows.value = []
    })

    return {
      cart,
      subtotal,
      vat,
      rows,
      formValid,
      currency,
      checkout
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/sass/variables';

  .cart {
    &__list {
      list-style: none;
      margin: 40px 0;
      padding: 0;
    }
  }
</style>
