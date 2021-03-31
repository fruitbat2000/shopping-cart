<template>
  <div class="cart-item" :class="{'cart-item--unavailable' : product.stockLevel <= 0}">
    <h2 class="h3 cart-item__name">
      {{ product.name }}
      <span v-if="product.size">, {{ product.size }}</span>
      <span v-else>, one size</span>
    </h2>
    <dl>
      <dt>Price</dt>
      <dd>{{currency(product.price) }}</dd>
      <dt>Quantity</dt>
      <dd>
        <quantity-field ref="quantity" :value="item.quantity" :max-quantity="product.stockLevel" @quantity-field::update="updateQuantity"></quantity-field>
      </dd>
      <dt>Cost</dt>
      <dd>{{ currency(product.price * item.quantity) }}</dd>
      <dt>Remove</dt>
      <dd>
        <button class="cart-item__remove" @click="remove">
          <delete-icon :fill-color="`#448AFF`" />
        </button>
      </dd>
    </dl>
    <p v-if="product.stockLevel <= 0" class="cart-item__stock-warning">Sorry, this item is now out of stock. <a href="#" @click="remove">Remove</a> to continue</p>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { currency } from '@/composables/currency'
import QuantityField from '@/components/QuantityField.vue'
import DeleteIcon from '@/components/svgs/Delete.vue'

export default {
  name: 'CartItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  components: {
    QuantityField,
    DeleteIcon
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
      store.dispatch('cart/removeFromCart', props.item)
    }

    const updateQuantity = (int) => {
      if (quantity.value.valid && int !== props.item.quantity) {
        store.dispatch('cart/updateQuantity', { item: props.item, quantity: int })
      }
    }

    watchEffect(() => {
      valid.value = quantity.value.valid
    }, { flush: 'post' })

    return {
      product,
      remove,
      updateQuantity,
      quantity,
      valid,
      currency
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/sass/variables';

  .cart-item {
    display: block;

    @media screen and (min-width: $bp-md) {
      display: flex;
      justify-content: space-between;
    }

    &__name {
      border-bottom: 2px solid $secondaryLight;
      margin-bottom: 10px;
      padding: 10px 0;

      @media screen and (min-width: $bp-md) {
        border-bottom: none;
        min-width: 30%;
      }
    }

    dl {
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      dt {
        align-items: center;
        display: flex;
        font-weight: 500;
        height: 30px;
        min-width: 45%;

        @media screen and (min-width: $bp-md) {
          display: none;
        }
      }

      dd {
        align-items: center;
        display: flex;
        font-weight: 200;
        height: 30px;
        justify-content: flex-end;
        margin: 0;
        min-width: 45%;
      }

      @media screen and (min-width: $bp-md) {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: 100%;
        min-width: 65%;
      }
    }

    &__remove {
      background: none;
      border: none;
      box-shadow: none;
      outline: 0;
    }
  }
</style>
