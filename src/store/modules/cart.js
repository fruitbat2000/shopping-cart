const debug = process.env.NODE_ENV === 'development'

const state = {
  cart: []
}

const mutations = {
  updateCart (state, payload) {
    debug && console.log('updateCart', payload)
    state.cart = payload
  }
}

const getters = {}

const actions = {
  addToCart ({ rootState, state }, payload) {
    const user = rootState.user
    const db = rootState.db
    const userDoc = db.collection('users').doc(user.uid)
    const tmp = state.cart.map(prod => Object.assign({}, prod))
    const exists = tmp.find(prod => prod.sku === payload.sku)

    if (exists) {
      exists.quantity += 1
    } else {
      payload.quantity = 1
      tmp.push(payload)
    }

    userDoc.update({
      cart: tmp
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
