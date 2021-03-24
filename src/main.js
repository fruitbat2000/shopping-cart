import { createApp, markRaw } from 'vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

const firebaseConfig = {
  apiKey: 'AIzaSyDubRrqAIFIPxbNQ1CJfQ5Ow2kULHcVR50',
  authDomain: 'shopping-cart-8606f.firebaseapp.com',
  projectId: 'shopping-cart-8606f',
  storageBucket: 'shopping-cart-8606f.appspot.com',
  messagingSenderId: '445960438626',
  appId: '1:445960438626:web:29d47dd552ffa93647623b'
}

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

db.settings({
  timestampsInSnapshots: true
})

db.enablePersistence().catch(function (err) {
  if (err.code === 'failed-precondition') {
    console.log(err.code)
  } else if (err.code === 'unimplemented') {
    console.log(err.code)
  }
})

/* const products = [
  {
    sku: 'AWDT0001-S',
    name: 'Cotton T-Shirt',
    size: 'small',
    price: 10.99,
    stockLevel: 10
  },
  {
    sku: 'AWDT0001-M',
    name: 'Cotton T-Shirt',
    size: 'medium',
    price: 10.99,
    stockLevel: 50
  },
  {
    sku: 'AWDT0001-L',
    name: 'Cotton T-Shirt',
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

products.forEach((product, i) => {
  console.log(product)
  db.collection('products').doc().set(product)
    .then(docRef => {
      console.log('success', docRef.name)
    })
    .catch(error => {
      console.log('something went wrong', error)
    })
}) */

store.commit('setDbInstance', markRaw(db))

createApp(App).use(store).use(router).mount('#app')
