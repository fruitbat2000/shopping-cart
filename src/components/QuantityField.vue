<template>
  <div class="quantity-field">
    <button @click="decrement" class="quantity-field__decrement">-</button>
    <input ref="quantityInput" @blur="checkValid" type="number" pattern="^\d+$" v-model="quant" min="1" :max="maxQuantity" maxlength="3" step="1" required />
    <button @click="increment" class="quantity-field__increment">+</button>
    <span v-if="errorMsg">{{ errorMsg }}</span>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'QuantityField',
  props: {
    value: {
      type: Number,
      required: true
    },
    maxQuantity: {
      type: Number,
      required: false,
      default: 50
    }
  },
  setup (props, { emit }) {
    const quantityInput = ref(null)
    const valid = ref(null)
    const quant = ref(props.value)
    const errorMsg = ref(null)

    const increment = () => {
      quantityInput.value.stepUp()
      quant.value = quantityInput.value.value
      checkValid()
    }

    const decrement = () => {
      quantityInput.value.stepDown()
      quant.value = quantityInput.value.value
      checkValid()
    }

    const checkValid = () => {
      valid.value = quantityInput.value.checkValidity()
      if (quantityInput.value.checkValidity()) {
        errorMsg.value = null
        emit('quantity-field::update', parseInt(quant.value))
      } else {
        errorMsg.value = quantityInput.value.validationMessage
      }
    }

    onMounted(() => {
      checkValid()
    })

    return {
      quantityInput,
      increment,
      decrement,
      valid,
      checkValid,
      quant,
      errorMsg
    }
  }
}
</script>

<style lang="scss" scoped>
  .quantity-field {
    input[type=number] {
      &:invalid {
        border-color: red;
      }
    }
  }
</style>
