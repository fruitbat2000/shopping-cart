import { createStore } from 'vuex'

import products from './modules/products'
import cart from './modules/cart'

const debug = process.env.NODE_ENV === 'development'

export default createStore({
  state: {
    db: null,
    user: null
  },
  mutations: {
    setDbInstance (state, payload) {
      debug && console.log('setDbInstance', payload)
      state.db = payload
    },
    setUser (state, payload) {
      debug && console.log('setUser', payload)
      state.user = payload
    }
  },
  actions: {
    checkForUser ({ commit, state, dispatch }, payload) {
      const uid = payload.uid
      const collection = state.db.collection('users')
      const doc = state.db.collection('users').doc(uid)

      return new Promise((resolve, reject) => {
        doc.get()
          .then(doc => {
            if (doc.exists) {
              commit('setUser', doc.data())
              dispatch('watchUser')
              resolve()
            } else {
              const user = {
                anonymous: payload.isAnonymous,
                uid: uid
              }

              collection.doc(uid).set(user)
              commit('setUser', user)
              dispatch('watchUser')
              resolve()
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    watchUser ({ state, commit }) {
      state.db.collection('users').doc(state.user.uid)
        .onSnapshot((doc) => {
          const data = doc.data()
          commit('setUser', data)
          commit('cart/updateCart', data.cart)
        })
    }
  },
  modules: {
    products,
    cart
  }
})
