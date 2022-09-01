<template>
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

      <v-btn color="accent" class="mb-5" :to="{ name: 'favourites' }">
        Favourites
      </v-btn>

      <v-btn color="accent" @click="signOut">
        SignOut
      </v-btn>
    </div>
  </v-menu>
</template>

<script>
export default {
  name: 'TheMenu',
  methods: {
    signOut () {
      this.$store.dispatch('auth/handleSignOut')
    }
  },
  computed: {
    theme () {
      return this.$vuetify.theme.dark ? 'Theme: Dark' : 'Theme: Light'
    }
  }
}
</script>

<style></style>
