import axios from 'axios'

export default {
  state: {
    isLoading: false,
    movies: [],
    error: '',
    totalResults: 0
  },
  getters: {
    getTotalPages (state) {
      return Math.ceil(state.totalResults / 10)
    }
  },
  mutations: {
    setLoading (state, payload) {
      state.isLoading = payload
    },
    setMovies (state, payload) {
      state.movies = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setTotalResults (state, payload) {
      state.totalResults = payload
    },
    clearMovies (state) {
      state.movies = []
    },
    clearTotalResults (state) {
      state.totalResults = 0
    }
  },
  actions: {
    async fetchMovies ({ commit }, { query, page }) {
      commit('setLoading', true)
      try {
        const response = await axios.get(
          'https://www.omdbapi.com/?apikey=ba997323',
          {
            params: {
              s: query,
              page
            }
          }
        )
        if (response.data.Response === 'True') {
          commit('setMovies', response.data.Search)
          commit('setTotalResults', response.data.totalResults)
        } else {
          commit('setError', response.data.Error)
        }
      } catch {
        commit('setError', 'Something went wrong')
      } finally {
        commit('setLoading', false)
      }
    }
  },
  namespaced: true
}
