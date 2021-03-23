import { createApp } from 'vue'
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

console.log(db)

createApp(App).use(store).use(router).mount('#app')
