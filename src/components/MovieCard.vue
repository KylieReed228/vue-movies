<template>
  <v-card class="movie-card secondary">
    <router-link :to="{ name: 'moviePage', params: { id: movie.imdbID} }">
      <img class="movie-card__img" :src="movie.Poster" />
    </router-link>
    <v-card-title>{{ movie.Title }}</v-card-title>
    <v-card-text> Year: {{ movie.Year }} </v-card-text>
    <div class="movie-card__type secondary">{{ movie.Type }}</div>
  </v-card>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true,
      default: {}
    }
  }
}
</script>

<style lang="scss">
.movie-card {
  position: relative;
  &__type {
    position: absolute;
    padding: 5px 10px;
    top: 10px;
    right: 10px;
  }
  &__img {
    width: 100%;
  }
}
</style>
