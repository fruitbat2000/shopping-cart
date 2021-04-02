import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { markRaw } from 'vue'
import store from '@/store'

export function initFirebase () {
  const firebaseConfig = {
    apiKey: 'AIzaSyDubRrqAIFIPxbNQ1CJfQ5Ow2kULHcVR50',
    authDomain: 'shopping-cart-8606f.firebaseapp.com',
    projectId: 'shopping-cart-8606f',
    storageBucket: 'shopping-cart-8606f.appspot.com',
    messagingSenderId: '445960438626',
    appId: '1:445960438626:web:29d47dd552ffa93647623b'
  }

  firebase.initializeApp(firebaseConfig)

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      store.dispatch('checkForUser', user)
    } else {
      anonymousAuth()
    }
  })
}

export function anonymousAuth () {
  firebase.auth().signInAnonymously()
    .then(() => {
      console.log('anonymous auth successful')
    })
    .catch((error) => {
      console.log(error)
    })
}

export function setupDatabase () {
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

  store.commit('setDbInstance', markRaw(db))
}
