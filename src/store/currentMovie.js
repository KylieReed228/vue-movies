import axios from 'axios'

export default {
  state: {
    isLoading: false,
    movie: {}
  },
  getters: {},
  mutations: {
    setLoading (state, payload) {
      state.isLoading = payload
    },
    setMovie (state, payload) {
      state.movie = payload
    }
  },
  actions: {
    async fetchMovie ({ commit }, id) {
      commit('setLoading', true)
      try {
        const response = await axios.get(
          'https://www.omdbapi.com/?apikey=ba997323',
          {
            params: {
              i: id
            }
          }
        )
        if (response.data.Response === 'True') {
          commit('setMovie', response.data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        commit('setLoading', false)
      }
    }
  },
  namespaced: true
}
