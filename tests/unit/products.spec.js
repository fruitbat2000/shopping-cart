import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { nextTick } from 'vue'
import Products from '@/views/Products.vue'

const mockProductData = [
  {
    sku: 'AWDT0001-S',
    name: 'Cotten T-Shirt',
    size: 'small',
    price: 10.99,
    stockLevel: 10
  },
  {
    sku: 'AWDT0001-M',
    name: 'Cotten T-Shirt',
    size: 'medium',
    price: 10.99,
    stockLevel: 50
  },
  {
    sku: 'AWDT0001-L',
    name: 'Cotten T-Shirt',
    size: 'large',
    price: 10.99,
    stockLevel: 0
  },
  {
    sku: 'AWDT0002',
    name: 'Baseball cap',
    price: 5.99,
    stockLevel: 7
  },
  {
    sku: 'AWDT0003-M',
    name: 'Shorts',
    price: 14.99,
    stockLevel: 100,
    size: 'medium'
  }
]

describe('Products.vue', () => {
  test('component calls "getProductList" action when the "productList" array is empty', async () => {
    const store = createStore({
      state () {
        return {
          products: {
            productList: []
          }
        }
      },
      mutations: {
        setProductList (state) {
          state.products.productList = mockProductData
        }
      },
      actions: {
        'products/getProductList' ({ commit }) {
          commit('setProductList')
        }
      }
    })

    const wrapper = mount(Products, {
      global: {
        plugins: [store]
      },
      shallow: true
    })

    await nextTick()

    expect(wrapper.find('product-tile-stub').exists()).toBe(true)
  })

  test('component does not call "getProductList" action when the "productList" array has length', async () => {
    const test = jest.fn()
    const store = createStore({
      state () {
        return {
          products: {
            productList: mockProductData
          }
        }
      },
      mutations: {
        setProductList (state) {
          state.products.productList = mockProductData
        }
      },
      actions: {
        'products/getProductList' ({ commit }) {
          test()
          commit('setProductList')
        }
      }
    })

    const wrapper = mount(Products, {
      global: {
        plugins: [store]
      },
      shallow: true
    })

    await nextTick()
    expect(test).not.toHaveBeenCalled()
    expect(wrapper.find('product-tile-stub').exists()).toBe(true)
  })
})
