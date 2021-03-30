<template>
  <div class="product" :class="{'product--unavailable' : product.stockLevel <= 0}">
    <span v-if="product.stockLevel < 10 && product.stockLevel > 0" class="product__low-stock">Hurry! Only {{ product.stockLevel }} left!</span>
    <h2>{{ product.name }}<span v-if="product.size"> ({{ product.size }})</span></h2>
    <p class="product__price">{{ currency(product.price) }}</p>
    <button @click="addToCart(product)">Add to Cart</button>
    <span v-if="numberInCart">{{numberInCart}} in cart</span>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { currency } from '@/composables/currency'

export default {
  name: 'ProductTile',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const store = useStore()
    const cart = computed(() => store.state.cart.cart)

    const numberInCart = computed(() => {
      const inCart = cart.value.find(prod => prod.sku === props.product.sku)
      return inCart ? inCart.quantity : null
    })

    const addToCart = (product) => {
      store.dispatch('cart/addToCart', product)
    }

    return {
      addToCart,
      numberInCart,
      currency
    }
  }
}
</script>

<style lang="scss" scoped>
  .product {
    &--unavailable {
      background: #999;
    }
  }
</style>
