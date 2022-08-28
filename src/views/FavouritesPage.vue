<template>
  <div class="favourites-page">
    <v-container>
      <div class="favourites-page__items">
        <movie-card
          v-for="favourite in favourites"
          :key="favourite.imdbID"
          :movie="favourite"
        ></movie-card>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MovieCard from '@/components/MovieCard.vue'
export default {
  components: {
    MovieCard
  },
  computed: {
    ...mapState({
      favourites: state => state.favourites.favourites
    })
  }
}
</script>

<style lang="scss">
.favourites-page {
  &__items {
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
</style>
