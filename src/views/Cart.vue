<template>
  <div class="cart container">
    <h1 class="h1">Your Basket</h1>
    <p class="body">Items you have added to your basket are shown below. Adjust the quantities or remove items before continuing purchase.</p>
    <p v-if="!cart || cart.length < 1" class="cart__empty body">You have nothing in your cart currently. <router-link to="/">Go to Products</router-link>?</p>
    <div v-else>
      <div class="cart__grid-header">
        <p>Product</p>
        <div class="cart__grid-header__grid">
          <p>Price</p>
          <p>Quantity</p>
        </div>
      </div>
      <ul class="cart__list">
        <li v-for="(item, i) in cart" :key="i">
          <cart-item :item="item" :ref="el => { if (el) rows[i] = el }"></cart-item>
        </li>
      </ul>
      <dl class="cart__totals">
        <dt>Subtotal</dt>
        <dd>{{ currency(subtotal) }}</dd>
        <dt>VAT at 20%</dt>
        <dd>{{ currency(vat) }}</dd>
        <dt class="cart__grand-total">Total cost</dt>
        <dd class="cart__grand-total">{{ currency(subtotal + vat) }}</dd>
      </dl>
      <div class="cart__checkout">
        <button @click="checkout" class="btn btn--primary" :class="{'btn--disabled' : !formValid}" :disabled="!formValid">Buy now</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
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
    const router = useRouter()
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
        const product = productList.value.find(prod => prod.sku === item.sku)
        total += product.price * item.quantity
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

        router.push({
          name: 'Success'
        })
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
    &__grid-header {
      border-bottom: 2px solid $secondaryLight;
      display: none;
      font-weight: 500;
      justify-content: space-between;
      margin-top: 40px;

      > p {
        min-width: 30%;
      }

      @media screen and (min-width: $bp-md) {
        display: flex;
      }
    }

    &__grid-header__grid {
      display: grid;
      gap: 0 20px;
      grid-template-columns: 1fr 1.5fr 1fr 30px;
      min-width: 65%;

      p {
        align-items: center;
        display: flex;
        justify-content: flex-end;

        &:last-child {
          padding-right: 15px;
        }
      }
    }

    &__list {
      list-style: none;
      margin: 40px 0;
      padding: 0;

      @media screen and (min-width: $bp-md) {
        margin-top: 0;
      }
    }

    &__totals {
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: 25px;

      dt {
        align-items: center;
        display: flex;
        margin-bottom: 15px;
        min-width: 45%;
      }

      dd {
        align-items: center;
        display: flex;
        justify-content: flex-end;
        margin: 0 0 15px;
        min-width: 45%;
      }

      @media screen and (min-width: $bp-md) {
        margin-right: 50px;
      }
    }

    &__grand-total {
      font-weight: 500;
    }

    &__checkout {
      text-align: right;

      @media screen and (min-width: $bp-md) {
        padding-right: 50px;
      }
    }
  }
</style>
