<template>
  <v-app-bar color="secondary primary--text" app>
    <v-container>
      <v-row class="align-center">
        <the-logo />

        <v-spacer></v-spacer>

        <the-menu />
      </v-row>
    </v-container>
  </v-app-bar>
</template>
<script>
import TheLogo from '@/components/TheLogo.vue'
import TheMenu from '@/components/TheMenu.vue'
export default {
  name: 'TheHeader',
  components: {
    TheLogo, TheMenu
  }
}
</script>
<style lang="scss">
.v-input__control {
  .v-messages {
    display: none;
  }
}
</style>
