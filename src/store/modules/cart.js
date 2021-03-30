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
  },
  updateQuantity ({ rootState, state }, payload) {
    const user = rootState.user
    const db = rootState.db
    const userDoc = db.collection('users').doc(user.uid)
    const tmp = state.cart.map(prod => Object.assign({}, prod))
    const item = tmp.find(x => x.sku === payload.item.sku)

    item.quantity = payload.quantity

    userDoc.update({
      cart: tmp
    })
  },
  removeFromCart ({ rootState, state }, payload) {
    const user = rootState.user
    const db = rootState.db
    const userDoc = db.collection('users').doc(user.uid)
    const tmp = state.cart.map(prod => Object.assign({}, prod))
    const item = tmp.find(x => x.sku === payload.sku)

    tmp.splice(tmp.indexOf(item), 1)

    userDoc.update({
      cart: tmp
    })
  },
  async checkout ({ rootState, state, dispatch }) {
    const db = rootState.db
    const batch = db.batch()

    for (const item of state.cart) {
      await db.collection('products').where('sku', '==', item.sku)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = doc.data()
            batch.update(doc.ref, { stockLevel: data.stockLevel - item.quantity })
          })
        })
    }

    return new Promise((resolve, reject) => {
      batch.commit().then(() => {
        resolve()
      }).catch(err => { reject(err) })
    })
  },
  clearCart ({ rootState }) {
    const user = rootState.user
    const db = rootState.db
    const userDoc = db.collection('users').doc(user.uid)

    userDoc.update({
      cart: []
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
