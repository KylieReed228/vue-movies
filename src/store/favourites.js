import { auth, db } from '@/main'
import { ref, push, set, onValue } from 'firebase/database'

export default {
  state: {
    favourites: {}
  },
  mutations: {
    setFavourites (state, payload) {
      state.favourites = payload
    }
  },
  actions: {
    addFavourite ({ state }, favourite) {
      let isFavouriteExists = false
      Object.values(state.favourites).forEach(item => {
        if (item.imdbID == favourite.imdbID) {
          isFavouriteExists = true
        }
      })
      try {
        if (!isFavouriteExists) {
          const postListRef = ref(
            db,
            `users/${auth.currentUser.uid}/favourites`
          )
          const newPostRef = push(postListRef)
          set(newPostRef, favourite)
        }
      } catch (error) {
        console.log(error)
      }
    },
    fetchFavourites ({ commit }) {
      try {
        const favouritesRef = ref(
          db,
          `users/${auth.currentUser.uid}/favourites`
        )
        onValue(favouritesRef, snapshot => {
          const data = snapshot.val()
          commit('setFavourites', data)
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  namespaced: true
}
