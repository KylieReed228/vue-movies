<template>
  <router-view />
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  watch: {
    user: function (val) {
      if (val) {
        this.$store.dispatch('favourites/fetchFavourites')
      } else {
        this.$store.commit('movies/cleanMovies')
        this.$store.commit('favourites/cleanFavourites')
      }
    }
  },
  created () {
    if (this.user) {
      this.$store.dispatch('favourites/fetchFavourites')
    }
  }
}
</script>
<style lang="scss">
body {
  min-width: 425px;
}
.theme--dark.v-application {
  background-color: #616161 !important;
}
.theme--light.v-application {
  background-color: #f5f5f5 !important;
}
</style>
