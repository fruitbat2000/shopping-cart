<template>
  <div class="cart-item">
    {{ item.name }}
    <dl>
      <dt>Price</dt>
      <dd>{{ item.price }}</dd>
      <dt>Quantity</dt>
      <dd>{{ item.quantity }}</dd>
      <dt>Cost</dt>
      <dd>{{ item.price * item.quantity }}</dd>
      <dt>Remove</dt>
      <dd>
        <button class="cart-item__remove">Remove</button>
      </dd>
    </dl>
  </div>
</template>

<script>

export default {
  name: 'CartItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
</style>
