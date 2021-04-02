<template>
  <div class="products container">
    <h1 class="h1">Products</h1>
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

    if (!productList.value.length) {
      store.dispatch('products/getProductList')
    }

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
      gap: 30px 10px;
      grid-auto-rows: 1fr;
      grid-template-columns: 1fr;
      list-style: none;
      padding: 0;

      @media screen and (min-width: 1024px) {
        gap: 20px 20px;
        grid-template-columns: repeat(3, 1fr [col]);
      }
    }
  }
</style>
