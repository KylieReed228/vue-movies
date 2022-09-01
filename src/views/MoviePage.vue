<template>
  <div class="movie-page">
    <v-container>
      <v-row v-if="isLoading">
        <v-col class="movie-page__loading"
          ><loading :active.sync="isLoading"></loading
        ></v-col>
      </v-row>
      <v-row v-else-if="!movie && !isLoading" class="movie-page__empty"
        >Something went wrong</v-row
      >
      <v-row v-else class="flex-column flex-md-row">
        <v-col class="col-md-4 col-sm-5 col-6">
          <v-img
            v-if="movie.Poster === 'N/A'"
            src="../assets/images/no-image.webp"
          ></v-img>
          <v-img v-else :src="movie.Poster"></v-img>
        </v-col>
        <v-col class="col-md-8 col">
          <v-row>
            <v-col class="col-8">
              <h1 class="movie-page__title">
                <p>{{ movie.Title }}</p>
                <p>({{ movie.Type }} {{ movie.Year }})</p>
              </h1>
              <v-btn
                @click="addToFavourites"
                :disabled="isMovieExists"
                class="movie-page__favourite-btn accent"
                >Will Watch</v-btn
              >
              <p class="movie-page__description">{{ movie.Plot }}</p>
              <v-list class="movie-page__list transparent">
                <v-list-item v-for="listItem in list" :key="listItem">
                  <v-row>
                    <v-col class="col-3">
                      <v-list-item-content
                        class="movie-page__list-item-title"
                        >{{ listItem }}</v-list-item-content
                      >
                    </v-col>
                    <v-col>
                      <v-list-item-content>{{
                        movie[listItem] || 'N/A'
                      }}</v-list-item-content>
                    </v-col>
                  </v-row>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col class="col-4">
              <div class="movie-page__rating">
                <p class="movie-page__rating-value">{{ movie.imdbRating }}</p>
                <p class="movie-page__rating-votes">
                  {{ movie.imdbVotes }} votes
                </p>
              </div>
              <div class="movie-page__actors">
                <span>Actors:</span> {{ movie.Actors }}
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Loading from 'vue-loading-overlay'
export default {
  components: {
    Loading
  },
  data () {
    return {
      list: [
        'Country',
        'Awards',
        'Genre',
        'Writer',
        'Director',
        'BoxOffice',
        'Released',
        'Runtime'
      ]
    }
  },
  methods: {
    addToFavourites () {
      const movie = {
        Poster: this.movie.Poster,
        Title: this.movie.Title,
        Type: this.movie.Type,
        Year: this.movie.Year,
        imdbID: this.movie.imdbID
      }
      this.$store.dispatch('favourites/addFavourite', movie)
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.currentMovie.isLoading,
      movie: state => state.currentMovie.movie,
      favourites: state => state.favourites.favourites
    }),
    isMovieExists () {
      let bool = false
      if (this.favourites) {
        Object.values(this.favourites).forEach(item => {
          if (this.movie.imdbID == item.imdbID) {
            bool = true
          }
        })
      }
      return bool
    }
  },
  created () {
    this.$store.dispatch('currentMovie/fetchMovie', this.$route.params.id)
  }
}
</script>

<style lang="scss">
.movie-page {
  &__loading {
    display: flex;
    justify-content: center;
  }
  &__empty {
    display: flex;
    justify-content: center;
  }
  &__favourite-btn {
    margin-bottom: 10px;
  }

  &__list-item-title {
    font-weight: 600;
    color: #424242;
  }

  &__rating {
    margin-bottom: 50px;
  }

  &__rating-value {
    font-size: 32px;
    font-weight: 700;
    color: #ffdb80;
  }

  &__rating-votes {
    font-size: 24px;
    font-weight: 600;
  }

  &__actors {
    font-size: 24px;
    & span {
      font-weight: 600;
      color: #424242;
    }
  }
}
</style>
