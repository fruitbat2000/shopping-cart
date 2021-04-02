<template>
  <div class="quantity-field">
    <div class="quantity-field__input-grp">
      <button @click="decrement" class="quantity-field__btn quantity-field__decrement">-</button>
      <input ref="quantityInput" @blur="checkValid" type="number" pattern="^\d+$" v-model="quant" min="1" :max="maxQuantity" maxlength="3" step="1" required />
      <button @click="increment" class="quantity-field__btn quantity-field__increment">+</button>
    </div>
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
        emit('quantity-field::update', parseInt(quant.value))
      } else {
        emit('quantity-field::error', quantityInput.value.validationMessage)
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
      quant
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/sass/variables';

  .quantity-field {

    &__input-grp {
      display: inline-block;
      position: relative;
      width: 80px;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type=number] {
      -moz-appearance: textfield;
      background: transparent;
      border: 1px solid $primary;
      border-radius: 3px;
      line-height: 2.4rem;
      padding: 0 20px;
      text-align: center;
      width: 100%;

      &:invalid {
        border-color: red;
      }
    }

    &__btn {
      background: none;
      border: none;
      color: $primary;
      cursor: pointer;
      font-size: 1.6rem;
      font-weight: 200;
      height: 100%;
      outline: none;
      padding: 0 8px;
      position: absolute;
      top: 0;
    }

    &__increment {
      right: 0;
    }

    &__decrement {
      left: 0;
      top: -1px;
    }
  }
</style>
