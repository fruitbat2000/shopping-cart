import { createStore } from 'vuex'

import products from './modules/products'

const debug = process.env.NODE_ENV === 'development'

export default createStore({
  state: {
    db: null,
    cart: {}
  },
  mutations: {
    setDbInstance (state, payload) {
      debug && console.log('setDbInstance', payload)
      state.db = payload
    }
  },
  actions: {},
  modules: {
    products
  }
})
