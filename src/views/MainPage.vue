<template>
  <div class="main-page">
    <v-container>
      <div class="d-flex justify-center flex-column align-center">
        <main-movie-card class="mb-10" />
        <search-form
          class="main-page__search"
          v-model="query"
          :label="'What are you looking for?'"
        />
      </div>
      <div v-if="isLoading" class="main-page__loading">
        <loading :active.sync="isLoading"></loading>
      </div>
      <div v-else-if="error && !isLoading" class="main-page__error">
        {{ error }}
      </div>
      <div v-else-if="movies.length && !isLoading">
        <div class="main-page__movie-list">
          <movie-card
            class="main-page__movie-card"
            v-for="movie in movies"
            :key="movie.imdbID"
            :movie="movie"
          />
        </div>
        <div class="main-page__pagination">
          <v-pagination
            v-model="page"
            :length="totalPages"
            :total-visible="7"
          ></v-pagination>
        </div>
      </div>
    </v-container>
  </div>
</template>
<script>
import SearchForm from '@/components/SearchForm.vue'
import MainMovieCard from '@/components/MainMovieCard.vue'
import MovieCard from '@/components/MovieCard.vue'
import Loading from 'vue-loading-overlay'
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  components: {
    SearchForm,
    MainMovieCard,
    MovieCard,
    Loading
  },
  methods: {
    ...mapActions({
      fetchMovies: 'movies/fetchMovies'
    })
  },
  watch: {
    pageStateOptions: function () {
      this.fetchMovies()
    },
    query: function () {
      this.page = 1
    }
  },
  computed: {
    ...mapState({
      movies: state => state.movies.movies,
      isLoading: state => state.movies.isLoading,
      error: state => state.movies.error
    }),
    ...mapGetters({
      totalPages: 'movies/getTotalPages'
    }),
    query: {
      get: function () {
        return this.$store.state.movies.query
      },
      set: function (val) {
        this.$store.commit('movies/setQuery', val)
      }
    },
    page: {
      get: function () {
        return this.$store.state.movies.page
      },
      set: function (val) {
        this.$store.commit('movies/setPage', val)
      }
    },
    pageStateOptions () {
      return {
        query: this.query,
        page: this.page
      }
    }
  }
}
</script>
<style lang="scss">
.main-page {
  &__search {
    width: 300px;
  }
  &__movie-list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    margin-bottom: 10px;
    @media screen and (max-width: 992px) {
      grid-template-columns: repeat(4, 1fr);
    }
    @media screen and (max-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media screen and (max-width: 540px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  &__loading {
    display: flex;
    justify-content: center;
  }
  &__error {
    text-align: center;
  }
}
.theme--dark.v-pagination .v-pagination__item--active {
  color: #424242 !important;
}
</style>
