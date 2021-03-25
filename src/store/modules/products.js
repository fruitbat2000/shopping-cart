const debug = process.env.NODE_ENV === 'development'

const state = {
  productList: []
}

const mutations = {
  setProductList (state, payload) {
    debug && console.log('setProductToList', payload)
    state.productList = payload
  }
}

const getters = {}

const actions = {
  async getProductList ({ rootState, commit, dispatch }) {
    const db = rootState.db
    const tmp = []

    await db.collection('products').get().then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        tmp.push(doc.data())
      })
    })

    dispatch('watchProducts')
    commit('setProductList', tmp)
  },
  watchProducts ({ rootState, commit }) {
    const db = rootState.db

    db.collection('products').onSnapshot({ includeMetadataChanges: true }, querySnapshot => {
      const tmp = []
      querySnapshot.forEach((doc) => {
        tmp.push(doc.data())
      })

      const source = querySnapshot.metadata.fromCache ? 'local cache' : 'server'
      console.log('Data came from ' + source)

      commit('setProductList', tmp)
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
