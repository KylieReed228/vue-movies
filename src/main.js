import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

Vue.use(Vuelidate)

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: 'AIzaSyDBcxImHuP0ny8xKdckPJQ731cMg55UDak',
  authDomain: 'vue-notes-2785f.firebaseapp.com',
  databaseURL:
    'https://vue-notes-2785f-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'vue-notes-2785f',
  storageBucket: 'vue-notes-2785f.appspot.com',
  messagingSenderId: '848025891761',
  appId: '1:848025891761:web:6a1d4ebd208c70a2954390'
}

const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp)
const db = getDatabase(firebaseApp)

let app = null

onAuthStateChanged(auth, user => {
  if (!app) {
    store.commit('auth/setUser', user)
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})

export { auth, db }
