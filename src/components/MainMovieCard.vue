<template>
  <v-card class="movie-card secondary">
    <router-link :to="{ name: 'moviePage', params: { id: 'tt0944947'} }">
      <v-img class="movie-card__img" src="https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_SX300.jpg"></v-img>
    </router-link>
    <v-card-title>Game of Thrones</v-card-title>
    <v-card-text> Year: 2011-2019 </v-card-text>
    <div class="movie-card__type secondary">Series</div>
  </v-card>
</template>
<script>
export default {
  name: 'MainMovieCard'
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
}
</style>