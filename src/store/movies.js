import axios from 'axios'

export default {
  state: {
    movies: [],
    totalResults: 0,
    currentMovie: {}
  },
  getters: {
    getTotalPages (state) {
      return Math.ceil(state.totalResults / 10)
    }
  },
  mutations: {
    setMovies (state, payload) {
      state.movies = payload
    },
    setTotalResults (state, payload) {
      state.totalResults = payload
    },
    setCurrentPage (state, payload) {
      state.currentPage = payload
    },
    setCurrentMovie (state, payload) {
      state.currentMovie = payload
    }
  },
  actions: {
    async fetchMovies ({ commit }, { query, page }) {
      try {
        const response = await axios.get(
          'http://www.omdbapi.com/?apikey=ba997323',
          {
            params: {
              s: query,
              page
            }
          }
        )
        commit('setMovies', response.data.Search)
        commit('setTotalResults', response.data.totalResults)
      } catch (error) {
        console.log(error)
      }
    },
    async fetchCurrentMovie ({ commit }, id) {
      try {
        const response = await axios.get(
          'http://www.omdbapi.com/?apikey=ba997323',
          {
            params: {
              i: id
            }
          }
        )
        commit('setCurrentMovie', response.data)
      } catch (error) {
        console.log(error)
      }
    }
  },
  namespaced: true
}
