<template>
  <div class="product" :class="{'product--unavailable' : product.stockLevel <= 0}">
    <h2>{{ product.name }}<span v-if="product.size"> ({{ product.size }})</span></h2>
    <p class="product__price">{{ product.price }}</p>
    <button @click="addToCart(product)">Add to Cart</button>
  </div>
</template>

<script>

export default {
  name: 'ProductTile',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup () {
    const addToCart = (product) => {
      console.log('addToCart', product)
    }

    return {
      addToCart
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
