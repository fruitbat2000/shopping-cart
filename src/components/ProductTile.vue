<template>
  <div class="product" :class="{'product--unavailable' : product.stockLevel <= 0}">
    <span v-if="product.stockLevel < 10 && product.stockLevel > 0" class="product__low-stock">Hurry! Only {{ product.stockLevel }} left! &#128293;</span>
    <span v-if="product.stockLevel <= 0" class="product__low-stock">Out of stock</span>
    <h2 class="h2">{{ product.name }}<span v-if="product.size"> ({{ product.size }})</span></h2>
    <p class="product__price">{{ currency(product.price) }}</p>
    <button @click="addToCart(product)" class="btn btn--primary" :disabled="product.stockLevel <= 0" :class="{'btn--disabled' : product.stockLevel <= 0}">Add to Cart</button>
    <span v-if="numberInCart" class="product__in-cart">{{numberInCart}} in cart</span>
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
  @import '@/assets/sass/variables';

  .product {
    background: $white;
    border: 1px solid $secondaryLight;
    border-radius: 3px;
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
    padding: 30px 15px;
    position: relative;

    &--unavailable {
      background: $secondaryLight;
      color: $secondary;

      .product__low-stock {
        color: $black;
      }
    }

    &__price {
      margin-bottom: 30px;
    }

    &__low-stock {
      font-size: 1.2rem;
      position: absolute;
      right: 8px;
      top: 8px;
    }

    &__in-cart {
      display: inline-block;
      font-size: 1.2rem;
      margin-left: 20px;
    }
  }
</style>
