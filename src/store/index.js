import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import movies from './movies'
import favourites from './favourites'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    movies,
    favourites
  }
})
