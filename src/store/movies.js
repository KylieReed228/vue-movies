import axios from 'axios'

export default {
  state: {
    isLoading: false,
    query: '',
    page: 1,
    movies: [],
    totalResults: 0,
    error: ''
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
    setQuery (state, payload) {
      state.query = payload
    },
    setPage (state, payload) {
      state.page = payload
    },
    setMovies (state, payload) {
      state.movies = payload
    },
    cleanMovies (state) {
      state.movies = []
      state.query = '',
      state.page = 1
    },
    setError (state, payload) {
      state.error = payload
    },
    cleanError (state) {
      state.error = ''
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
    async fetchMovies ({ state, commit }) {
      if (!state.query) return
      commit('setLoading', true)
      try {
        const response = await axios.get(
          'https://www.omdbapi.com/?apikey=ba997323',
          {
            params: {
              s: state.query,
              page: state.page
            }
          }
        )
        if (response.data.Response === 'True') {
          commit('setMovies', response.data.Search)
          commit('setTotalResults', response.data.totalResults)
          commit('cleanError')
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
