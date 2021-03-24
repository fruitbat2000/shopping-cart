<template>
  <div class="products">
    Product List
    <ul>
      <li v-for="(product, i) in productList" :key="i">{{ product.name }} {{ product.price }}</li>
    </ul>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Products',
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
