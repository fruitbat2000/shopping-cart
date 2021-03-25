<template>
  <div class="products">
    <h1>Products</h1>
    <ul class="product-list">
      <li v-for="(product, i) in productList" :key="i"  :class="{'product--unavailable' : product.stockLevel <= 0}">
        <product-tile :product="product"></product-tile>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import ProductTile from '@/components/ProductTile.vue'

export default {
  name: 'Products',
  components: {
    ProductTile
  },
  setup () {
    const store = useStore()
    const productList = computed(() => store.state.products.productList)

    store.dispatch('products/getProductList')

    return {
      productList
    }
  }
}
</script>

<style lang="scss" scoped>
  .products {
    .product-list {
      display: grid;
      grid-template-columns: 1fr;

      @media screen and (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr [col]);
      }
    }
  }
</style>
