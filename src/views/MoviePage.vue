<template>
  <div class="movie-page">
    <v-container>
      <v-row class="flex-column flex-md-row">
        <v-col class="col-md-4 col-sm-5 col-6">
          <v-img :src="movie.Poster"></v-img>
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
                class="movie-page__favorite-btn accent"
                >Will Watch</v-btn
              >
              <p class="movie-page__description">{{ movie.Plot }}</p>
              <v-list class="movie-page__list transparent">
                <v-list-item>
                  <v-row>
                    <v-col class="col-3">
                      <v-list-item-content class="movie-page__list-item-title"
                        >Country</v-list-item-content
                      >
                    </v-col>
                    <v-col>
                      <v-list-item-content>{{
                        movie.Country
                      }}</v-list-item-content>
                    </v-col>
                  </v-row>
                </v-list-item>
                <v-list-item>
                  <v-row>
                    <v-col class="col-3">
                      <v-list-item-content class="movie-page__list-item-title"
                        >Awards</v-list-item-content
                      >
                    </v-col>
                    <v-col>
                      <v-list-item-content>{{
                        movie.Awards
                      }}</v-list-item-content>
                    </v-col>
                  </v-row>
                </v-list-item>
                <v-list-item>
                  <v-row>
                    <v-col class="col-3">
                      <v-list-item-content class="movie-page__list-item-title"
                        >Genre</v-list-item-content
                      >
                    </v-col>
                    <v-col>
                      <v-list-item-content>{{
                        movie.Genre
                      }}</v-list-item-content>
                    </v-col>
                  </v-row>
                </v-list-item>
                <v-list-item>
                  <v-row>
                    <v-col class="col-3">
                      <v-list-item-content class="movie-page__list-item-title"
                        >Writer</v-list-item-content
                      >
                    </v-col>
                    <v-col>
                      <v-list-item-content>{{
                        movie.Writer
                      }}</v-list-item-content>
                    </v-col>
                  </v-row>
                </v-list-item>
                <v-list-item>
                  <v-row>
                    <v-col class="col-3">
                      <v-list-item-content class="movie-page__list-item-title"
                        >Director</v-list-item-content
                      >
                    </v-col>
                    <v-col>
                      <v-list-item-content>{{
                        movie.Director
                      }}</v-list-item-content>
                    </v-col>
                  </v-row>
                </v-list-item>
                <v-list-item>
                  <v-row>
                    <v-col class="col-3">
                      <v-list-item-content class="movie-page__list-item-title"
                        >Box Office</v-list-item-content
                      >
                    </v-col>
                    <v-col>
                      <v-list-item-content>{{
                        movie.BoxOffice
                      }}</v-list-item-content>
                    </v-col>
                  </v-row>
                </v-list-item>
                <v-list-item>
                  <v-row>
                    <v-col class="col-3">
                      <v-list-item-content class="movie-page__list-item-title"
                        >Released</v-list-item-content
                      >
                    </v-col>
                    <v-col>
                      <v-list-item-content>{{
                        movie.Released
                      }}</v-list-item-content>
                    </v-col>
                  </v-row>
                </v-list-item>
                <v-list-item>
                  <v-row>
                    <v-col class="col-3">
                      <v-list-item-content class="movie-page__list-item-title"
                        >Runtime</v-list-item-content
                      >
                    </v-col>
                    <v-col>
                      <v-list-item-content>{{
                        movie.Runtime
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
export default {
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
      movie: state => state.movies.currentMovie,
      favourites: state => state.favourites.favourites
    }),
    isMovieExists () {
      let bool = false
      Object.values(this.favourites).forEach(item => {
        if (this.movie.imdbID == item.imdbID) {
          bool = true
        }
      })
      return bool
    }
  },
  created () {
    this.$store.dispatch('movies/fetchCurrentMovie', this.$route.params.id)
  }
}
</script>

<style lang="scss">
.movie-page {
  &__btn {
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
