<template>
  <router-view />
</template>
<script>
import { auth } from '@/main'
export default {
  name: 'App',
  created () {
    if (!auth.currentUser === null) {
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
