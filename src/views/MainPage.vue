<template>
  <div class="main-page">
    <v-container>
      <div class="d-flex justify-center flex-column align-center">
        <main-movie-card class="mb-10" />
        <search-form @select-query="selectQuery" />
      </div>
      <div v-if="movies.length">
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
            :length="Number(totalPages)"
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
import { mapGetters, mapState } from 'vuex'
export default {
  components: {
    SearchForm,
    MainMovieCard,
    MovieCard
  },
  data () {
    return {
      query: '',
      page: 1
    }
  },
  methods: {
    selectQuery (query) {
      this.query = query
    },
    fetchMovies () {
      const formData = {
        query: this.query,
        page: this.page
      }
      this.$store.dispatch('movies/fetchMovies', formData)
    }
  },
  watch: {
    pageStateOptions: function (val) {
      if (val.query == '') {
        this.$router.push({ query: {} })
      } else {
        this.$router
          .push({
            query: { query: val.query, page: val.page }
          })
          .catch(() => {})
      }
    },
    async '$route.query' () {
      if (Object.keys(this.$route.query).length === 0) {
        this.query = ''
        this.page = 1
      } else {
        this.query = this.$route.query.query
        this.page = Number(this.$route.query.page)
        this.fetchMovies()
      }
    }
  },
  computed: {
    ...mapState({
      movies: state => state.movies.movies
    }),
    ...mapGetters({
      totalPages: 'movies/getTotalPages'
    }),
    pageStateOptions () {
      return {
        query: this.query,
        page: this.page
      }
    }
  },
  created () {
    if (Object.keys(this.$route.query).length) {
      this.query = this.$route.query.query
      this.page = Number(this.$route.query.page)
      this.fetchMovies()
    }
  }
}
</script>
<style lang="scss">
.main-page {
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
}
.theme--dark.v-pagination .v-pagination__item--active {
  color: #424242 !important;
}
</style>
