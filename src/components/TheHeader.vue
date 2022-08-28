<template>
  <v-app-bar color="secondary primary--text" app>
    <v-container>
      <v-row class="align-center">
        <v-toolbar-title>Movies</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="accent" dark v-bind="attrs" v-on="on">
              <v-app-bar-nav-icon></v-app-bar-nav-icon>
            </v-btn>
          </template>
          <div class="d-flex flex-column pa-5 align-end secondary">
            <v-switch
              class="mb-5"
              v-model="$vuetify.theme.dark"
              :label="theme"
            ></v-switch>

            <v-btn color="accent" class="mb-5" to="favourites">
              Favourites
            </v-btn>

            <v-btn color="accent" @click="signOut">
              SignOut
            </v-btn>
          </div>
        </v-menu>
      </v-row>
    </v-container>
  </v-app-bar>
</template>
<script>
export default {
  methods: {
    signOut () {
      this.$store.dispatch('auth/handleSignOut')
    }
  },
  computed: {
    theme () {
      if (this.$vuetify.theme.dark) {
        return 'Theme: dark'
      } else {
        return 'Theme: light'
      }
    }
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
