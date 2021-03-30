<template>
  <div class="cart-item" :class="{'cart-item--unavailable' : product.stockLevel <= 0}">
    {{ product.name }}
    <dl>
      <dt>Price</dt>
      <dd>{{ product.price }}</dd>
      <dt>Quantity</dt>
      <dd>
        <quantity-field ref="quantity" :value="item.quantity" :max-quantity="product.stockLevel" @quantity-field::update="updateQuantity"></quantity-field>
      </dd>
      <dt>Cost</dt>
      <dd>{{ product.price * item.quantity }}</dd>
      <dt>Remove</dt>
      <dd>
        <button class="cart-item__remove" @click="remove">Remove</button>
      </dd>
    </dl>
    <p v-if="product.stockLevel <= 0" class="cart-item__stock-warning">Sorry, this item is now out of stock. <a href="#" @click="remove">Remove</a> to continue</p>
  </div>
</template>

<script>
import { computed, ref, watchEffect, onMounted } from 'vue'
import { useStore } from 'vuex'
import QuantityField from '@/components/QuantityField.vue'

export default {
  name: 'CartItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  components: {
    QuantityField
  },
  setup (props) {
    const store = useStore()
    const quantity = ref(null)
    const valid = ref(null)
    const productList = computed(() => store.state.products.productList)
    const product = computed(() => {
      return productList.value.find(prod => prod.sku === props.item.sku)
    })

    const remove = () => {
      console.log('remove item')
      store.dispatch('cart/removeFromCart', props.item)
    }

    const updateQuantity = (int) => {
      if (quantity.value.valid && int !== props.item.quantity) {
        store.dispatch('cart/updateQuantity', { item: props.item, quantity: int })
      }
    }

    onMounted(() => {
      watchEffect(() => {
        valid.value = quantity.value.valid
      }, { flush: 'post' })
    })

    return {
      product,
      remove,
      updateQuantity,
      quantity,
      valid
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
